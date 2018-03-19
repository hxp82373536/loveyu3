添加es7新特性修饰器支持
1、 npm install --save-dev babel-plugin-transform-decorators-legacy
2、 在node_modules/babel-preset-react-app/index.js  
    plugins中添加如下语句：
    require.resolve('babel-plugin-transform-decorators-legacy')
