const CryptoJS = require('crypto-js');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// 创建命令行交互界面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 密码哈希函数
function hashPassword(text) {
  const normalizedText = text.toLowerCase().trim();
  const wordArray = CryptoJS.enc.Utf8.parse(normalizedText);
  return CryptoJS.SHA256(wordArray).toString();
}

// 验证密码强度
function isStrongPassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isLongEnough = password.length >= minLength;
  
  const problems = [];
  if (!isLongEnough) problems.push('密码长度至少需要8个字符');
  if (!hasUpperCase) problems.push('需要包含大写字母');
  if (!hasLowerCase) problems.push('需要包含小写字母');
  if (!hasNumbers) problems.push('需要包含数字');
  if (!hasSpecialChar) problems.push('需要包含特殊字符');

  return {
    isStrong: isLongEnough && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    problems
  };
}

// 安全问题列表
const securityQuestions = [
  '您的出生地是哪里？',
  '您最喜欢的颜色是什么？',
  '您的第一个宠物叫什么名字？'
];

// 主程序
async function registerAdmin() {
  console.log('=== 管理员账户注册程序 ===\n');

  // 获取用户名
  const username = await new Promise(resolve => {
    const askUsername = () => {
      rl.question('请输入管理员用户名: ', input => {
        const validation = isValidUsername(input);
        if (validation.isValid) {
          resolve(input);
        } else {
          console.log('\n用户名不符合要求:');
          validation.problems.forEach(problem => console.log('- ' + problem));
          console.log('');
          askUsername();
        }
      });
    };
    askUsername();
  });

  // 获取密码
  const password = await new Promise(resolve => {
    const askPassword = () => {
      rl.question('请输入管理员密码: ', input => {
        const validation = isStrongPassword(input);
        if (validation.isStrong) {
          resolve(input);
        } else {
          console.log('\n密码不符合要求:');
          validation.problems.forEach(problem => console.log('- ' + problem));
          console.log('');
          askPassword();
        }
      });
    };
    askPassword();
  });

  // 确认密码
  const confirmedPassword = await new Promise(resolve => {
    const askConfirmPassword = () => {
      rl.question('请确认密码: ', input => {
        if (input === password) {
          resolve(input);
        } else {
          console.log('\n两次输入的密码不匹配，请重新确认\n');
          askConfirmPassword();
        }
      });
    };
    askConfirmPassword();
  });

  console.log('\n请回答以下安全问题（用于密码恢复）：\n');

  // 获取安全问题答案
  const answer1 = await new Promise(resolve => {
    rl.question(securityQuestions[0] + ' ', resolve);
  });

  const answer2 = await new Promise(resolve => {
    rl.question(securityQuestions[1] + ' ', resolve);
  });

  const answer3 = await new Promise(resolve => {
    rl.question(securityQuestions[2] + ' ', resolve);
  });

  // 生成哈希值
  const usernameHash = hashPassword(username);
  const passwordHash = hashPassword(password);
  const answer1Hash = hashPassword(answer1);
  const answer2Hash = hashPassword(answer2);
  const answer3Hash = hashPassword(answer3);

  // 创建环境变量文件内容
  const envContent = `NEXT_PUBLIC_ADMIN_USERNAME_HASH=${usernameHash}
NEXT_PUBLIC_ADMIN_PASSWORD_HASH=${passwordHash}
SECURITY_QUESTION_1=${answer1Hash}
SECURITY_QUESTION_2=${answer2Hash}
SECURITY_QUESTION_3=${answer3Hash}
DEBUG_MODE=false`;

  // 保存到 .env.local 文件
  const envPath = path.join(process.cwd(), '.env.local');
  fs.writeFileSync(envPath, envContent);

  console.log('\n=== 注册成功 ===');
  console.log('管理员账户已创建并保存到 .env.local 文件');
  console.log('\n请妥善保管以下信息：');
  console.log('用户名:', username);
  console.log('密码:', password);
  console.log('\n安全问题答案：');
  console.log('1. 出生地:', answer1);
  console.log('2. 喜欢的颜色:', answer2);
  console.log('3. 第一个宠物名字:', answer3);
  console.log('\n请记住这些凭据，它们不会再次显示。');
  
  rl.close();
}

// 验证用户名
function isValidUsername(username) {
  const minLength = 4;
  const hasValidChars = /^[a-zA-Z0-9_]+$/.test(username);
  const isLongEnough = username.length >= minLength;

  const problems = [];
  if (!isLongEnough) problems.push('用户名长度至少需要4个字符');
  if (!hasValidChars) problems.push('用户名只能包含字母、数字和下划线');

  return {
    isValid: isLongEnough && hasValidChars,
    problems
  };
}

// 运行程序
registerAdmin().catch(console.error); 