import { Task } from "../domain/task";
import { TaskRepository } from "../domain/TaskRepository";

export class GetAllTasks {
  constructor(private taskRepository: TaskRepository) {}

  execute(): Task[] {
    return this.taskRepository.getAllTasks();
  }
}
