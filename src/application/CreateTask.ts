import { Task } from "../domain/task";
import { TaskRepository } from "../domain/TaskRepository";

export class CreateTask {
  constructor(private taskRepository: TaskRepository) {}

  execute(task: Task): Task {
    task.id = Math.floor(Math.random() * 1000000);
    this.taskRepository.addTask(task);
    return task;
  }
}
