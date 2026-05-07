import { promises as fs } from 'fs';
import path from 'path';

const TASK_FILE = path.resolve('data', 'task.json');

async function ensureTaskFile() {
  try {
    await fs.access(TASK_FILE);
  } catch {
    await fs.mkdir(path.dirname(TASK_FILE), { recursive: true });
    await fs.writeFile(TASK_FILE, '[]', 'utf-8');
  }
}

export async function readTasks() {
  await ensureTaskFile();

  try {
    const content = await fs.readFile(TASK_FILE, 'utf-8');
    if (!content.trim()) return [];

    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) {
      console.error('Warning: tasks file is not an array, resetting storage.');
      await writeTasks([]);
      return [];
    }

    return parsed;
  } catch (error) {
    console.error('Warning: invalid tasks file, resetting storage.');
    await writeTasks([]);
    return [];
  }
}

export async function writeTasks(tasks) {
  try {
    await fs.writeFile(TASK_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing tasks file:', error.message);
  }
}
