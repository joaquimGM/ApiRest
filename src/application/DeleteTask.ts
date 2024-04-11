import { TaskRepository } from "../domain/TaskRepository";
import { Task } from "../domain/task";

export class DeleteTask {
  constructor(private taskRepository: TaskRepository) {}

  execute(id: string): Task | null {
    return this.taskRepository.deleteTask(id);
  }
}
