/**
 * Created by Mutallip on 2019/4/21.
 */

/// <reference path="../jquery-1.4.1-vsdoc.js" />
define(function (require) {
    require('jquery');
    require('jsencrypt');
    //require("../jquery/jquery-ui/1.11.2/jquery-ui.js");

    var yiban = require('yiban'), Popup = require('popup');

    var msg = {
        accountEmpty: '请输入帐号和密码',
        schoolEmpty: '请选择学校',
        logining: '正在登录..',
        jumpTxt: '正在跳转..'
    }

    //公共选择器
    var selector = {
        cla: {
            error: 'js-error',
            claError: 'error'
            , txt: 'txt'
            , schoolSelectLi: 'li'
        },
        id: {
            jumpOldBtn: 'jump-old-btn'
            , jumpNewBtn: 'jump-new-btn'
            , loginPr: 'login-pr' //登录切换窗体
            , loginBox: 'login-box'
            , loginOldBox: 'login-old-box'

            , loginBtn: 'login-btn'
            , accountTxt: 'account-txt'
            , passwordTxt: 'password-txt'
            , rememberChb: 'remember-chb'
            , oldLoginBtn: 'old-login-btn'
            , oldAccountTxt: 'old-account-txt'
            , oldPasswordTxt: 'old-password-txt'

            , completeCont: 'complete-cont'
            , schoolSelect: 'school-select'
            , schoolTxt: 'school-select-txt'
            , schoolLoginBtn: 'school-login-btn'

            , cardLogin: 'card-login'
            , cardLoginCont: 'card-login-cont'
            , closeBtn: 'close-btn'
            , cardLoginZz: 'card-zz'
            , schoolShowBtn: 'school-show-btn'
        }
    };

    function get$Id(id) {
        return $('#' + selector.id[id]);
    }

    //公共选择器
    var $loginPr = get$Id('loginPr'),
        $loginBox = get$Id('loginBox'),
        $loginOldBox = get$Id('loginOldBox');

    var g_param = {
        isCaptcha: false,
        keys: $('#login-pr').data('keys'),
        keysTime: $('#login-pr').data('keys-time')
    }

    //登录模块
    function login() {
        var $jumpOldBtn = get$Id('jumpOldBtn'),
            $loginBtn = get$Id('loginBtn'),
            $weekPsdTips = $loginBox.find('.weakpsd-tips'),
            $loginBtnWeakpsd = $loginBox.find('.login-btn-weakpsd'),
            $accountTxt = get$Id('accountTxt'),
            $passwordTxt = get$Id('passwordTxt'),
            $rememberChb = get$Id('rememberChb'),
            $schoolShowBtn = get$Id('schoolShowBtn'),
            $error = $loginBox.find("." + selector.cla.error);

        var data = {
            account: ''
            , password: ''
        };

        //事件绑定
        function bind() {
            $jumpOldBtn.on('click', jumpOld);
            $loginBtn.on('click', function (event) {
                event.preventDefault();
                logining();
            });

            $accountTxt.on('keypress', function (event) {
                if (event.keyCode == "13") {
                    logining();
                }
            });
            $passwordTxt.on('keypress', function (event) {
                if (event.keyCode == "13") {
                    logining();
                }
            });
            $rememberChb.on('keypress', function (event) {
                if (event.keyCode == "13") {
                    logining();
                }
            });
            $(document).on('click', '.change-captcha', function () {
                $('.captcha').attr('src', '/captcha/index?' + new Date());
                $('#login-captcha').val('');
                return false;
            });
        };

        //跳转到旧登录
        function jumpOld() {
            $loginBox.stop(true, false).css({opacity: 1}).animate({opacity: 0}, 250);
            $loginOldBox.stop(true, false).show().css({opacity: 0}).animate({opacity: 1}, 500);
            $loginPr.stop(true, false).animate({left: "-100%"}, 250);
        }

        //登录
        function logining() {
            data.account = $.trim($accountTxt.val());
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(g_param.keys);
            data.password = $.trim($passwordTxt.val());
            data.captcha = $.trim($('#login-captcha').val());
            data.keysTime = g_param.keysTime;
            // 自动登录
            if ($('#remember-chb').prop('checked')) data.is_rember = 1;
            var self = this;
            var iscaptcha = $('.login-captcha').data('iscaptcha');
            if (iscaptcha == 1 && data.captcha == '') {
                yiban.ui.alert('请输入图形验证码');
            } else {
                if (validation(data)) {
                    // 通过校验后再加密密码
                    data.password = encrypt.encrypt($.trim($passwordTxt.val()));
                    if (!$loginBtn.data("txt")) {
                        $loginBtn.data("txt", $loginBtn.html());
                    }
                    $loginBtn.html(msg.logining);
                    yiban.postData(yiban.url.user.login, data, function (resp) {
                        rememberAccount(data.account);
                        // 校验密码强度
                        if (!yiban.regExp.password.test($.trim($passwordTxt.val()))) {	// 弱密码提示修改
                            $weekPsdTips.show().siblings('.login-btn-box').hide();
                            // 原密码登录
                            $loginBtnWeakpsd.off().on('click', function () {
                                goUrl($loginBtn.attr('href'), resp.data);
                                return false;
                            });
                        } else { // 正常登录
                            goUrl($loginBtn.attr('href'), resp.data);
                        }
                    }, function (resp) {
                        $loginBtn.html($loginBtn.data("txt"));
                        errorShow(resp.message);
                        $('.captcha').attr('src', '/captcha/index?' + new Date());
                        $('#login-captcha').val('');
                        if (resp.code == 711) {
                            $('.login-captcha').show().data('iscaptcha', 1);
                        }
                    }, true);
                }
                ;
            }
        }

        //验证数据
        function validation() {
            var errorStr = '', isValid = true;

            if (yiban.util.empty(data.account)) {
                $accountTxt.addClass(selector.cla.claError);
                errorStr = errorStr ? errorStr : msg.accountEmpty;
                isValid = false && isValid;
            } else {
                $accountTxt.removeClass(selector.cla.claError);
            }
            ;

            if (yiban.util.empty(data.password)) {
                $passwordTxt.addClass(selector.cla.claError);
                errorStr = errorStr ? errorStr : msg.accountEmpty;
                isValid = false && isValid;
            } else {
                $passwordTxt.removeClass(selector.cla.claError);
            }
            ;

            errorShow(errorStr);
            return isValid;
        };

        function errorShow(str) {
            $error.html(str);
        };

        //记录用户名
        function rememberAccount(val) {
            if (val) {
                if ($rememberChb.is(':checked')) {
                    yiban.util.cookie.set("accountName", val);
                } else {
                    yiban.util.cookie.del("accountName");
                }
            } else {
                var val = yiban.util.cookie.get("accountName");
                if (val) {
                    $accountTxt.val(val);
                    $rememberChb.attr('checked', 'checked');
                }
                ;
            }
            ;
        };

        this.init = function () {
            bind();
            rememberAccount();
        };
    }

    //旧登录模块
    function loginOld() {
        var $jumpNewBtn = get$Id('jumpNewBtn'),
            $loginBtn = get$Id('oldLoginBtn'),
            $weekPsdTips = $loginOldBox.find('.weakpsd-tips'),
            $loginBtnWeakpsd = $loginOldBox.find('.login-btn-weakpsd'),
            $accountTxt = get$Id('oldAccountTxt'),
            $passwordTxt = get$Id('oldPasswordTxt'),
            $error = $loginOldBox.find("." + selector.cla.error);


        var validation;
        //事件绑定
        function bind() {
            $jumpNewBtn.on('click', jumpNew);

            $loginBtn.on('click', function (event) {
                event.preventDefault();
                logining();
            });

            $accountTxt.on('keypress', function (event) {
                if (event.keyCode == "13") {
                    logining();
                }
            });
            $passwordTxt.on('keypress', function (event) {
                if (event.keyCode == "13") {
                    logining();
                }
            });
        };

        //跳转到新登录
        function jumpNew() {
            $loginBox.stop(true, false).css({opacity: 0}).animate({opacity: 1}, 500);
            $loginOldBox.stop(true, false).css({opacity: 1}).animate({opacity: 0}, 250, function () {
                $loginOldBox.hide();
            });
            $loginPr.stop(true, false).animate({left: "0%"}, 250);
        };

        var data = {
            account: ''
            , password: ''
        };

        //验证数据
        function validation() {
            var errorStr = '', isValid = true;

            if (yiban.util.empty(data.account)) {
                $accountTxt.addClass(selector.cla.claError);
                errorStr = errorStr ? errorStr : msg.accountEmpty;
                isValid = false && isValid;
            } else {
                $accountTxt.removeClass(selector.cla.claError);
            }
            ;

            if (yiban.util.empty(data.password)) {
                $passwordTxt.addClass(selector.cla.claError);
                errorStr = errorStr ? errorStr : msg.accountEmpty;
                isValid = false && isValid;
            } else {
                $passwordTxt.removeClass(selector.cla.claError);
            }
            ;

            errorShow(errorStr);
            return isValid;
        };


        function errorShow(str) {
            $error.html(str);
        };

        //登录
        function logining() {
            data.account = $.trim($accountTxt.val());
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(g_param.keys);
            data.password = encrypt.encrypt($.trim($passwordTxt.val()));
            data.keysTime = g_param.keysTime;
            var self = this;
            if (validation(data)) {
                if (!$loginBtn.data("txt")) {
                    $loginBtn.data("txt", $loginBtn.html());
                }
                $loginBtn.html(msg.logining);
                yiban.postData(yiban.url.user.login, data, function (resp) {

                    function goUrlFun() {
                        if (resp.data.tip) {
                            yiban.ui.alert(resp.data.tip);
                            setTimeout(function () {
                                goUrl($loginBtn.attr('href'), resp.data);
                            }, 2000);
                        } else {
                            goUrl($loginBtn.attr('href'), resp.data);
                        }
                    };

                    if (!yiban.regExp.password.test($.trim($passwordTxt.val()))) {	// 弱密码提示修改
                        $weekPsdTips.show().siblings('.login-btn-box').hide();
                        // 原密码登录
                        $loginBtnWeakpsd.off().on('click', function () {
                            goUrlFun();
                            return false;
                        });
                    } else { // 正常登录
                        goUrlFun();
                    }

                }, function (resp) {
                    $loginBtn.html($loginBtn.data("txt"));
                    errorShow(resp.message);
                }, true);
            }
            ;

        }

        this.init = function () {
            bind();
        };
    };
    /**
     * 判断是否是首页url
     *
     * @param url
     * @returns {boolean}
     */
    function isWebIndex(url) {
        var host = window.location.host;
        var addr_https = "https://" + host + "/";
        var addr_http = "http://" + host + "/";

        if (url == addr_http || url == addr_https)
            return true;
        else
            return false;
    }

    /**
     * 登陆之后跳转
     *
     * @param url
     * @param loginInfo
     */
    function goUrl(url, loginInfo) {
        var goUrl = yiban.getPar("go");

        if (goUrl) {
            goUrl = decodeURIComponent(goUrl);
            if (loginInfo && (loginInfo.use_url == 1) && isWebIndex(goUrl)) {
                window.location.href = loginInfo.url;
            } else {
                window.location.href = goUrl;
            }
        } else {
            window.location.href = url;
        }
    }

    //登录学校
    function loginSchool() {
        var $txtId = get$Id('schoolTxt'),
            $cardLogin = get$Id('cardLogin'),
            $cardLoginCont = get$Id('cardLoginCont'),
            $closeBtn = get$Id('closeBtn'),
            $schoolShowBtn = get$Id('schoolShowBtn'),
            $cardLoginZz = $cardLogin.find("#" + selector.id.cardLoginZz),
            $error = $cardLogin.find("." + selector.cla.error),
            $login = get$Id('schoolLoginBtn');
        schoolSelect();
        var data = {schoolid: ''};

        $txtId.on('keypress', function (event) {
            if (event.keyCode == "13") {
                $login.trigger('click');
            }
        });

        function bind() {
            $login.on('click', login);
            $closeBtn.on('click', hideBox);
            $cardLoginZz.on('click', hideBox);
            $schoolShowBtn.on('click', function () {
                showBox();
            });
        };

        function hideBox() {
            $cardLogin.fadeOut(300);
        }

        function showBox() {
            $cardLogin.fadeIn(300);

            var he = $cardLoginCont.height();
            $cardLoginCont.height(0);
            $cardLoginCont.css("marginTop", 0);
            $cardLoginCont.animate({height: he, marginTop: -he / 2}, 300);

        }

        function login(event) {
            event.preventDefault()
            data.schoolid = $.trim($txtId.data("schoolid"));
            if (validation()) {
                //window.location.href = ($login.attr("href") + '?' + $login.data("pname") + '=' + data.schoolid);
                $(this).text(msg.jumpTxt);
                window.location.href = $login.attr("href");
            }
            return false;
        }

        //验证数据
        function validation() {
            var errorStr = '', isValid = true;

            if (yiban.util.empty(data.schoolid)) {
                $txtId.addClass(selector.cla.claError);
                errorStr = errorStr ? errorStr : msg.schoolEmpty;
                isValid = false && isValid;
            } else {
                $txtId.removeClass(selector.cla.claError);
            }
            ;

            errorShow(errorStr);
            return isValid;
        };

        function errorShow(str) {
            $error.html(str);
        };

        this.init = function () {
            bind();
        };

        //绑定搜索
        function schoolSelect() {
            var $txtId = get$Id('schoolTxt'),
                $selectId = get$Id('schoolSelect'),
                $schoolSelectLi = $selectId.find(selector.cla.schoolSelectLi);

            $txtId.on('click', function () {
                $selectId.stop(true, false).fadeIn();
            });

            $schoolSelectLi.on('click', function () {
                $txtId.data("schoolid", $(this).data("schoolid"));
                $login.attr("href", $(this).data("url"));
                errorShow("");
                $txtId.val($.trim($(this).text()));
                $txtId.trigger('focus');

            });

            $txtId.on('blur', function () {
                $selectId.stop(true, false).fadeOut();
            });
        }

    }


    function init(str) {

        if (str == 'login') {
            //登录调用
            var lgn = new login();
            lgn.init();

            //老登录调用
            var lgnOld = new loginOld();
            lgnOld.init();

            //学校登录
            var lgnSchool = new loginSchool();
            lgnSchool.init();
        } else {
            //学校登录
            var lgnSchool = new loginSchool();
            lgnSchool.init();
        }

    };

    return init;
});