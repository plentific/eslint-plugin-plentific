// eslint-disable-next-line plentific/no-cyclic-modules-imports
import { c } from 'modules/c/cyclic-import' // should be error
// eslint-disable-next-line plentific/no-cyclic-modules-imports
import { g } from 'libs/g/cyclic-import' // should be error

// eslint-disable-next-line plentific/no-cyclic-modules-imports
import('modules/c/cyclic-import') // should be error
// eslint-disable-next-line plentific/no-cyclic-modules-imports
import('libs/g/cyclic-import') // should be error

export const a: number = c
export const aa: number = g
