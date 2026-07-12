import type { Organizer } from '@evhandel/wroomz-types';
import { CreateRaceDto, Race } from '../../api';

export interface RaceFormProps {
    title: string;
    submitLabel: string;
    submitPendingLabel: string;
    errorMessage: string;
    successMessage: string;
    defaultValues?: RaceFormValues;
    initialRaceData?: Race;
    onSubmit: (data: CreateRaceDto) => void;
    isPending: boolean;
    isError: boolean;
    currentUserOrganizer: Organizer | null;
    isSuperadmin: boolean;
}

export interface RaceFormValues {
    name: string;
    organizer: Organizer;
    isPublished: boolean;
}
