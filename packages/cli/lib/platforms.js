import { spawn, spawnSync } from 'child_process'

export const npmCommand = (command, destination, args, forkOptions = {}) => {
  const npm = process.platform == 'win32' ? 'npm.cmd' : 'npm'
  return spawnSync(npm, [command, ...args], {
    cwd: destination,
    stdio: 'inherit',
    ...forkOptions,
  })
}

const npmRun = (command, destination, args, forkOptions = {}) => {
  const argv = args && args.length ? ['--', ...args] : []
  const npm = process.platform == 'win32' ? 'npm.cmd' : 'npm'
  return spawn(npm, ['run', command, ...argv], {
    cwd: destination,
    stdio: 'inherit',
    ...forkOptions,
  })
}

const js = {
  async build(destination, args, forkOptions) {
    return npmRun('build', destination, args, forkOptions)
  },
  async run(destination, args, forkOptions) {
    return npmRun('start', destination, args, forkOptions)
  },
  async dev(destination, args, forkOptions) {
    return npmRun('start', destination, args, forkOptions)
  },
  async host(destination, args) {
    return npmRun('host', destination, args)
  },
}

const platforms = { js }

export function getPlatform(name) {
  const platform = platforms[name]
  if (!platform) throw new Error(`Platform "${name}" is not supported`)
  return platform
}
