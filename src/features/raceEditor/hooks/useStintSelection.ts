import { useCallback } from 'react';
import { StintsByPilotsData } from '../components/Main/Main.types';

interface UseStintSelectionParams {
    stintsByPilots: StintsByPilotsData;
    setStintsByPilots: (
        value: StintsByPilotsData | ((val: StintsByPilotsData) => StintsByPilotsData)
    ) => void;
}

interface UseStintSelectionReturn {
    getStintData: (teamName: string, stintIndex: number) => { pilot?: string; kart?: string } | undefined;
    updatePilot: (teamName: string, stintIndex: number, pilot: string) => void;
    updateKart: (teamName: string, stintIndex: number, kart: string) => void;
    clearStint: (teamName: string, stintIndex: number) => void;
}

export const useStintSelection = ({
    stintsByPilots,
    setStintsByPilots,
}: UseStintSelectionParams): UseStintSelectionReturn => {
    const updateStintField = useCallback(
        (
            teamName: string,
            stintIndex: number,
            updater: (
                current: { pilot?: string; kart?: string } | undefined
            ) => { pilot?: string; kart?: string } | undefined
        ) => {
            setStintsByPilots((prev) => {
                const newArray = [...(prev[teamName] ?? [])];
                newArray[stintIndex] = updater(newArray[stintIndex]) ?? {};
                return { ...prev, [teamName]: newArray };
            });
        },
        [setStintsByPilots]
    );

    const getStintData = useCallback(
        (teamName: string, stintIndex: number) => {
            return stintsByPilots[teamName]?.[stintIndex];
        },
        [stintsByPilots]
    );

    const updatePilot = useCallback(
        (teamName: string, stintIndex: number, pilot: string) => {
            updateStintField(teamName, stintIndex, (current) => ({
                pilot,
                kart: current?.kart,
            }));
        },
        [updateStintField]
    );

    const updateKart = useCallback(
        (teamName: string, stintIndex: number, kart: string) => {
            updateStintField(teamName, stintIndex, (current) => ({
                pilot: current?.pilot,
                kart,
            }));
        },
        [updateStintField]
    );

    const clearStint = useCallback(
        (teamName: string, stintIndex: number) => {
            updateStintField(teamName, stintIndex, () => undefined);
        },
        [updateStintField]
    );

    return { getStintData, updatePilot, updateKart, clearStint };
};
