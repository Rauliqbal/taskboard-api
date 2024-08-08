import { Context } from "hono";

import prisma from '../../prisma/client';

// Get all tasks
export const getTasks = async (c: Context) => {
  const tasks = await prisma.task.findMany();
  return c.json({
    status: "success",
    message: "List Tasks!",
    data: tasks
  });
}

// Get Task By Id
export const getTaskById = async (c: Context) => {
  const { id } = c.req.param();
  const task = await prisma.task.findUnique({
    where: {
      id: String(id)
    }
  });

  if(!task){
    return c.json({
      status: "error",
      message: "Task not found!"
    });
  }

  return c.json({
    status: "success",
    message: "Get Task By Id!",
    data: task
  });
}

// Create Task
export const createTask = async (c: Context) =>{
  const {title,body,icon} = await c.req.json()

  if(!title || !body || !icon ){
    return c.json({
      status: "error",
      message: "title,body,icon is required"
    });
  }

  const task = await prisma.task.create({
    data: {
      title,
      body,
      icon,
    }
  });
  return c.json({
    status: "success",
    message: "Create Task!",
    data: task
  });}

// Update Task
export const updateTask  = async(c: Context) =>{
  const {id} = c.req.param()
  const {title,body,icon,status} = await c.req.json()
  const task = await prisma.task.update({
    where: {
      id: String(id)
    },
    data: {
      title,
      body,
      icon,
      status
    }
  });
  return c.json({
    status: "success",
    message: "Update Task!",
    data: task
  });
}

// Delete Task
export const deleteTask = async(c:Context) => {
  const {id} = c.req.param()

  const task = await prisma.task.delete({
    where: {
      id: String(id)
    }
  });

  if(!task) {
    return c.json({
      status: "error",
      message: "Task not found!"
    });
  }

  let {title} = task
  return c.json({
    status: "success",
    message: ` Task "${title}"! sucessfully deleted!`,
  });
}