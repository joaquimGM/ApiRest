import express from "express";
import taskRouter from "./infrastructure/express/taskRoutes";

const app = express();
app.use(express.json());
app.use(taskRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
