# autobg-macro.macro

一个 `Babel` 宏，它可以根据给定的图像路径自动生成背景图像、宽度、高度的css代码，通常与 [styled-components](https://github.com/styled-components/styled-components) 一起使用。

迭代自 [littlee/autobg.macro](https://github.com/littlee/autobg.macro)




- 支持 vite 和 webpack
- 支持 vw、rem 单位



## install

```bash
npm i -S autobg-macro.macro
```



## Usage

```ts
import styled from 'styled-components/macro';
import autobg from 'autobg-macro.macro';

const MyDiv = styled.div`
  text-align: center;
  ${autobg('./path/to/img.png')}
  color: red;
`;
```

假设图像文件的大小为750x750，上面的代码被编译为

```ts
import styled from 'styled-components/macro';

const MyDiv = styled.div`
  text-align: center;
  background-image: url('${typeof require === 'function' ? new URL('./path/to/img.png', import.meta.url).toString() : require('./path/to/img.png')?.default}');
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vw;
  color: red;
`;
```



## Config

| 字段名        | 类型          | 默认值 | 说明                                                         |
| ------------- | ------------- | ------ | ------------------------------------------------------------ |
| baseUrl       | string        | ./src  | 图像路径解析基本URL                                          |
| esModule      | boolean       | false  | 将此值设置为与url加载器或文件加载器相同的值，使用react-scripts<4时请设置为false |
| require       | boolean\|null | null   | 强制使用require导入图片，<br />false则使用 new URL。<br />true则使用 require，<br />null则通过判断 require 是否存在来决定是否使用 require，这可能会导致生成的代码比较多。 |
| unit          | px\|vw\|rem   | px     | 生成css的图片宽高css单位                                     |
| designWidth   | number        | 750    | 当unit=vw时有效，用于计算px转vw的系数                        |
| rootValue     | number        | 100    | 当unit=rem时有效，用于计算px转rem的系数                      |
| unitPrecision | number        | 5      | px转其他单位时保留的小数位                                   |



使用 package.json 文件中的 `autobg-macros.macros` 字段的示例配置，有关更多配置详细信息，请参阅 [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md#config)



```javascript
// ./babel-plugin-macros.config.js

module.exports = {
  /** @type {import('autobg-macro.macro').Config)} */
  'autobg-macro.macro': {
    baseUrl: './src',
    unit: 'vw',
    designWidth: 750,
  }
}
```

