export interface Task {
    id: any;
    title: string;
    description: string;
    status: 'complete' | 'incomplete';
    createdAt: Date;
}
