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

// 读取环境变量文件
function readEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error('找不到 .env.local 文件，请先运行注册程序创建管理员账户。');
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });
  
  return envVars;
}

// 主程序
async function resetPassword() {
  console.log('=== 管理员密码重置程序 ===\n');

  try {
    // 读取当前环境变量
    const envVars = readEnvFile();
    
    // 验证当前用户名和密码
    const currentUsername = await new Promise(resolve => {
      rl.question('请输入当前用户名: ', resolve);
    });

    const currentPassword = await new Promise(resolve => {
      rl.question('请输入当前密码: ', resolve);
    });

    const currentUsernameHash = hashPassword(currentUsername);
    const currentPasswordHash = hashPassword(currentPassword);

    if (currentUsernameHash !== envVars.NEXT_PUBLIC_ADMIN_USERNAME_HASH ||
        currentPasswordHash !== envVars.NEXT_PUBLIC_ADMIN_PASSWORD_HASH) {
      console.log('\n错误：当前用户名或密码不正确');
      rl.close();
      return;
    }

    console.log('\n验证成功！请设置新密码。\n');

    // 获取新密码
    const newPassword = await new Promise(resolve => {
      const askPassword = () => {
        rl.question('请输入新密码: ', input => {
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

    // 确认新密码
    const confirmedPassword = await new Promise(resolve => {
      const askConfirmPassword = () => {
        rl.question('请确认新密码: ', input => {
          if (input === newPassword) {
            resolve(input);
          } else {
            console.log('\n两次输入的密码不匹配，请重新确认\n');
            askConfirmPassword();
          }
        });
      };
      askConfirmPassword();
    });

    // 生成新的密码哈希
    const newPasswordHash = hashPassword(newPassword);

    // 更新环境变量文件
    const envContent = `NEXT_PUBLIC_ADMIN_USERNAME_HASH=${envVars.NEXT_PUBLIC_ADMIN_USERNAME_HASH}
NEXT_PUBLIC_ADMIN_PASSWORD_HASH=${newPasswordHash}
DEBUG_MODE=${envVars.DEBUG_MODE || 'false'}`;

    const envPath = path.join(process.cwd(), '.env.local');
    fs.writeFileSync(envPath, envContent);

    console.log('\n=== 密码重置成功 ===');
    console.log('新密码已保存到 .env.local 文件');
    console.log('\n请妥善保管以下信息：');
    console.log('用户名:', currentUsername);
    console.log('新密码:', newPassword);
    console.log('\n请记住这些凭据，它们不会再次显示。');

  } catch (error) {
    console.error('\n错误:', error.message);
  } finally {
    rl.close();
  }
}

// 运行程序
resetPassword().catch(console.error); 