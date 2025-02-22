// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

  // ページにアクセスし、読み込みが完全に終了するまで待機
  await page.goto('https://cbt.studysapuri.jp/exam-student/login', {
    waitUntil: 'networkidle'  // ページが完全に読み込まれるまで待機
  });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Webテスト スタディサプリ');

  await page.screenshot({ path: `./screenshots/screenshot_${Date.now()}.png` });
});
