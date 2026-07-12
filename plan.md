План: явный флаг servedInRace для штрафов

Context

 вводится явный boolean-флаг servedInRace на каждом Penalty.

Проблема сейчас: «штраф отстоян в гонке» определяется неявно (seconds === 0 && source !== 'manual'). Это создаёт
двусмысленность: невозможно отличить (а) ручной нулевой штраф, (б) свежесозданную пустую запись формы, (в) реально
отстоянный стопом автоштраф. Также нет способа пометить ручной штраф как «отстоян».

Цель: ввести явное состояние, разрешить три кейса и убрать «пустой штраф» из персистентного хранилища.

UX правила (согласованы)

1. Default state нового штрафа в UI: seconds=0, servedInRace=false = «пустой штраф» → не сохраняется на бэкенд (двойной
   фильтр: disabled-кнопка формы + filter при API save).
2. servedInRace=true → поле seconds скрыто в UI, значение принудительно 0 (взаимоисключающие).
3. При autoChargePenaltiesForLimits=false детектор создаёт авто-штраф с seconds=0, servedInRace=false (пустой) —
   operator решает, не сохраняется без действия.
4. Чекбокс «Отстоян в гонке» виден И в форме «Добавить штраф», И в каждом ряду таблицы редактора (включая авто-штрафы).
5. Viewer: если servedInRace=true → показывается чип «Отстоян в гонке», цифра справа НЕ показывается.

 ---
1. wroomz-types — расширение типа

Файл: /Users/eugene/dev/wroomz-types/src/domain/race.ts (Penalty, стр. 52–60)

Добавить опциональное поле:
servedInRace?: boolean;
Семантика в комментарии: true ⇒ seconds === 0 инвариантно; undefined | false ⇒ обычный штраф.

Версию package.json отдельно не бамплю — добавление встраивается в ту же 1.2.0-волну, локально потребители идут через
file:../wroomz-types.

 ---
2. wroomz-backend — расширить существующую миграцию

Файл: /Users/eugene/dev/wroomz-backend/src/migrations/1762300000000-RestructurePenaltiesAndAddAutoChargeFlag.ts

Миграция ещё не применена в проде → дополняем на месте, не создаём новую.

В up() PL/pgSQL-блоке (стр. 56–84), в каждом jsonb_build_object:
- manual_dict → 'servedInRace', false
- stint_dict → 'servedInRace', ((kv.value)::int = 0) (legacy seconds=0 авто-штрафы интерпретируются как «отстоян»)
- pilot_dict → аналогично

down() — без изменений; флаг просто отбрасывается при downgrade.

Если миграция уже применена в локальной dev-БД — нужно вручную сделать migration:revert и migration:run, либо ad-hoc
UPDATE для добавления флага в существующие items. Уточнить статус БД при имплементации.

 ---
3. wroomz-frontend — утилита фильтра

Создать /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/utils/isMeaningfulPenalty.ts:

export const isMeaningfulPenalty = (p: Penalty): boolean =>
p.seconds !== 0 || p.servedInRace === true;

Единственная точка определения «штраф несёт смысл». Используется в трёх местах ниже.

 ---
4. wroomz-frontend — store actions

Файл: /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/store/raceEditorStore.ts

4.1 Расширить RaceEditorActions (стр. 38–55)

- addManualPenalty input: добавить обязательное servedInRace: boolean.
- Новый action: setPenaltyServedInRace: (id: string, value: boolean) => void.

4.2 Реализация

- addManualPenalty (стр. 77–89): записать servedInRace в литерал; если input.servedInRace === true, forсить seconds: 0
  (defense — UI обязан, но store страхует).
- updatePenaltySeconds (стр. 111–127): добавить early-return если target.servedInRace === true (warn + no-op).
- Новый setPenaltyServedInRace(id, value) на любом источнике (manual/auto):
    - value === true: seconds=0, servedInRace=true, сбросить userEditedSeconds (несовместимы).
    - value === false: servedInRace=false, seconds не трогать.
- updateManualPenalty (стр. 91–109): Pick-тип НЕ расширять флагом. Для смены servedInRace используется отдельный
  action.
- deletePenalty — без изменений.

4.3 calculate() — агрегация per-team (стр. 200–203)

Защитно явно занулять seconds для servedInRace=true:
penaltyByTeam[p.teamNumber] += p.servedInRace === true ? 0 : p.seconds;
(Фактически избыточно — invariant держит seconds=0 — но defensive.)

4.4 LocalStorage persist (стр. 286–303)

Без изменений. Сохраняем включая «пустые» — operator не теряет работу при reload.

 ---
5. wroomz-frontend — regenerateAutoPenalties

Файл: /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/utils/regenerateAutoPenalties.ts
(buildPenaltyFromViolation, стр. 35–82)

Переносить prior.servedInRace через регенерацию:

- Если prior?.servedInRace === true: новый Penalty получает servedInRace: true, seconds: 0 (форсируем игнорируя
  prior.userEditedSeconds), userEditedSeconds НЕ переносится.
- Иначе: servedInRace: false; существующая логика seconds сохраняется (userEditedSeconds ? prior.seconds :
  autoChargeEnabled ? formulaSeconds : 0).

Регенерация никогда сама не ставит servedInRace=true — это всегда explicit-выбор оператора. Единственный источник true
— action setPenaltyServedInRace и backend-миграция.

userEditedServedInRace-флаг не нужен: defaults у новых = false, прежнее значение true переносится явно.

 ---
6. wroomz-frontend — миграция legacy

Файл: /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/context/raceEditorReducer.ts

6.1 transformLegacyBackendPenalties (стр. 197–225)

Зеркало backend-миграции (fallback на случай не-мигрированного бэка):
- pushDictionary для source !== 'manual' и seconds === 0 → servedInRace: true.
- Иначе → servedInRace: false.

6.2 migrateLegacyPenalties

Файл: /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/utils/migrateLegacyPenalties.ts

В legacy Record<string, number> (ручные штрафы в LS) добавить .filter(([_, seconds]) => seconds !== 0) перед .map —
пустые ручные штрафы из старой LS-формы дропаются, чтобы не превратиться в зомби.

isPenaltyShape (стр. 10–21) — не трогать, поле опциональное.

 ---
7. wroomz-frontend — UI форма добавления

Файл: /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/components/ManualPenalties/ManualPenalties.tsx

7.1 Локальный state (стр. 49–51)

const [servedInRace, setServedInRace] = useState(false);

7.2 Render (стр. 89–98)

- Поле «Секунды» рендерить условно: {!servedInRace && (<TextField ... />)}.
- Под ним — <FormControlLabel control={<Switch checked={servedInRace} onChange={(_, v) => { setServedInRace(v); if (v)
  setSeconds(''); }} />} label="Отстоян в гонке" />.

7.3 canAdd (стр. 55–60)

canAdd =
teamNumber.trim() !== '' &&
description.trim() !== '' &&
(servedInRace || (seconds.trim() !== '' && Number.isFinite(secondsParsed) && secondsParsed !== 0));

7.4 handleAdd (стр. 62–71)

Передать servedInRace, в seconds подставлять servedInRace ? 0 : secondsParsed. После добавления —
setServedInRace(false).

 ---
8. wroomz-frontend — UI ряд таблицы

Файл: /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/components/ManualPenalties/PenaltyRow.tsx

8.1 Props (стр. 21–25)

Добавить onSetServedInRace: (id: string, value: boolean) => void.

8.2 Render

- Добавить <Switch> / <Checkbox> «Отстоян в гонке» в ряд (для manual + auto).
- TextField для seconds (стр. 77–93): рендерить только если !penalty.servedInRace. Иначе — — или пусто (стилистический
  выбор; рекомендую сохранить минимальную ширину для выравнивания строк).
- Чип «изменено вручную» (стр. 94–101): рендерить только при !penalty.servedInRace && penalty.userEditedSeconds.

8.3 Прокинуть action в Row

ManualPenalties.tsx, селектор store (стр. 38–47): добавить setPenaltyServedInRace. Передать в <PenaltyRow ...
onSetServedInRace={setPenaltyServedInRace} /> (стр. 133–140).

 ---
9. wroomz-frontend — viewer

Файл: /Users/eugene/dev/wroomz-frontend/src/features/raceViewer/components/PenaltiesTable/PenaltiesByTeam.tsx

9.1 Условие чипа (стр. 100–124)

Заменить:
const servedInRace = p.seconds === 0 && p.source !== 'manual';
на:
const servedInRace = p.servedInRace === true;

9.2 Скрыть значение справа (стр. 125–129)

Обернуть блок с printPenaltyValue(p.seconds) в {!servedInRace && (...)}.

9.3 Фильтрация в usePenaltiesByTeam

Файл: /Users/eugene/dev/wroomz-frontend/src/features/raceViewer/components/PenaltiesTable/PenaltiesByTeam.data.ts (стр.
21–26)

Перед группировкой применить isMeaningfulPenalty (страховка от пустых записей, проскочивших фильтр save).

9.4 Total

В info.total (стр. 30) защитно: p.servedInRace === true ? 0 : p.seconds.

 ---
10. wroomz-frontend — фильтрация при API save

Файл: /Users/eugene/dev/wroomz-frontend/src/components/RaceForm/RaceForm.tsx (handleFormSubmit, стр. 87–107)

В handleFormSubmit перед сборкой raceData:
const filteredPenalties = editorSnapshot
? {
items: editorSnapshot.penalties.items.filter(isMeaningfulPenalty),
disqualifiedTeams: editorSnapshot.penalties.disqualifiedTeams,
}
: undefined;
Подставить filteredPenalties вместо editorSnapshot.penalties (стр. 96).

buildSnapshotFromBackend (стр. 27–52) — без изменений (penalty.servedInRace пробрасывается через race.penalties as-is).

 ---
11. Тесты

Адаптация

- regenerateAutoPenalties.test.ts: кейсы — prior.servedInRace=true переносится; prior.servedInRace=true +
  userEditedSeconds=true → флаг побеждает (seconds=0, userEditedSeconds dropped); нарушение исчезло → штраф дропается.
- migrateLegacyPenalties.test.ts: новые кейсы — Penalty[] с servedInRace=true проходит; Record {team: 0}
  отфильтровывается; смесь — только ненулевые.

Новые

- isMeaningfulPenalty.test.ts: 4 комбинации seconds×servedInRace + undefined-кейс.
- Тест на action setPenaltyServedInRace (либо отдельным файлом, либо в существующем store-тесте если есть): true →
  seconds=0, userEditedSeconds=undefined; false → флаг false, seconds не трогается; несуществующий id → warn + no-op.
- (Опционально) RTL-тест на ManualPenalties: переключение Switch скрывает поле; disabled-кнопка для пустого; Add
  создаёт штраф с seconds=0 при флаге.

 ---
Критические файлы

- /Users/eugene/dev/wroomz-types/src/domain/race.ts
- /Users/eugene/dev/wroomz-backend/src/migrations/1762300000000-RestructurePenaltiesAndAddAutoChargeFlag.ts
- /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/utils/isMeaningfulPenalty.ts (новый)
- /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/utils/regenerateAutoPenalties.ts
- /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/utils/migrateLegacyPenalties.ts
- /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/store/raceEditorStore.ts
- /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/context/raceEditorReducer.ts
- /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/components/ManualPenalties/ManualPenalties.tsx
- /Users/eugene/dev/wroomz-frontend/src/features/raceEditor/components/ManualPenalties/PenaltyRow.tsx
- /Users/eugene/dev/wroomz-frontend/src/features/raceViewer/components/PenaltiesTable/PenaltiesByTeam.tsx
- /Users/eugene/dev/wroomz-frontend/src/features/raceViewer/components/PenaltiesTable/PenaltiesByTeam.data.ts
- /Users/eugene/dev/wroomz-frontend/src/components/RaceForm/RaceForm.tsx

 ---
Корнер-кейсы

1. autoCharge OFF + новое нарушение: создаётся пустой штраф (s=0, !served) → виден в редакторе, но не сохраняется.
   Operator вводит цифру (→ userEditedSeconds=true, сохранится) ИЛИ ставит «Отстоян» (→ servedInRace=true, сохранится) ИЛИ
   игнорирует.
2. servedInRace=true + следующий Calculate: флаг переносится regenerateAutoPenalties, seconds=0 форсится, формула
   игнорируется.
3. Operator вводит seconds → потом ставит «Отстоян»: action обнуляет seconds и дропает userEditedSeconds. Финал:
   served=true, s=0.
4. «Отстоян» → снять чекбокс: served=false, s остаётся 0 → штраф снова «пустой», не сохранится при save.
5. Backend round-trip пустого штрафа: фильтр в RaceForm защищает; viewer-фильтр в usePenaltiesByTeam — вторая линия.
6. prior.userEditedSeconds=true + prior.servedInRace=true (битый стейт): флаг побеждает, userEditedSeconds дропается.

 ---
Verification

1. cd ../wroomz-types && npm run build — типы компилируются.
2. cd ../wroomz-backend && npm run migration:run на dev-БД с legacy данными → проверить SQL'ом: SELECT
   jsonb_path_query(penalties, '$.items[*].servedInRace') FROM race; — авто-штрафы с legacy seconds=0 имеют
   servedInRace=true; остальные false. Если миграция уже применена ранее — сделать revert+run.
3. cd ../wroomz-frontend && yarn test — все unit-тесты зелёные.