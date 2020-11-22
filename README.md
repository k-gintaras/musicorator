# Setup

## Setup with powershell

The setup is made into commands and maybe later will be explained in steps to take in text format.

```powershell

mkdir app-name

cd app-name

npx create-electron-app app-name
npm install library-for-index-js-not-for-angular

cd app-name

```

// angular name here will be same, don’t cd to it

```powershell

ng new app-name

(Get-Content './app-name/src/index.html').replace('&lt;base href="/"&gt;', '&lt;base href="./"&gt;') | Set-Content './app-name/src/index.html'

(Get-Content './app-name/angular.json').replace('"outputPath": "dist/app-name",', '"outputPath": "../dist",') | Set-Content './app-name/angular.json'

(Get-Content './src/index.js').replace('index.html', '../dist/index.html') | Set-Content './src/index.js'

(Get-Content './package.json').replace('"scripts": {', '"scripts": "electron": "npm --prefix ./app-name/ run build &amp;&amp; npm --prefix ./ start",') | Set-Content './package.json'

(Get-Content './package.json').replace('"packagerConfig": {},', '"packagerConfig": {"ignore": ["/app-name"]},') | Set-Content './package.json'

Remove-Item -Path './src/index.html'

Remove-Item -Path './src/index.css'

```

## Test and build

// to quick test

```powershell

cd app-name
ng serve

```

to test
don’t cd to app-name

```powershell

npm run electron

```

to try exe slow 10-20 min, then available at windows

```powershell

npm run make

```

to try exe fast

```powershell

npm run package

```

## Don't forget

TO communicate with electron

```powershell

cd app-name
ng g service electron-communicator
npm install ngx-electron
npm install @angular/forms

```

```typescript

import { FormsModule } from '@angular/forms';
imports: [BrowserModule, AppRoutingModule, FormsModule],

```

when copy base app from github

```powershell

cd to-correct-dir
npm install

```

## Beware of common mistakes

beware of typescript strict

```json

tsconfig.json
"compilerOptions": {
"baseUrl": "./",
"outDir": "./dist/out-tsc",
"forceConsistentCasingInFileNames": true,
"strict": false,
"angularCompilerOptions": {
"strictInjectionParameters": false,
"strictInputAccessModifiers": false,
"strictTemplates": false
}

```

beware of angular versions in package.json
or just copy and replace angular into app-name folder and edit tsconfig to correct out dir for build and index to ./

```json

"dependencies": {
"@angular/animations": "^11.0.2",
"@angular/cdk": "^10.2.7",
"@angular/common": "~11.0.1",
"@angular/compiler": "~11.0.1",
"@angular/core": "~11.0.1",
"@angular/forms": "^11.0.2",
"@angular/material": "^10.2.7",
"@angular/platform-browser": "~11.0.1",
"@angular/platform-browser-dynamic": "~11.0.1",
"@angular/router": "~11.0.1",
"bootstrap": "^4.5.3",
"ngx-electron": "^2.2.0",
"rxjs": "~6.6.0",
"tslib": "^2.0.0",
"zone.js": "~0.10.2"
},

```

beware of
`angular.json`

```json

"styles": [
"./node_modules/bootstrap/dist/css/bootstrap.min.css",
"./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
"./src/styles.css"
],

    "projectType": "application",
    "schematics": {
    "@schematics/angular:application": {
        "strict": false
    }
    },

```

beware of
`index.html`

```html
<base href="./" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" type="image/x-icon" href="./favicon.ico" />
```

If you keep app-name as app-name
beware that `package.json` ignore, ignores correct folder, or electron will build huge app with all `node_modules` and stuff not just from `"dist"`

## You might want to install these

```powershell

npm install --save @angular/material @angular/cdk @angular/animations
npm install bootstrap --save

```
