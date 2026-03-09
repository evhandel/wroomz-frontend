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
}

export interface RaceFormValues {
    name: string;
    isPublished: boolean;
}
