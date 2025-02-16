const CryptoJS = require('crypto-js');

function hashPassword(text) {
  // 1. 将输入转换为小写并移除首尾空格
  const normalizedText = text.toLowerCase().trim();
  
  // 2. 将字符串转换为 UTF-8 编码的字节数组
  const wordArray = CryptoJS.enc.Utf8.parse(normalizedText);
  
  // 3. 计算 SHA-256 哈希
  const hash = CryptoJS.SHA256(wordArray);
  
  // 4. 返回十六进制格式的哈希值
  return hash.toString();
}

// 使用示例值进行测试
const username = 'admin';
const password = 'password123';

console.log('Username:', username);
console.log('Username Hash:', hashPassword(username));
console.log('\nPassword:', password);
console.log('Password Hash:', hashPassword(password)); 