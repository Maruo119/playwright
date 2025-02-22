// @ts-check
import { test, expect } from '@playwright/test';
import { getUserInfo } from '../utils/userInfoUtils.js';

test('has title', async ({ page }) => {

  // ページにアクセスし、読み込みが完全に終了するまで待機
  await page.goto('https://cbt.studysapuri.jp/exam-student/login', {
    waitUntil: 'networkidle'  // ページが完全に読み込まれるまで待機
  });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Webテスト スタディサプリ');

  await page.screenshot({ path: `./screenshots/screenshot_${Date.now()}.png` });

  const { userId, password } = await getUserInfo();  // getUserInfoを呼び出し、userid, passwordを取得

  // テキストの入力
  await page.locator('//*[@id="app"]/div/div/div[1]/div/div/div[1]/div[2]/div/input[1]').fill(userId);
  await page.locator('//*[@id="app"]/div/div/div[1]/div/div/div[1]/div[2]/div/input[2]').fill(password);

  await page.screenshot({ path: `./screenshots/screenshot_${Date.now()}.png` });

});

