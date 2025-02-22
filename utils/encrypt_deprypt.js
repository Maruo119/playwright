const crypto = require('crypto');
const fs = require('fs');

// 暗号化の関数
function encryptPassword(password, keyString) {
  const algorithm = 'aes-256-gcm';
  const key = crypto.scryptSync(keyString, 'salt', 32); // パスワードから生成したキー
  const iv = crypto.randomBytes(12); // 初期化ベクトル（IV）

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag(); // 認証タグ

  // 暗号化されたデータとIV、認証タグをファイルに保存
  const encryptedData = {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };

  fs.writeFileSync('encryptedData.json', JSON.stringify(encryptedData)); // 保存する

  console.log('Encrypted data saved locally.');
}

/*
// 使用例
const password = "my_secure_password";
const keyString = "abc"; // ユーザー固有の鍵（復号化キー）
encryptPassword(password, keyString);
*/

// 復号化の関数
function decryptPassword(keyString) {
  const algorithm = 'aes-256-gcm';

  // 保存された暗号化データを読み込む
  const encryptedData = JSON.parse(fs.readFileSync('encryptedData.json', 'utf8'));

  // ユーザーの復号化キー（パスワード）からキーを生成
  const key = crypto.scryptSync(keyString, 'salt', 32); // 復号化キー

  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(encryptedData.iv, 'hex'));
  decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));

  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  //console.log('Decrypted Password:', decrypted); // 復号化されたパスワード

  return decrypted;
}

/*
// 使用例
const keyString = "abc"; // 復号化に使用するキー
decryptPassword(keyString);
*/

export { encryptPassword, decryptPassword };