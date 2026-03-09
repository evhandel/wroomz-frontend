import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { useStore } from 'zustand';
import type { StoreApi } from 'zustand';
import type { RaceResponse } from '@evhandel/wroomz-types';
import { createRaceEditorStore, RaceEditorStoreState } from './raceEditorStore';
import { EditorSnapshot } from '../types';

const RaceEditorStoreContext = createContext<StoreApi<RaceEditorStoreState> | null>(null);

interface RaceEditorProviderProps {
    children: ReactNode;
    initialRaceData?: RaceResponse;
    onCalculate?: (snapshot: EditorSnapshot) => void;
}

export const RaceEditorProvider: React.FC<RaceEditorProviderProps> = ({
    children,
    initialRaceData,
    onCalculate,
}) => {
    const storeRef = useRef<StoreApi<RaceEditorStoreState> | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createRaceEditorStore({ initialRaceData, onCalculate });
    }

    return (
        <RaceEditorStoreContext.Provider value={storeRef.current}>
            {children}
        </RaceEditorStoreContext.Provider>
    );
};

export function useRaceEditorStore<T>(selector: (state: RaceEditorStoreState) => T): T {
    const store = useContext(RaceEditorStoreContext);
    if (!store) {
        throw new Error('useRaceEditorStore must be used within a RaceEditorProvider');
    }
    return useStore(store, selector);
}
