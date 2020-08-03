define([], function() {
    return {
        init: function() {

            var username = document.querySelector('#fm-login-id')
            var password = document.querySelector('#fm-login-password')
            var btn = document.querySelector('.fm-button')
            btn.onclick = function() {
                $.ajax({
                    type: 'post',
                    data: {
                        username: username.value, //将表单的值传给后端。
                        password: password.value
                    },
                    url: 'http://localhost/wampROOM1/twoproject2copy/php/login.php',
                    success: function(data) {
                        // data返回1：存在  否则返回空，不存在
                        if (data) { //可以注册
                            alert('登录成功,点击确定跳转首页')
                            set('username', username.value, 7); //存储用户名
                            location.href = "http://localhost/wampROOM1/twoproject2copy/html/index.html"; //首页
                        } else { //用户名重名。
                            password.value = '';
                            alert('账号或密码错误')
                                // location.href = "http://localhost/wampROOM1/twoproject2/html/login.html"; //首页
                        }
                    }

                })

            };
        }
    }
});