import { Task } from "./task";

export interface TaskRepository {
  getAllTasks(): Task[];
  addTask(task: Task): void;
  markTaskAsCompleted(taskId: string): Task | null;
  deleteTask(taskId: string): Task | null;
}
