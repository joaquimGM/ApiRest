import express from "express";
import { TaskRepository } from "../../domain/TaskRepository";
import { GetAllTasks } from "../../application/GetAllTasks";
import { CreateTask } from "../../application/CreateTask";
import { MarkTaskAsCompleted } from "../../application/MarkTaskAsCompleted";
import { DeleteTask } from "../../application/DeleteTask";
import { JsonFileTaskRepository } from "../JsonFileTaskRepository";

const taskRouter = express.Router();
const taskRepository: TaskRepository = new JsonFileTaskRepository();

taskRouter.get("/tasks", (req, res) => {
  const getAllTasks = new GetAllTasks(taskRepository);
  const tasks = getAllTasks.execute();
  res.json(tasks);
});

taskRouter.post("/tasks", (req, res) => {
  const createTask = new CreateTask(taskRepository);
  const newTask = createTask.execute(req.body);
  res.status(201).json(newTask);
});

taskRouter.put("/tasks/:id/complete", (req, res) => {
  const markTaskAsCompleted = new MarkTaskAsCompleted(taskRepository);
  const completedTask = markTaskAsCompleted.execute(req.params.id);
  if (completedTask) {
    res
      .status(200)
      .json({ message: `Task '${completedTask.id}' has been completed.` });
  } else {
    res.status(404).json({ message: "Task not found." });
  }
});

taskRouter.delete("/tasks/:id", (req, res) => {
  const deleteTask = new DeleteTask(taskRepository);
  const deletedTask = deleteTask.execute(req.params.id);
  if (deletedTask) {
    res.status(200).json({
      message: `Task '${deletedTask.id}' has been deleted successfully.`,
    });
  } else {
    res.status(404).json({ message: "Task not found." });
  }
});

export default taskRouter;
