import { Task } from './task';

export interface User {
  id?: number;
  username: string;
  password: string;
  tasks: Task[];
}
