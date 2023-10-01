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

執行到最後一步後，可以開啟 `http://localhost:4000/`，成功畫面應該會長這樣：

![tste](/assets/imgs/screenshot%202023-10-01%2014.25.30.png)

過程中有一些需要注意的地方：

1. 執行 `gem install ...` 時可能發生 Permission denied 的 error，這時記得加上 `sudo`。
2. 官網有提到使用 Ruby 3.0.0 以上的版本時，執行 `bundle exec jekyll serve` 可能會出錯，這時先執行 `bundle add webrick` 就可以解決
3. 有時會遇到 gem 的版本問題，這時照著錯誤訊息更新到能用的版本就可以了[^1]

如果到最後一步都能成功執行，那麼恭喜你，可以開始寫文章啦！

## Jekyll Configuration

Jekyll 安裝好之後只是能動，許多內容需要進行調整。`_config.yml` 中有些基本資料可以先改成自己的（下面是預設的內容）：

```yaml
title: Your awesome title
email: your-email@example.com
description: >- # this means to ignore newlines until "baseurl:"
    Write an awesome description for your new site here. You can edit this
    line in _config.yml. It will appear in your document head meta (for
    Google search results) and in your feed.xml site description.
baseurl: '' # the subpath of your site, e.g. /blog
url: '' # the base hostname & protocol for your site, e.g. http://example.com
twitter_username: jekyllrb
github_username: jekyll
```

Jekyll 也有需多主題可以使用，[jekyllthemes.io](https://jekyllthemes.io/) 這個網站內就有許多別人設計好的主題（我用的也是這裡找的），裡面包含付費跟免費的主題。我使用的主題是 [Clean Blog Jekyll theme](https://jekyllthemes.io/theme/startbootstrap-clean-blog-jekyll)，[下一篇文章]({% post_url 2023-10-01-jekyll-customization %})會專門介紹使用方式，我自己是有另外修改一些細節（字體、文字大小、縮排等等），讓整體更符合我的構想。

### File Structure

執行 `jekyll new myblog` 之後 Jekyll 會幫我們建立好資料夾跟檔案，了解他們的用途可以讓我們掌握整個網站的架構。
對於 Ruby 不同檔案的功能的介紹可以參考[這篇](https://ithelp.ithome.com.tw/articles/10227960)，這邊我就不多做介紹（主要我也不是很懂 XD）。一開始經過 Jekyll 初始化後的檔案架構可能長這樣：

```txt
├── 404.html
├── Gemfile
├── Gemfile.lock
├── _config.yml
├── _posts
│   └── 2023-10-01-welcome-to-jekyll.markdown
├── _site
│   ├── 404.html
│   ├── about
│   │   └── index.html
│   ├── assets
│   │   ├── main.css
│   │   ├── main.css.map
│   │   └── minima-social-icons.svg
│   ├── feed.xml
│   ├── index.html
│   └── jekyll
│       └── update
│           └── 2023
│               └── 10
│                   └── 01
│                       └── welcome-to-jekyll.html
├── about.markdown
└── index.markdown
```

我們主要寫的文章基本上都放在 `_posts/` 這個資料夾，其他外層的檔案如 `index.markdown` 與 `about.markdown` 等檔案則是首頁與 about 頁面的內容，Jekyll 會幫我們把整個網站（包含 `markdown` 文件）編譯，輸出到 `_site` 這個資料夾內（所以通常會把 `_site/` 加到 `.gitignore` 裡面，不需要上傳到 Github，上傳後 Github 在進行部署時就會編出來了）。

文章的標題有固定的格式：`YYYY-MM-DD-filename.md`。內容的部分可以在開頭加上 front matter，定義這篇文章的屬性，像是：

```txt
---
layout: post
title: '文章標題'
subtitle: '子標題'
date: 2023-09-30 10:45:13 +0800
---
```

`layout` 可以當作要使用的模板，一般的文章都是使用 `post`。其他如標題、時間等會出現在首頁等文章列表內，看起來更像一個完整的部落格。

[^1]: reference: [https://github.com/sass/sassc-ruby/issues/146#issuecomment-541364174](https://github.com/sass/sassc-ruby/issues/146#issuecomment-541364174)
