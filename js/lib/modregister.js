define([], function() {
    return {
        init: function() {
            var username = document.querySelector('#fm-reg-name')
            var password = document.querySelector('#fm-reg-password')
            var btn = document.querySelector('.fm-button')
            var user = document.querySelector('.fm-label-icon')
            var pwd = document.querySelector('.fm-pass')
            var uPattern = /^[a-zA-Z0-9_-]{4,16}$/; //用户名正则，4到16位（字母，数字，下划线，减号）
            var pswd = /^[a-zA-Z]\w{5,17}$/; //匹配 以字母开头，长度在6~18之间，只能包含字符、数字和下划线
            username.onblur = function() {
                if (uPattern.test(username.value)) {
                    user.style.background = 'red'
                    btn.onclick = function() {
                        $.ajax({
                            type: 'post',
                            data: {
                                username: username.value, //将表单的值传给后端。
                                password: password.value
                            },
                            url: 'http://localhost/wampROOM1/twoproject2copy/php/register.php',
                            success: function(data) {
                                // data返回1：存在  否则返回空，不存在
                                if (data) { //可以注册
                                    alert('该用户名已经被注册')
                                } else { //用户名重名。
                                    alert('注册成功,点击确定跳转页面')
                                    location.href = "http://localhost/wampROOM1/twoproject2copy/html/login.html"; //首页
                                }
                            }

                        })
                    };
                } else {
                    user.style.background = ''
                }
            }
            password.onblur = function() {
                if (pswd.test(password.value)) {
                    pwd.style.background = 'red'
                } else {
                    pwd.style.background = ''
                }
            }
        }
    }
});