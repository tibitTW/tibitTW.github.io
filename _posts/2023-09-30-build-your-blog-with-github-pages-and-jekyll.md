---
layout: post
title: '使用 Github Pages 與 Jekyll 建立部落格環境'
subtitle: ''
date: 2023-09-30 10:45:13 +0800
background: ''
---

今天聽完 podcast 之後決定自己也來寫個部落格，記錄自己的成長。第一篇文章就拿來記錄建立部落格的過程吧！

原本有考慮過 Medium 等部落格網站，不過後來決定使用 `markdown` 文件記錄，方便日後管理文章（或需要把文章搬到其他地方）。由於之前有用過 Github pages，免費又好用當然就繼續用啦！Github Pages 的[介紹頁面](https://pages.github.com/)中提到了 [Jekyll](https://jekyllrb.com/) 框架，它以 Ruby 為基礎，可以把 `markdown` 文件編成靜態網站，也可以設計模板或套用其他人設計的主題來豐富外觀。事不宜遲，準備開工！

## Environment Preparation

第一步就是申請 Github pages 來取得可以用的域名。首先準備一個 [Github](https://github.com) 帳號，之後建立一個新的 repository，名稱取名為 `<your-name>.github.io`，Github 將會自動把這個 repo 當成靜態網站檔案放置的地方。之後把靜態網站的內容丟到這個 repo 內，push 上去之後 Github 就會自動幫我們部署，網域就是 `<your-name>.github.io`（像我就是 tibittw.github.io）。

由於 Github pages 支援 Jekyll 框架，我們可以在 local 端使用 Jekyll 架好整個部落格環境，完成之後整包(?)丟上 Github，接著只要等部署完成就好。

Jekyll 的環境準備基本上照著它的 [documentation](https://jekyllrb.com/docs/) 照做就行，在安裝 Jekyll 前需要將下列準備好（來自它的官網）：

-   Ruby 版本 2.5.0 以上
-   RubyGems
-   GCC and Make

我用的是 Mac 環境，基本只要用 homebrew 安裝 Ruby 就完成。之後在剛剛建立好的 Github repo 內用下列指令就能安裝 Jekyll：

```sh
# install gems
gem install jekyll bundler

# create a new Jekyll site at ./myblog. You can change "myblog" to any name you want
jekyll new myblog && cd myblog

# run server
bundle exec jekyll serve
```

過程中有一些需要注意的地方：

1. 執行 gem install ... 時可能發生 Permission denied 的 error，這時記得加上 sudo
2. 官網有提到使用 Ruby 3.0.0 以上的版本時，執行 bundle exec jekyll serve 可能會出錯，這時先執行 bundle add webrick 就可以解決

如果到最後一步都能成功執行，那麼恭喜你，可以開始寫文章啦！

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
