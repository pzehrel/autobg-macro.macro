import type { UnitConvertConfig } from './UnitUtil';

export type Config = Partial<UnitConvertConfig> & {
  /**
   * 基础路径
   * @default './src'
   */
  baseUrl?: string;

  /**
   * 强制使用require导入图片
   * - true: 强制使用 require，一般在webpack编译器下设置
   * - false: 强制使用 new URL，一般在vite编译器下设置
   * - null: 通过判断 require 是否存在来决定是否使用 require。这可能会导致生成的代码比较多
   * @default null
   */
  require?: boolean | null;

  /**
   * 是否导出为ES模块，在vite下无效
   * @default false
   */
  esModule?: boolean;
};

const defaultConfig: Required<Config> = {
  unit: 'px',
  baseUrl: './src',
  designWidth: 750,
  rootValue: 100,
  unitPrecision: 5,
  esModule: false,
  require: null
};

/**
 * 合并用户配置和默认配置
 * @param configs 配置项
 */
export const mergeConfig = (...configs: Config[]): Required<Config> => {
  const config = configs.reduce((prev, curr) => ({ ...prev, ...curr }), {} as Config);
  return { ...defaultConfig, ...config };
};
