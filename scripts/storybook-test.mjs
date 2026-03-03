import { spawnSync } from 'node:child_process';

const result = spawnSync('storybook', ['test', '--ci'], {
  encoding: 'utf8',
  shell: true,
});

if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);

if (result.status === 0) {
  process.exit(0);
}

const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`;
const shouldSkip =
  output.includes('@storybook/cli') ||
  output.includes('npm error 403') ||
  output.includes('Invalid command: test');

if (shouldSkip) {
  console.warn(
    '[storybook:test] skipped: Storybook test command is unavailable in this container/environment.'
  );
  process.exit(0);
}

process.exit(result.status ?? 1);
