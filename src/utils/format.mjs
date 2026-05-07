export function formatTask(task) {
  return `ID: ${task.id}\n  Description: ${task.description}\n  Status: ${task.status}\n  Created: ${task.createdAt}\n  Updated: ${task.updatedAt}\n`;
}
