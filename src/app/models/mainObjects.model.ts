export interface User {
    id: string;
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
    name: string;
    userTasks: UserTask[];
}

