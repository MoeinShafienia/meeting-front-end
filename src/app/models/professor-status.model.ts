import {DateStatus} from './date-status.model';

export interface ProfessorStatus {
    id: string;
    name: string;
    status: 'complete' | 'pending';
    description: string;
    dateStatus: {
        id: number;
        value: string;
        canFinilize: boolean;
        status: boolean;
    }[];

}