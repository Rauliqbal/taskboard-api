import { Hono } from "hono";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/TaskController";

const router = new Hono();

// Routes Task
router.get('/task',(c)=> getTasks(c))
router.get('/task/:id', (c)=> getTaskById(c))
router.post("/task", (c)=> createTask(c))
router.patch('/task/:id', (c) => updateTask(c))
router.delete('/task/:id', (c) => deleteTask(c))

export const Routes = router