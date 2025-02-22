import { encryptPassword, decryptPassword } from '../utils/encrypt_deprypt.js';

// AES-GCMでパスワードを暗号化する関数
async function getUserInfo() {
  // fsモジュールをインポート
  const fs = require('fs');

  // Promiseを返すように変更
  return new Promise((resolve, reject) => {
    // ファイルを非同期で読み込み
    fs.readFile('utils/userInfo.txt', 'utf8', (err, data) => {
      if (err) {
        reject('Error reading file:', err);  // エラー時はreject
        return;
      }

      // ファイルの内容を行ごとに分割
      const lines = data.split('\n');

      // ユーザーIDとパスワードを取得
      const userId = lines[0].trim();  // 1行目: ユーザーID
      //const password_tmp = lines[1].trim();  // 2行目: パスワード

      // 結果をコンソールに出力
      //console.log(`ユーザーID：${userId}`);
      //console.log(`パスワード：${password_tmp}`);

      // 暗号化・復号化処理（必要に応じてここで使う）
      const keyString = "abc"; // ユーザー固有の鍵（復号化キー）
      
      //encryptPassword(password, keyString); // 暗号化ファイルを作成するときのみコメントイン
      const password = decryptPassword(keyString);

      // userId と password を返す
      resolve({ userId, password: password });
    });
  });
}

export { getUserInfo };