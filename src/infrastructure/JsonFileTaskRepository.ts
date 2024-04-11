import fs from "fs";
import path from "path";
import { Task } from "../domain/task";
import { TaskRepository } from "../domain/TaskRepository";

export class JsonFileTaskRepository implements TaskRepository {
  private filePath = path.resolve(__dirname, "../data/Tasks.json");

  getAllTasks(): Task[] {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  addTask(task: Task): void {
    const tasks = this.getAllTasks();
    tasks.push(task);
    fs.writeFileSync(this.filePath, JSON.stringify(tasks));
  }

  markTaskAsCompleted(taskId: string): Task | null {
    const tasks = this.getAllTasks();
    const taskIndex = tasks.findIndex((task) => task.id === Number(taskId));
    if (taskIndex === -1) {
      return null;
    }
    tasks[taskIndex].completed = true;
    fs.writeFileSync(this.filePath, JSON.stringify(tasks));
    return tasks[taskIndex];
  }

  deleteTask(taskId: string): Task | null {
    const tasks = this.getAllTasks();
    const taskIndex = tasks.findIndex((task) => task.id === Number(taskId));
    if (taskIndex === -1) {
      return null;
    }
    const [deletedTask] = tasks.splice(taskIndex, 1);
    fs.writeFileSync(this.filePath, JSON.stringify(tasks));
    return deletedTask;
  }
}
