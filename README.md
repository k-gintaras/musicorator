---
---

<p>The setup is made into commands and maybe later will be explained in steps to take in text format.</p>
<pre><code>mkdir app-name

cmd app-name

npx create-electron-app app-name
</code></pre>

<p>// npm install library-for-index-js-not-for-angular</p>
<pre><code>cd app-name 
</code></pre>
<p>// angular name here will be same, don’t cd to it</p>
<pre><code>ng new app-name

(Get-Content './app-name/src/index.html').replace('&lt;base href="/"&gt;', '&lt;base href="./"&gt;') | Set-Content './app-name/src/index.html'

(Get-Content './app-name/angular.json').replace('"outputPath": "dist/app-name",', '"outputPath": "../dist",') | Set-Content './app-name/angular.json'

(Get-Content './src/index.js').replace('index.html', '../dist/index.html') | Set-Content './src/index.js'

(Get-Content './package.json').replace('"scripts": {', '"scripts": "electron": "npm --prefix ./app-name/ run build &amp;&amp; npm --prefix ./ start",') | Set-Content './package.json'

(Get-Content './package.json').replace('"packagerConfig": {},', '"packagerConfig": {"ignore": ["/app-name"]},') | Set-Content './package.json'

Remove-Item -Path './src/index.html'

Remove-Item -Path './src/index.css'
</code></pre>

<p>// to quick test</p>
<pre><code>cd app-name

ng serve
</code></pre>

<p>// to test<br>
// don’t cd to app-name</p>
<pre><code>npm run electron
</code></pre>
<p>// to try exe slow 10-20 min, then available at windows</p>
<pre><code>npm run make
</code></pre>
<p>// to try exe fast</p>
<pre><code>npm run package
</code></pre>

<p>// TO communicate with electron</p>
<pre><code>cd app-name</code></pre>
<pre><code>ng g service electron-communicator</code></pre>
<pre><code>npm install ngx-electron</code></pre>
<pre><code>npm install @angular/forms</code></pre>
<pre><code>import { FormsModule } from '@angular/forms';</code></pre>
<pre><code>imports: [BrowserModule, AppRoutingModule, FormsModule],</code></pre>
<p></p>
<pre><code></code></pre>
