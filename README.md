# 學習 gulp 4.0

## 環境

```
# package.json
# 有使用 devDependencies 及 dependencies 環境區分
# 開發套件一律安裝於 devDependencies
--save-dev
# 產品套件一律安裝於 dependencies
--save
# 移除產品環境以外的 node 套件
npm prune --production
# 移除開發環境以外的 node 套件
npm prune --no-production
```

## 安裝與運行

```
# node 版本 v12.15.0
# 請使用 nvm 切換版本

# gulp 之前安裝過的話版本上可能不同，可以刪除先前安裝過的 gulp
npm rm --global gulp
# gulp 4.0 全域安裝寫法
npm install gulp-cli -g
# 安裝 npm
npm install
```
