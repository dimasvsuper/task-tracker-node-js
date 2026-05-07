import {
  addTask,
  updateTask,
  deleteTask,
  markTaskInProgress,
  markTaskDone,
  listTasks,
} from '../services/taskService.mjs';
import { HELP_TEXT } from '../config/constants.mjs';

export async function runCommand(command, args) {
  switch (command) {
    case 'add':
      return addTask(args.join(' ').trim());
    case 'update':
      return updateTask(args[0], args.slice(1).join(' ').trim());
    case 'delete':
      return deleteTask(args[0]);
    case 'mark-in-progress':
      return markTaskInProgress(args[0]);
    case 'mark-done':
      return markTaskDone(args[0]);
    case 'list':
      return listTasks(args[0]);
    default:
      console.log(HELP_TEXT);
      break;
  }
}

export { HELP_TEXT };
