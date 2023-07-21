export interface MeetingInfo {
    id: number;
    description: string;
    studentName: string;
    studentId: string;
    startDate: string;
    endDate: string;
    status: 'finalized' | 'waitingToAddProfessor' | 'waitingForProfessors' | 'waitingForFinalize';
    finalDate: string;
}