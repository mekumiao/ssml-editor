# Vue 3 + TypeScript + Vite

## 踩坑记录

### 项目中的`tsconfig.json`文件中不能添加扩展，否者会导致`build`包失败

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json"
  // ...
}
```

猜测：可能是链接里边的属性冲突了，具体不知道是哪些属性

### 打包时推断`*d.ts`声明文件使用库`vite-plugin-dts`不能用`3.x.x`版本的，否者产物不可用

推荐使用`2.x.x`版本

> package.json

```json
{
  "devDependencies": {
    // **
    "vite-plugin-dts": "^2.3.0"
    // **
  }
}
```

### 使用 `@types/node:18`版本会报错，请使用 `@types/node:20`
