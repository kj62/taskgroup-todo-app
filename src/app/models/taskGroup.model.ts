import { UserTask } from './UserTask.model';

export class TaskGroup extends UserTask {
    name: string;
    userTasks: UserTask[];
}
