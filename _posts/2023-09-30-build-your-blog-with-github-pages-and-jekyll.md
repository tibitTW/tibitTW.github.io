---
layout: post
title: '使用 Github Pages 與 Jekyll 建立部落格環境'
subtitle: ''
date: 2023-09-30 10:45:13 +0800
background: ''
---

今天聽完 podcast 之後決定自己也來寫個部落格，記錄自己的成長。第一篇文章就拿來記錄建立部落格的過程吧！

原本有考慮過 Medium 等部落格網站，不過為了方便管理文章（或日後需要搬家），後來決定使用 `markdown` 文件記錄。
由於之前有用過 Github pages，免費又好用當然就繼續用啦！
Github Pages 的[介紹頁面](https://pages.github.com/)中提到了 [Jekyll](https://jekyllrb.com/) 框架，
它以 Ruby 為基礎，可以把 `markdown` 文件編成靜態網站，也可以設計模板或套用其他人設計的主題來豐富外觀。
事不宜遲，準備開工！

## Environment Preparation

第一步就是使用 Github pages 來取得可以用的域名。照著下面的步驟就可以申請啦！

1. 首先當然需要準備一個 [Github](github.com) 帳號

(流程待補充)

## Jekyll Configuration

Jekyll 也有需多主題可以使用，[jekyllthemes.io](https://jekyllthemes.io/) 這個網站內就有許多別人設計好的主題（我用的也是這裡找的），
裡面包含付費跟免費的主題。我使用的主題是 [Clean Blog Jekyll theme](https://jekyllthemes.io/theme/startbootstrap-clean-blog-jekyll)，

## 一些關於 ruby 的基本觀念

https://ithelp.ithome.com.tw/articles/10227960

### 一些遇到的困難

1. 安裝 Jekyll 時發生的問題
    1. 想執行 `jekyll serve` 時發生 error
       https://github.com/sass/sassc-ruby/issues/146#issuecomment-541364174
    2.
2. push 到 Github pages 後發生 deployment error
    1. 我的原因是 ruby 在執行 `bundle install` 時找不到我用的主題套件，後來找到下面連結這個解法就解決了
       https://stackoverflow.com/questions/70654418/github-pages-build-error-the-jekyll-theme-hydejack-theme-could-not-be-found
3. 字體問題：如何使用自訂字體？

    1. 把想用的字體檔案（`.ttf` / `.otf` 等）放到 `/assets/fonts/` 這個資料夾內
    2. 在 `.scss` 檔案裡面用 `@font-face` 指定要用的字體名稱跟路徑
        ```css
        @font-face {
            font-family: '<font-name>';
            src: url('/assets/fonts/<font-file-name>');
        }
        ```
    3. 完成

    https://www.reddit.com/r/Jekyll/comments/83o680/jekyll_custom_fonts/
