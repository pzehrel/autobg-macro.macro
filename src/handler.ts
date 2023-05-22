import type { MacroHandler } from 'babel-plugin-macros';
import { mergeConfig } from './config';
import * as t from '@babel/types';
import path from 'path';
import { imageSize } from 'image-size';
import fs from 'fs';
import { UnitUtil } from './UnitUtil';
import type * as Babel from '@babel/core';

export const handler: MacroHandler = ({ references, state, babel, config: _inputConfig }) => {
  references.default.forEach((referencePath) => {
    if (
      !referencePath.parentPath ||
      !t.isCallExpression(referencePath.parentPath.node) ||
      referencePath !== referencePath.parentPath.get('callee')
    ) {
      return;
    }

    let nodes = referencePath.parentPath.get('arguments');
    if (!Array.isArray(nodes)) {
      nodes = [nodes];
    }

    // 配置
    const config = mergeConfig(_inputConfig ?? {});
    // const inlineConfig = nodes[1]?.evaluate().value;
    // if (inlineConfig && typeof inlineConfig === 'object') {
    //   config = mergeConfig(config, inlineConfig);
    // }
    // console.log(config);

    // 图片路径
    const imagePath = nodes[0].evaluate().value;

    if (isHttp(imagePath)) {
      // 抛出异常，英文提示不允许使用网络图片
      throw new Error(`The network picture is not allowed, ${imagePath}`);
    }

    // 调用该宏的文件路径不存在
    if (!state.file.opts.filename) {
      throw new Error(`The state.file.opts.filename does not exist, ${imagePath}`);
    }

    // 图片在磁盘中的路径
    const imageFilePath = getImageFilePath(imagePath, config.baseUrl, state.file.opts.filename!);

    // 图片不存在
    if (!fs.existsSync(imageFilePath)) {
      throw new Error(`The image file is not found, ${imageFilePath}`);
    }

    const { width, height } = imageSize(imageFilePath);
    if (!width || !height) {
      console.warn(`The image file is not found, ${imageFilePath}`);
    }

    // 生成代码
    const viteInjectCode = `new URL('${imagePath}', import.meta.url).toString()`;
    const webpackInjectCode = `require('${imagePath}')${config.esModule ? '.default' : ''}`;
    const autoInjectCode = `typeof require === 'undefined' ? ${viteInjectCode} : ${webpackInjectCode}`;

    const injectCode = config.require === null ? autoInjectCode : config.require ? webpackInjectCode : viteInjectCode;

    const css = [
      `background-image: url("\${${injectCode}}");`,
      `background-size: 100%;`,
      `background-repeat: no-repeat;`,
      width !== undefined ? `width: ${UnitUtil.convert(width, config)};` : undefined,
      height !== undefined ? `height: ${UnitUtil.convert(height, config)};` : undefined
    ];

    const ast = cssToAst(css, babel);
    if (ast) {
      referencePath.parentPath.replaceWith(ast);
    }
  });
};

/** 是否http链接 */
const isHttp = (url: string) => /^https?:\/\//.test(url);

/**
 * 获取文件在磁盘中的路径
 * @param filePath 文件路径
 * @param baseUrl 基础路径
 * @param srcFile 当前文件路径
 */
const getImageFilePath = (filePath: string, baseUrl: string, srcFile: string) => {
  // 相对路径
  if (/^\.\//.test(filePath)) {
    return path.resolve(path.dirname(srcFile), filePath);
  }

  // 路径别名
  return path.resolve(process.cwd(), baseUrl, filePath.replace(/^~?@?\/?/, ''));
};

const cssToAst = (css: string | (string | undefined)[], babel: typeof Babel) => {
  if (Array.isArray(css)) {
    css = css.filter(Boolean).join('\n');
  }

  const body = babel.parse(`var str = \`${css}\``)!.program.body[0] as t.VariableDeclaration;
  const ast = body.declarations[0].init;
  return ast;
};
