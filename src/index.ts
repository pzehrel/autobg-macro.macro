import { createMacro } from 'babel-plugin-macros';
import { handler } from './handler';

import { name } from '../package.json';
// import type { UnitConvertConfig } from './UnitUtil';

interface Autobg {
  (path: string): string;
  // (path: string, config: Partial<UnitConvertConfig>): string;
}
const autobg: Autobg = createMacro(handler, { configName: name });

export default autobg;
export type { Config } from './config';
