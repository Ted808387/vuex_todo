#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

#遠端分支
originUrl=$(git config --get remote.origin.url)

nowStatus=${originUrl:0:5}
echo $nowStatus
if [ $nowStatus = 'https' ]
then
  echo '傳輸方式採用 HTTPs 模式'
  echo '目前遠端分支 URL：'$originUrl
else
  echo '傳輸方式採用 SSH 模式'
  echo '目前遠端分支 URL：'$originUrl
fi

# build
npm run build

echo '移動目錄到build的 dist 資料夾'

# 到build目錄下 
cd dist

#初始化dist資料夾
git init
git add -A
git commit -m 'update'

git push -f $originUrl master:gh-pages

cd -