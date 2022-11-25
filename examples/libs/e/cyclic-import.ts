// should be error, because "b" isn't not declared as dependency of "e"
// eslint-disable-next-line plentific/no-cyclic-modules-imports
import { b } from "modules/b/cyclic-import";

export const e: number = b;
