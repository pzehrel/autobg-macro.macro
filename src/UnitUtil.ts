/** 支持的css单位 */
export type SupportUnit = 'px' | 'rem' | 'vw';

/** css单位转换配置 */
export type UnitConvertConfig = {
  /**
   * 样式单位
   * @default 'px'
   */
  unit: SupportUnit;

  /**
   * 设计稿宽度，转换vw单位需要用到
   * @default 750
   */
  designWidth: number;

  /**
   * 根元素字体大小，转换rem单位需要用到
   * @default 100
   */
  rootValue: number;

  /**
   * 单位转换时需要保留的小数位
   * @default 5
   */
  unitPrecision: number;
};

export namespace UnitUtil {
  /**
   * 单位转换
   * @param px 值
   * @param config 配置
   * @returns 转换后的值
   */
  export const convert = (px: number, config: UnitConvertConfig) => {
    switch (config.unit) {
      case 'rem':
        return px2rem(px, config.rootValue, config.unitPrecision);
      case 'vw':
        return px2vw(px, config.designWidth, config.unitPrecision);
    }

    // 默认返回px
    if (typeof px === 'number' || (typeof px === 'string' && !Number.isNaN(Number(px)))) {
      return px + 'px';
    }

    // 自带单位的值，直接返回
    return px;
  };

  /**
   * px转vw
   * @param px 值
   * @param designWidth 设计稿宽度
   * @param unitPrecision 单位转换时的小数位限制
   */
  export const px2vw = (px: number, designWidth: number, unitPrecision: number) => {
    px = Number(((Math.round(px) / designWidth) * 100).toFixed(unitPrecision));
    return px + 'vw';
  };

  /**
   * px转rem
   * @param px 值
   * @param rootValue 根元素大小
   * @param unitPrecision 单位转换时的小数位限制
   */
  export const px2rem = (px: number, rootValue: number, unitPrecision: number) => {
    px = Number((px / rootValue).toFixed(unitPrecision));
    return px + 'rem';
  };
}
