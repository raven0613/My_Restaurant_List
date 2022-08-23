# My_Restaurant_List
使用express.js的handlebars 製作的專案練習，在這裡，你可以
<ol dir="auto">
<li>瀏覽所有清單中的餐廳</li>
<li>搜尋餐廳的名稱與類別進行篩選</li>
<li>點擊sort進行餐廳的順序排列</li>
<li>進行對餐廳的新增、刪除、修改、查看詳細資訊</li>
<li>用email註冊自己的帳號，或是用facebook登入</li>
</ol>

![image](https://user-images.githubusercontent.com/93082842/180252502-660a9aec-aa06-4b9e-8d6e-a0cf5e8c6e32.png)
<br>


<h2 dir="auto"><a id="user-content-安裝專案" class="anchor" aria-hidden="true" href="#安裝專案"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>安裝專案</h2>

<ol dir="auto">
<li>前置作業：請先確認已安裝 git / node.js / npm</li>
<br>
<li>在terminal輸入以下文字，複製專案至本機資料夾中</li>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="git clone https://github.com/raven0613/My_Restaurant_List.git"><pre class="notranslate"><code>git clone https://github.com/raven0613/My_Restaurant_List.git
</code></pre></div>
<li>※以下步驟請確認terminal的目前資料夾位置是在 My_Restaurant_List※</li>
<br>
<li>下載express.js</li>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="npm install express"><pre class="notranslate"><code>npm install express
</code></pre></div>
<li>參考.env.example建立.evn檔案，並填入所需資訊</li>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="touch .env"><pre class="notranslate"><code>touch .env
</code></pre></div>
<li>啟動專案</li>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="npm run start"><pre class="notranslate"><code>npm run start
</code></pre></div>
<li>terminal出現以下文字代表成功啟動</li>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="server is starting with port 3000"><pre class="notranslate"><code>server is starting with port 3000
</code></pre></div>
<li>在任一瀏覽器網址列輸入以下網址，開始體驗！</li>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="http://localhost:3000/"><pre class="notranslate"><code>http://localhost:3000/
</code></pre></div>
<li>如需關閉專案請在 terminal 輸入ctrl + C ，若要重新開啟，請從5.繼續</li>

</ol>



<br>

<h2 dir="auto"><a id="user-content-使用專案" class="anchor" aria-hidden="true" href="#使用專案"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>使用專案</h2>

<ol dir="auto">
<li>使用種子檔新增user1和user2，及各3筆餐廳資料</li>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="npm run seed"><pre class="notranslate"><code>npm run seed
</code></pre></div>

<li>使用新增的user1和user2登入體驗</li>
<br>
user1帳號
<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="user1@example.com"><pre class="notranslate"><code>user1@example.com
</code></pre></div>
user2帳號
<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="user2@example.com"><pre class="notranslate"><code>user2@example.com
</code></pre></div>
user1 & user2密碼
<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="12345678"><pre class="notranslate"><code>12345678
</code></pre></div>



</ol>




<br>

<h2 dir="auto"><a id="user-content-開發工具" class="anchor" aria-hidden="true" href="#開發工具"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>開發工具</h2>
<ul dir="auto">
<li>Node.js 16.14.2</li>
<li>Express 4.18.1</li>
<li>Express-Handlebars 6.0.6</li>
<li>Bootstrap 5.1.3</li>
<li>Font-awesome 6.1.1</li>
<li>bcryptjs 2.4.3</li>
<li>connect-flash 0.1.1</li>
<li>dotenv 8.2.0</li>
<li>mongoose 3.0.0</li>
<li>passport 0.4.1</li>
<li>method-override 3.0.0</li>
</ul>

