export interface User {
    id: number;
    firstName: string;
    lastName: string;
}

export interface UserTask {
    name: string;
    deadline: string;
    userId: string;
    status: string;
}

export interface TaskGroup {
    id: string;
    name: string;
    userTasks: UserTask[];
}
