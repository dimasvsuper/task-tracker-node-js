import { readTasks, writeTasks } from '../model/storage.mjs';
import { STATUSES } from '../config/constants.mjs';
import { formatTask } from '../utils/format.mjs';

function getNextId(tasks) {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map((task) => task.id)) + 1;
}

export async function addTask(description) {
  if (!description) {
    console.error('Error: description is required for add command.');
    return;
  }

  const tasks = await readTasks();
  const now = new Date().toISOString();
  const newTask = {
    id: getNextId(tasks),
    description,
    status: 'todo',
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  await writeTasks(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

export async function updateTask(idArg, description) {
  const id = Number(idArg);
  if (!idArg || Number.isNaN(id)) {
    console.error('Error: valid id is required for update command.');
    return;
  }

  if (!description) {
    console.error('Error: new description is required for update command.');
    return;
  }

  const tasks = await readTasks();
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    console.error(`Error: task with ID ${id} not found.`);
    return;
  }

  task.description = description;
  task.updatedAt = new Date().toISOString();
  await writeTasks(tasks);
  console.log(`Task updated successfully (ID: ${id})`);
}

export async function deleteTask(idArg) {
  const id = Number(idArg);
  if (!idArg || Number.isNaN(id)) {
    console.error('Error: valid id is required for delete command.');
    return;
  }

  const tasks = await readTasks();
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    console.error(`Error: task with ID ${id} not found.`);
    return;
  }

  tasks.splice(index, 1);
  await writeTasks(tasks);
  console.log(`Task deleted successfully (ID: ${id})`);
}

async function changeTaskStatus(idArg, status) {
  const id = Number(idArg);
  if (!idArg || Number.isNaN(id)) {
    console.error('Error: valid id is required.');
    return;
  }

  const tasks = await readTasks();
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    console.error(`Error: task with ID ${id} not found.`);
    return;
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();
  await writeTasks(tasks);
  console.log(`Task status updated to ${status} (ID: ${id})`);
}

export async function markTaskInProgress(idArg) {
  return changeTaskStatus(idArg, 'in-progress');
}

export async function markTaskDone(idArg) {
  return changeTaskStatus(idArg, 'done');
}

export async function listTasks(filter) {
  const tasks = await readTasks();
  let filtered = tasks;

  if (filter) {
    if (!STATUSES.includes(filter)) {
      console.error('Error: invalid status filter. Use todo, in-progress, or done.');
      return;
    }
    filtered = tasks.filter((task) => task.status === filter);
  }

  if (filtered.length === 0) {
    console.log('No tasks found.');
    return;
  }

  filtered.forEach((task) => {
    console.log(formatTask(task));
  });
}
