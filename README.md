# autobg-macro.macro


[中文](./README_ZH.md)



a Babel macro that can automatically generate CSS code for background image, width, and height based on a given image path. It is typically used in conjunction with styled-components.

This project is a fork of[littlee/autobg.macro](https://github.com/littlee/autobg.macro), with additional features:

- Supports both Vite and webpack
- Supports vw and rem units



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

Assuming the size of the image file is 750x750, the above code is compiled as:
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
| baseUrl       | string        | ./src  | Basic URL for image path resolution                          |
| esModule      | boolean       | false  | Set this value to the same as the URL loader or file loader. Set it to false when using react-scripts<4 |
| require       | boolean\|null | null   | Forces the use of require to import images. If false, use new URL. If true, use require. If null, decide whether to use require by judging if require exists. This may result in more generated code. |
| unit          | px\|vw\|rem   | px     | CSS unit for image width and height in the generated CSS     |
| designWidth   | number        | 750    | Effective when unit = vw. Used to calculate the conversion factor from px to vw |
| rootValue     | number        | 100    | Effective when unit = rem. Used to calculate the conversion factor from px to rem |
| unitPrecision | number        | 5      | The number of decimal places to keep when converting px to other units |



Use the `autobg-macros.macros` field in the `package.json` file as an example of the configuration. For more configuration details, please refer to [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md#config)



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

