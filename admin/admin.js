document.addEventListener('DOMContentLoaded', function() {
    // 初始化Bootstrap模态框
    const resetPasswordModal = new bootstrap.Modal(document.getElementById('resetPasswordModal'));
    
    // 默认管理员账户（实际应用中应该存储在后端）
    const defaultAdmin = {
        username: 'admin',
        password: 'admin123',
        securityQuestion: '1',
        securityAnswer: 'test'
    };

    // 登录表单提交
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === defaultAdmin.username && password === defaultAdmin.password) {
            alert('登录成功！');
            window.location.href = 'dashboard.html';
        } else {
            alert('用户名或密码错误！');
        }
    });

    // 忘记密码链接点击
    document.getElementById('forgotPassword').addEventListener('click', function(e) {
        e.preventDefault();
        resetPasswordModal.show();
    });

    // 重置密码按钮点击
    document.getElementById('resetPasswordBtn').addEventListener('click', function() {
        const selectedQuestion = document.getElementById('securityQuestion').value;
        const answer = document.getElementById('securityAnswer').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // 验证新密码
        if (newPassword !== confirmPassword) {
            alert('两次输入的密码不一致！');
            return;
        }

        // 验证安全问题
        if (selectedQuestion === defaultAdmin.securityQuestion && 
            answer.toLowerCase() === defaultAdmin.securityAnswer.toLowerCase()) {
            // 实际应用中这里应该调用API来更新密码
            defaultAdmin.password = newPassword;
            alert('密码重置成功！请使用新密码登录。');
            resetPasswordModal.hide();
        } else {
            alert('安全问题答案错误！');
        }
    });

    // 密码强度验证
    document.getElementById('newPassword').addEventListener('input', function(e) {
        const password = e.target.value;
        if (password.length < 8) {
            e.target.setCustomValidity('密码长度至少为8个字符');
        } else if (!/[A-Z]/.test(password)) {
            e.target.setCustomValidity('密码必须包含至少一个大写字母');
        } else if (!/[a-z]/.test(password)) {
            e.target.setCustomValidity('密码必须包含至少一个小写字母');
        } else if (!/[0-9]/.test(password)) {
            e.target.setCustomValidity('密码必须包含至少一个数字');
        } else {
            e.target.setCustomValidity('');
        }
    });
});
