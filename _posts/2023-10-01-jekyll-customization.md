---
layout: post
title: 'Jekyll－調整外觀篇'
subtitle: ''
date: 2023-10-01 10:45:13 +0800
background: ''
---

字體問題：如何使用自訂字體？

    1. 把想用的字體檔案（`.ttf` / `.otf` 等）放到 `/assets/fonts/` 這個資料夾內
    2. 在 `.scss` 檔案裡面用 `@font-face` 指定要用的字體名稱跟路徑
        ```css
        @font-face {
            font-family: '<font-name>';
            src: url('/assets/fonts/<font-file-name>');
        }
        ```

https://www.reddit.com/r/Jekyll/comments/83o680/jekyll_custom_fonts/

push 到 Github pages 後發生 deployment error

我的原因是 ruby 在執行 `bundle install` 時找不到我用的主題套件，後來找到下面連結這個解法就解決了
https://stackoverflow.com/questions/70654418/github-pages-build-error-the-jekyll-theme-hydejack-theme-could-not-be-found
