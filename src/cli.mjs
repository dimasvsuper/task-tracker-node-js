import { runCommand, HELP_TEXT } from './commands/taskCommands.mjs';

export async function runCli(args) {
  if (args.length === 0) {
    console.log(HELP_TEXT);
    return;
  }

  const [command, ...rest] = args;
  return runCommand(command, rest);
}
