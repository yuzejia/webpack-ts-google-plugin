# webpack-ts-google-plugin

webpack5+ts+eslint 构建google-plugin
+ ts 
+ less
+ jquery

### chrome Api ts 类型库
https://www.npmjs.com/package/@types/chrome 

### ts-node 
执行 webpack.config.ts
```
webpack --mode production --config ./webpack.config.ts
```

git clone git@github.com:yuzejia/webpack-ts-google-plugin.git

npm install

开发说明：
manifest.json中.文件的配置按照最后输出的文件格式。ts 只是开发辅助。

dist 输出目录结构：
```jsvascript
--dist
    -- html
        -- index.html
    -- js
        -- bg.js
    -- manifest.json
```
manifest.json

```json
{
   ...
    "browser_action": {
        "default_popup": "./html/index.html"
    },
    "background": {
        "scripts": ["./js/bg.js"],
        "persistent": true
    },
   
    ...
    "content_scripts": [{
        ...
        "js": [
            "./js/content.js"
        ],
        ...
    }]
}
```

### jquery的使用
项目中初始了npm Jquery [https://www.npmjs.com/package/jquery](https://www.npmjs.com/package/jquery)

```
npm i jquery --save-dev
```

**由于项目是ts 开发 需要安装 @types/jquery**

[https://www.npmjs.com/package/@types/jquery](https://www.npmjs.com/package/@types/jquery)
```
npm install --save @types/jquery
```

**ts 文件中引用**
```ts
import $ from "jquery";
```
