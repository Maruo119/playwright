# Playwright

## インストール
https://playwright.dev/docs/intro


## 困ったこと・お役立ち情報・定型文
### ページにアクセスし、読み込みが完全に終了するまで待機

```js
  await page.goto('https://cbt.studysapuri.jp/exam-student/login', {
    waitUntil: 'networkidle'  // ページが完全に読み込まれるまで待機
  });
```

### スクリーンショット
page.screenshot() にはいくつかのオプションがあります。例えば、画像のフォーマットを変更することができます。

* format: 画像形式 ('png' または 'jpeg')
* quality: JPEGの場合、画質を指定できます（0〜100の範囲）
* fullPage: ページ全体のスクリーンショットを撮るかどうか（デフォルトは false）

```js
await page.screenshot({ path: 'screenshot.png' }); // スクリーンショットを保存
await page.screenshot({ path: 'screenshot.png', fullPage: true, format: 'jpeg' });
```

## 暗号化・復号化

### ツール
https://develop.tools/encrypt-decrypt/
