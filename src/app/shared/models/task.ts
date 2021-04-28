import { TaskStatus } from '../enums/task-status';
import { User } from './user';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  user: User;
  userId: number;
}
