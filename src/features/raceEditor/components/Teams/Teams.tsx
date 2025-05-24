import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SectionWrapper, SectionHeader, Label } from '../common/styles';
import { Team, TeamsProps } from './Teams.types';
import { StyledForm, StyledInput } from './Teams.styles';

const Teams: FC<TeamsProps> = (props) => {
    const { teams, setTeams } = props;

    const { register, handleSubmit, reset } = useForm<Team>();

    const onSubmit = (data: Team) => {
        console.log(data);
        if (teams.find((team) => data.name === team.name)) {
            alert('Хуй. Уже есть команда с таким номером. ');
            return;
        }
        setTeams([...teams, data].sort((a, b) => (Number(a?.name) < Number(b?.name) ? -1 : 1)));
        reset();
    };

    return (
        <SectionWrapper>
            <SectionHeader>Teams and Pilots</SectionHeader>
            {teams.map((team) => (
                <div key={team.name}>
                    {team.name}. {team.pilotOne}, {team.pilotTwo}
                    {team.pilotThree ? ', ' + team.pilotThree : null}
                    {team.pilotFour ? ', ' + team.pilotFour : null}
                    &nbsp;
                    <button
                        onClick={() => {
                            setTeams(teams.filter((t) => t.name !== team.name));
                        }}
                    >
                        remove
                    </button>
                </div>
            ))}
            <br />

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Label>
                    <StyledInput
                        type="number"
                        pattern="\d*"
                        width={100}
                        {...register('name')}
                        placeholder="Team Number"
                    />
                    <br />
                    <StyledInput type="text" width={130} {...register('pilotOne')} placeholder="Pilot One" />
                    <StyledInput type="text" width={130} {...register('pilotTwo')} placeholder="Pilot Two" />
                    <StyledInput type="text" width={130} {...register('pilotThree')} placeholder="Pilot Three" />
                    <StyledInput type="text" width={130} {...register('pilotFour')} placeholder="Pilot Four" />
                </Label>

                <button type="submit">Add team</button>
            </StyledForm>
        </SectionWrapper>
    );
};

export default Teams;
