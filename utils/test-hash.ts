import { hashPassword } from './crypto';

// 测试用户名和密码（仅用于示例）
const username = 'admin';
const password = 'password123';

// 生成哈希值
const usernameHash = hashPassword(username);
const passwordHash = hashPassword(password);

console.log('Username:', username);
console.log('Username Hash:', usernameHash);
console.log('Password:', password);
console.log('Password Hash:', passwordHash); 