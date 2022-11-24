// eslint-disable-next-line plentific/no-cyclic-modules-imports
import { c } from 'modules/c/cyclic-import' // should be error
// just test
import { g } from 'libs/g/cyclic-import' // should be error

export const a: number = c
export const aa: number = g
