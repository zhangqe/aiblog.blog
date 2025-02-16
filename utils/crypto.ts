import CryptoJS from 'crypto-js';

// 加密密钥
const SECRET_KEY = 'your-secret-key-2024';

// 加密函数
export const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

// 解密函数
export const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// 生成密码哈希
export const hashPassword = (text: string): string => {
  // 1. 将输入转换为小写并移除首尾空格
  const normalizedText = text.toLowerCase().trim();
  
  // 2. 将字符串转换为 UTF-8 编码的字节数组
  const wordArray = CryptoJS.enc.Utf8.parse(normalizedText);
  
  // 3. 计算 SHA-256 哈希
  const hash = CryptoJS.SHA256(wordArray);
  
  // 4. 返回十六进制格式的哈希值
  return hash.toString();
};

// 验证密码
export const verifyPassword = (password: string, hash: string): boolean => {
  const passwordHash = hashPassword(password);
  return passwordHash === hash;
}; 