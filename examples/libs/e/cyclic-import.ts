// eslint-disable-next-line plentific/no-cyclic-modules-imports
import { b } from "modules/b/cyclic-import"; // should be error

export const e: number = b;
