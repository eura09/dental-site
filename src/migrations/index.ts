import * as migration_20261023_153917_initial from './20261023_153917_initial'

export const migrations = [
  {
    up: migration_20261023_153917_initial.up,
    down: migration_20261023_153917_initial.down,
    name: '20261023_153917_initial',
  },
]
