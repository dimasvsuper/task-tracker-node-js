#!/usr/bin/env node
import { runCli } from './src/cli.mjs';

const args = process.argv.slice(2);

runCli(args).catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
