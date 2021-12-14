# webpack-ts-google-plugin

webpack5+ts+eslint 构建google-plugin

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
