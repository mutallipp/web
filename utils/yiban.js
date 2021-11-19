/**
 * Created by Mutallip on 2019/4/21.
 */
/**
 * YiBan's main js v0.2.3
 *
 * @author YiBan team
 * @since 2014.06.20
 * @updated 2015.06.29
 */
var baseUri = window.baseUri || '/'; // 站点更目录
var t = 5;
var interval;
function changeNum (){
    $('#close-num').html(--t);
    if (!t) {
        window.clearInterval(interval);
        t = 5;
        $('#mask').hide();
        window.location.href = 'http://www.yiban.cn/mobile/mobile.html';
    }
}
define(function (require, exports, module) {
    'use strict';

    require('./vendor/ie.js');

    var $ = require('jquery'),
        Overlay = require('arale-overlay'),
        KickIE = require('./vendor/kick-ie.js'),
        document = window.document,
        $D = $(document),
        $W = $(window),
        yiban = {
            debug: false,
            isIE: KickIE.isIE,
            IE: KickIE.IE, // IE.ver, IE.lte9, IE.lte8, IE.lte7
            regExp: {
                email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
                mobile: /^1[0-9]{10}$/,
                vcode: /^[0-9]{4}$/,
                nick: /^[a-zA-Z_\u4E00-\u9FA5\uF900-\uFA2D]+$/, // 2014.07.30
                nick1: /^[0-9a-zA-Z_\u4E00-\u9FA5\uF900-\uFA2D]{2,40}$/, // 2017.10.11 昵称长度从4-20改为2-40
                nick2: /^[0-9_a-zA-Z\u4E00-\u9FA5]+$/, // 2014.07.31 (AM)
                nick3: /^[^\s]+$/, // 2014.07.31 (PM)
                doubleByte: /[\x00-\xff]/g,
                img: /<img.*?\/?>/gi,
                //password: /^([\u4E00-\u9FA5\uF900-\uFA2D])(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/ // 密码6-16位，至少包含数字、字母（区分大小写）、符号中的2种，且不能有空格
                password: /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[!;_\{\}<>\.@#\$%\^&\*\(\)\[\]\\?\\\/\|\-~`\+\=\,\r\n\:\'\"])|(?=.*?[A-Za-z])(?=.*?[!;_\{\}<>\.@#\$%\^&\*\(\)\[\]\\?\\\/\|\-~`\+\=\,\r\n\:\'\"]))[\dA-Za-z!;_\{\}<>\.@#\$%\^&\*\(\)\[\]\\?\\\/\|\-~`\+\=\,\r\n\:\'\"]+$/ // 密码6-16位，至少包含数字、字母（区分大小写）、符号中的2种，且不能有空格
            },
            range: {
                nick: {
                    min: 2,
                    max: 40
                },
                password: {
                    min: 6,
                    max: 16
                },
                signature: {
                    min: 0,
                    max: 80
                },
                year: {
                    min: 1960,
                    max: +(new Date().getFullYear())
                },
                feed: {
                    preview: 200,
                    commentPreview: 200
                }
            },
            noop: function () { },
            $mask: Overlay.Mask,
            $popup: null,
            $body: $('body'),
            $header: $('.yiban-header'),
            $content: $('.yiban-content'),
            $footer: $('.yiban-footer'),
            $mainMenu: $('#main-menu'),
            className: {
                active: 'active',
                show: 'collapsed',
                lock: 'locked'
            },
            async: false,
            loading: false,
            isSchoolVerify: (typeof g_config !== 'undefined' && typeof g_config.isSchoolVerify !== 'undefined') ? +g_config.isSchoolVerify : false, // 是否通过校方认证
            isNewbie: false,
            isGuide: false,
            isNewbieDoing: false, // 2015.06.26
            isMobile: false, // 2014.12.05 for factory mobile
            isLogin: (typeof g_config !== 'undefined' && typeof g_config.isLogin !== 'undefined') ? +g_config.isLogin : false, // 2015.01.20 是否已登录
            isCachePage: (typeof window.isCachePage !== 'undefined' && window.isCachePage === true) ? true : false, // 2015.02.02 是否缓存页
            publish: {
                $panel: null,
                success: {}
            }
        };

    yiban.url = require('./config/url.js?nowrap');
    yiban.msg = require('./config/message');

    /**
     * jquery.wresize.js
     */
    $.fn.wresize = function (f) {
        var version = '1.1',
            wresize = {
                fired: false,
                width: 0
            },
            ie = yiban.IE.ver;

        function resizeOnce() {
            if (ie > -1) {
                if (!wresize.fired) {
                    wresize.fired = true;
                } else {
                    var version = ie;
                    wresize.fired = false;
                    if (version < 7) {
                        return false;
                    } else if (version == 7) {
                        // a vertical resize is fired once, an horizontal resize twice
                        var width = $(window).width();
                        if (width != wresize.width) {
                            wresize.width = width;
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        function handleWResize(e) {
            if (resizeOnce()) {
                return f.apply(this, [e]);
            }
        }
        this.each(function () {
            if (this == window) {
                $(this).resize(handleWResize);
            } else {
                $(this).resize(f);
            }
        });
        return this;
    };

    /**
     * jQuery.mouseDelay.js v1.2
     * http://www.planeart.cn/?p=1073
     * Copyright 2011, TangBin
     * Dual licensed under the MIT or GPL Version 2 licenses.
     */
    (function ($, plugin) {
        var data = {},
            id = 1,
            etid = plugin + 'ETID';
        // 延时构造器
        $.fn[plugin] = function (speed, group) {
            id++;
            group = group || this.data(etid) || id;
            speed = speed || 150;
            // 缓存分组名称到元素
            if (group === id) this.data(etid, group);
            // 暂存官方的hover方法
            this._hover = this.hover;
            // 伪装一个hover函数，并截获两个回调函数交给真正的hover函数处理
            this.hover = function (over, out) {
                over = over || $.noop;
                out = out || $.noop;
                this._hover(function (event) {
                    var elem = this;
                    clearTimeout(data[group]);
                    data[group] = setTimeout(function () {
                        over.call(elem, event);
                    }, speed);
                }, function (event) {
                    var elem = this;
                    clearTimeout(data[group]);
                    data[group] = setTimeout(function () {
                        out.call(elem, event);
                    }, speed);
                });

                return this;
            };

            return this;
        };
        // 冻结选定元素的延时器
        $.fn[plugin + 'Pause'] = function () {
            clearTimeout(this.data(etid));
            return this;
        };
        // 静态方法
        $[plugin] = {
            // 获取一个唯一分组名称
            get: function () {
                return id++;
            },
            // 冻结指定分组的延时器
            pause: function (group) {
                clearTimeout(data[group]);
            }
        };
    })($, 'mouseDelay');

    /**
     * 通用方法
     */
    (function (yiban) {

        yiban.util = {};

        yiban.util.needLogin = function (resp) {
            var redirect = resp && resp.data && resp.data.url ? resp.data.url : yiban.url.login;
            location.href = redirect;
        };

        yiban.util.toInt = function (string, number) {
            number = number || 0;
            return string ? parseInt(string, 10) + number : 0;
        };

        yiban.util.getPX = function (unit) {
            return yiban.util.toInt(unit.substr(0, unit.length - 2));
        };

        yiban.util.in_array = function (needle, haystack, argStrict) {
            //  discuss at: http://phpjs.org/functions/in_array/
            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: vlado houba
            // improved by: Jonas Sciangula Street (Joni2Back)
            //    input by: Billy
            // bugfixed by: Brett Zamir (http://brett-zamir.me)
            //   example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
            //   returns 1: true
            //   example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
            //   returns 2: false
            //   example 3: in_array(1, ['1', '2', '3']);
            //   example 3: in_array(1, ['1', '2', '3'], false);
            //   returns 3: true
            //   returns 3: true
            //   example 4: in_array(1, ['1', '2', '3'], true);
            //   returns 4: false
            var key = '',
                strict = !!argStrict;
            //we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
            //in just one for, in order to improve the performance
            //deciding wich type of comparation will do before walk array
            if (strict) {
                for (key in haystack) {
                    if (haystack[key] === needle) {
                        return true;
                    }
                }
            } else {
                for (key in haystack) {
                    if (haystack[key] == needle) {
                        return true;
                    }
                }
            }
            return false;
        };

        yiban.util.shuffle = function (inputArr) {
            //  discuss at: http://phpjs.org/functions/shuffle/
            // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            //  revised by: Brett Zamir (http://brett-zamir.me)
            // improved by: Brett Zamir (http://brett-zamir.me)
            //        note: This function deviates from PHP in returning a copy of the array instead
            //        note: of acting by reference and returning true; this was necessary because
            //        note: IE does not allow deleting and re-adding of properties without caching
            //        note: of property position; you can set the ini of "phpjs.strictForIn" to true to
            //        note: get the PHP behavior, but use this only if you are in an environment
            //        note: such as Firefox extensions where for-in iteration order is fixed and true
            //        note: property deletion is supported. Note that we intend to implement the PHP
            //        note: behavior by default if IE ever does allow it; only gives shallow copy since
            //        note: is by reference in PHP anyways
            //        test: skip
            //   example 1: ini_set('phpjs.strictForIn', true);
            //   example 1: shuffle(data);
            //   example 1: $result = data;
            //   returns 1: {5:'a', 4:5, 'q':5, 3:'c', 2:'3'}
            //   example 2: var data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5};
            //   example 2: ini_set('phpjs.strictForIn', true);
            //   example 2: var data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5};
            //   example 2: shuffle(data);
            //   example 2: $result = data;
            //   returns 2: {5:'a', 'q':5, 3:'c', 2:'3', 4:5}

            var valArr = [],
                k = '',
                i = 0,
                strictForIn = false,
                populateArr = [];

            for (k in inputArr) { // Get key and value arrays
                if (inputArr.hasOwnProperty(k)) {
                    valArr.push(inputArr[k]);
                    if (strictForIn) {
                        delete inputArr[k];
                    }
                }
            }
            valArr.sort(function () {
                return 0.5 - Math.random();
            });

            // BEGIN REDUNDANT
            this.php_js = this.php_js || {};
            this.php_js.ini = this.php_js.ini || {};
            // END REDUNDANT
            strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
                    .ini['phpjs.strictForIn'].local_value !== 'off';
            populateArr = strictForIn ? inputArr : populateArr;

            for (i = 0; i < valArr.length; i++) { // Repopulate the old array
                populateArr[i] = valArr[i];
            }

            return strictForIn || populateArr;
        };

        yiban.util.rand = function (min, max) {
            //  discuss at: http://phpjs.org/functions/mt_rand/
            // original by: Onno Marsman
            // improved by: Brett Zamir (http://brett-zamir.me)
            //    input by: Kongo
            //   example 1: mt_rand(1, 1);
            //   returns 1: 1
            var argc = arguments.length;
            if (argc === 0) {
                min = 0;
                max = 2147483647;
            } else if (argc === 1) {
                throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
            } else {
                min = parseInt(min, 10);
                max = parseInt(max, 10);
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        yiban.util.getLastId = function (arr, field) {
            field = field || '_id';
            return arr && arr.length ? arr.pop()[field] : 0; // 取返回json数据中的最后一条（底层接口的坑导致语义化混乱）
        };

        yiban.util.empty = function (value) {
            value = value.trim();
            if (value === '') {
                return true;
            }
            return false;
        };

        yiban.util.isEmpty = function ($dom, allowPlaceholder) {
            allowPlaceholder = allowPlaceholder || false;
            var value = $dom.val().trim(),
                isEmpty = false;
            if (value === '') {
                isEmpty = true;
            }
            if (!allowPlaceholder && value === $dom.attr('placeholder')) {
                isEmpty = true;
            }
            if (isEmpty) {
                yiban.ui.blink($dom);
            }
            return isEmpty;
        };

        yiban.util.anyEmpty = function ($dom, txtClass) {
            var isEmpty = false,
                $this, value, isHidden;
            txtClass = txtClass || '.txt';
            $dom.find(txtClass).each(function () {
                $this = $(this);
                isHidden = $this.is('hidden');
                if (isHidden) {
                    value = $this.val().trim();
                    if (value === '' || value === $this.attr('placeholder')) {
                        isEmpty = true;
                        yiban.ui.blink($this);
                    }
                }
            });
            return isEmpty;
        };

        yiban.util.strlen = function (str, to_word) {
            to_word = to_word || false;
            var count = 0,
                arr = str.split('');
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i].charCodeAt(0) < 299) {
                    count++;
                } else {
                    count += 2;
                }
            }
            return to_word ? Math.ceil(count / 2) : count;
        };

        yiban.util.mixlen = function (content, face_to_word) {
            face_to_word = face_to_word || 2; // 1种表情 = 2个字
            var imgCount = content.search(yiban.regExp.img) * face_to_word,
                textCount = yiban.util.strlen(content.replace(yiban.regExp.img, ''));
            return imgCount + textCount;
        };

        yiban.util.isValidRange = function (str, min, max, to_word) {
            to_word = to_word || false;
            var num = +yiban.util.strlen(str, to_word);
            if (yiban.debug) {
                yiban.log(str + ' : ' + num);
            }
            return (num >= min && num <= max) ? true : false;
        };

        yiban.util.isValid = function (type, value, hideAlert, fn) {
            hideAlert = hideAlert || false;
            var isValid = false,
                msg = yiban.msg.unknownError,
                rule = yiban.regExp,
                num;
            switch (type) {
                case 'mobile':
                    if (yiban.util.empty(value)) {
                        msg = yiban.msg.check.mobile.empty;
                    } else if (!rule.mobile.test(value)) {
                        msg = yiban.msg.check.mobile.format;
                    } else {
                        isValid = true;
                    }
                    break;
                case 'password':
                    if (yiban.util.empty(value)) {
                        msg = yiban.msg.check.password.format;
                    } else {
                        num = +yiban.util.strlen(value);
                        if (num > yiban.range.password.max) {
                            msg = yiban.msg.check.password.format;
                        } else if (!rule.password.test(value)) {
                            msg = yiban.msg.check.password.format;
                        } else {
                            isValid = true;
                        }
                    }
                    break;
                case 'email':
                    if (yiban.util.empty(value)) {
                        msg = yiban.msg.check.email.empty;
                    } else if (!rule.email.test(value)) {
                        msg = yiban.msg.check.email.format;
                    } else {
                        isValid = true;
                    }
                    break;
                case 'nick':
                    if (yiban.util.empty(value)) {
                        msg = yiban.msg.check.nick.empty;
                    } else if (!yiban.regExp.nick3.test(value)) {
                        msg = yiban.msg.check.nick.format;
                    } else {
                        num = +yiban.util.strlen(value);
                        if (num < yiban.range.nick.min) {
                            msg = yiban.msg.check.nick.min;
                        } else if (num > yiban.range.nick.max) {
                            msg = yiban.msg.check.nick.max;
                        } else {
                            isValid = true;
                        }
                    }
                    break;
                case 'year':
                    if (yiban.util.empty(value)) {
                        msg = yiban.msg.check.year.empty;
                    } else {
                        value = +value;
                        if (!(value >= yiban.range.year.min && value <= yiban.range.year.max)) {
                            msg = yiban.msg.check.year.format;
                        } else {
                            isValid = true;
                        }
                    }
                    break;
                case 'vcode':
                    if (yiban.util.empty(value)) {
                        msg = yiban.msg.check.vcode.empty;
                    } else {
                        isValid = true;
                    }
                    break;
            }
            if (!hideAlert && !isValid) {
                yiban.ui.alert(msg);
            }
            fn && fn(isValid, msg);
            return isValid;
        };

        yiban.util.trueOrFalse = function (value) {
            return !!value ? 'on' : 'off';
        };

        yiban.util.onForbid = function ($dom) {
            $dom = $dom || $('input[type="password"]');
            $dom.on('cut copy paste', function (e) {
                e.preventDefault(); //prevent the default behaviour
            });
        };

        yiban.util.autoClick = function ($input, $button, opts) { // 2015.06.26 opts = { parent, child }
            opts = opts || {};
            $input.keyup(function (e) {
                if (e.keyCode === 13) {
                    if ($button.length === 1) {
                        $button.trigger('click');
                    } else {
                        $(e.target).closest(opts.parent).find(opts.child).trigger('click');
                    }
                }
            });
        };

        yiban.util.disabled = function ($button) {
            $button.addClass('btn-gray').prop('disabled', true);
        };

        yiban.util.forbidTab = function () {
            $('.txt').on('keydown', function (e) {
                if (e.keyCode === 9) {
                    return false;
                }
            });
        };

        yiban.util.lockWindow = function (flag) {
            flag = flag || false;
            if (flag) {
                $('html').addClass(yiban.className.lock);
            } else {
                $('html').removeClass(yiban.className.lock);
            }
        };

        yiban.util.getConstellation = function (year) {
            var arr = year.split('-'),
                month = arr[1],
                day = arr[2];
            return yiban.msg.constellation.list.substr(month * 2 - (day < '102223444433'.charAt(month - 1) - -19) * 2, 2) + yiban.msg.constellation.unit;
        };

        yiban.util.cookie = {
            get: function (b) {
                var f = b + '=';
                var a = document.cookie.split(';');
                for (var d = 0; d < a.length; d++) {
                    var g = a[d];
                    while (g.charAt(0) == ' ') {
                        g = g.substring(1, g.length);
                    }
                    if (g.indexOf(f) === 0) {
                        return decodeURIComponent(g.substring(f.length, g.length));
                    }
                }
                return null;
            },
            set: function (d, g, j, h, f) {
                var a = '';
                if (j) {
                    var b = new Date();
                    b.setTime(b.getTime() + (j * 24 * 60 * 60 * 1000));
                    a = ';expires=' + b.toGMTString();
                }
                if (h === null) {
                    h = '/';
                }
                h = h ? ';path=' + h : '';
                f = (f === null) ? '' : ';domain=' + f;
                document.cookie = d + '=' + encodeURIComponent(g) + a + h + f;
            },
            del: function (a, d, b) {
                var f = new Date();
                f.setTime(f.getTime() - 99999);
                if (d === null) {
                    d = '/';
                }
                d = d ? ';path=' + d : '';
                b = (b === null) ? '' : ';domain=' + b;
                document.cookie = a + '=""; expires=' + f.toGMTString() + d + b;
            }
        };

        yiban.log = function (msg) {
            msg = msg || 'Hello YiBan';
            console.log(msg);
        };

        yiban.exit = function () {
            location.href = yiban.url.logout;
        };

        yiban.getPar = function (key) {
            var localUrl = document.location.href,
                get = localUrl.indexOf(key + '=');
            if (get === -1) {
                return false;
            }
            var value = localUrl.slice(key.length + get + 1),
                nextPar = value.indexOf('&');
            if (nextPar !== -1) {
                value = value.slice(0, nextPar);
            }
            return value;
        };

        yiban.postData = function (url, data, afterSuccess, afterFailure, then) {
            var t = this;
            if (yiban.async || !yiban.loading) {
                afterSuccess = afterSuccess || yiban.noop;
                afterFailure = afterFailure || yiban.noop;
                then = then || false;
                $.ajax({
                    url: baseUri + url,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    beforeSend: function (jqXHR, settings) {
                        if (then) {
                            yiban.loading = false;
                        } else {
                            yiban.loading = true;
                        }
                    },
                    success: function (response, textStatus, jqXHR) {
                        if (then) {
                            yiban.loading = false;
                        }
                        if (response.code === 200) {
                            yiban.ui._confirm.close();
                            t.forceCaptcha = undefined;
                            afterSuccess(response);
                        } else {
                            switch (response.code) {
                                /**
                                 * 轻应用防刷体系 输入验证码
                                 * code { 911 | '911' }
                                 */
                                case 911:
                                case '911':
                                    yiban.captcha(url,data, afterSuccess, afterFailure, then);
                                    break;
                                /**
                                 * 轻应用防刷体系 验证码错误
                                 * code { 941 | '941' }
                                 */
                                case 941:
                                case '941':
                                   yiban.captchaError();
                                    break;
                                case 110:
                                    yiban.util.needLogin(response);
                                    break;
                                case 101:
                                    location.href = 'https://www.yiban.cn/login';
                                    break;
                                case 100:
                                    location.href = response.data.url;
                                    break;
                                default:
                                    afterFailure(response);
                            }
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (yiban.debug) {
                            yiban.log(jqXHR);
                        }
                    },
                    complete: function (jqXHR, textStatus) {
                        yiban.loading = false;
                    }
                });
            }
        };

        yiban.captcha = function (url,data, afterSuccess, afterFailure, then) {
            var t = this;

            var src = '/captcha/index?' + new Date();
            var $changeId = '#pop_captcha_change';

            var _html = '<div class="y_app_captcha"><div class="y_captcha_title"><b>请输入验证码</b></div><div><div class="pop_captcha_content">'+
                '<img src="'+ src +'" id="pop_captcha_img"><a href="javascript:void(0);" id="pop_captcha_change">换一张</a></div><div class="pop_captcha_input">'+
                '<input type="text" class="text" id="pop_captcha_value" placeholder="请输入验证码"><em class="code_error"><a class="iconfont icon-error"></a>验证码错误</em></div></div></div>';

            if ($( $changeId ).length > 0){
                $( $changeId ).unbind('click');
            }
            $(document).on('click', $changeId ,function () {
                $('#pop_captcha_img').attr('src','/captcha/index?' + new Date());
            })

            yiban.ui.confirm( {content:_html,manualClose:true}  ,function (cla) {
                t.captchaPop = cla;
                data.captcha = $('#pop_captcha_value').val();
                t.autoCloseError();
                if ($.trim(data.captcha) === ''){
                    $('.code_error').css({'display':'inline-block'});
                    return false;
                }else{
                    $('.code_error').fadeOut();
                }
                if(t.forceCaptcha != undefined){
                    return false;
                }else{
                    t.forceCaptcha = true;
                }
                yiban.postData(url,data, afterSuccess, afterFailure, then);
                return false;
            });
        };

        yiban.autoCloseError = function () {
            setTimeout(function () {
                $('.code_error').fadeOut();
            },2000)
        };

        yiban.captchaError = function () {
            $('.code_error').css({'display':'inline-block'});
            yiban.autoCloseError();
            $('#pop_captcha_img').attr('src','/captcha/index?' + new Date());
            this.forceCaptcha = undefined;
        };
        yiban.getData = function (url, data, afterSuccess, afterFailure) {
            afterFailure = afterFailure || yiban.noop;
            $.ajax({
                url: baseUri + url,
                type: 'GET',
                data: data,
                dataType: 'json',
                success: function (response, textStatus, jqXHR) {
                    if (response.code === 200) {
                        afterSuccess(response);
                    } else {
                        if (response.code === 110) {
                            yiban.util.needLogin(response);
                        } else {
                            afterFailure(response);
                        }
                    }
                }
            });
        };

        yiban.sendVcode = function (value, type, afterSuccess, afterFailure , captcha) {
            var data = {
                type: type || 0
            };
            switch (data.type) {
                case 0: // sms
                case 1: // voice
                    data.mobile = value;
                    break;
                case 2: // email
                    data.email = value;
                    break;
            }
            if(captcha){// captcha sms 20150909
                data.captcha = captcha;
            }

            yiban.postData(yiban.url.user.sendVcode, data, function (resp) {
                afterSuccess && afterSuccess();
            }, function (resp) {
                yiban.ui.alert(resp.message);
                if (resp.code !== 201) { // && resp.code !== 421 (2015.06.26 开放421状态)
                    afterFailure && afterFailure(resp);
                }
            });
        };

        // 新增通用添加好友 (2014.10.11)
        yiban.addFriend = function (type, data) {
            type = type || 'user';
            $('.add-friend').on('click', function () {
                var $this = $(this),
                    afterSuccess = yiban.noop;
                data = data || {};
                if (type === 'school') {
                    afterSuccess = function () {
                        $this.html('已申请');
                        yiban.ui.alert(yiban.msg.school.addFriend);
                    };
                } else { // user
                    data = {
                        userid: $this.data('userid'),
                        reason: '' // 申请说明
                    };
                    afterSuccess = function () {
                        yiban.util.disabled($this);
                        yiban.ui.alert(yiban.msg.friend.applied);
                    };
                }
                yiban.postData(yiban.url.user.addFriend, data, function (resp) {
                    afterSuccess();
                }, function (resp) {
                    yiban.ui.alert(resp.message);
                    if (resp.code == 201) {
                        location.reload();
                    }
                });
            });
        };

        yiban.polyfill = function () {
            if (!String.prototype.trim) {
                String.prototype.trim = function () {
                    return this.replace(/^\s+|\s+$/gm, '');
                };
            }
            if (!Array.prototype.indexOf) {
                Array.prototype.indexOf = function (searchElement, fromIndex) {
                    var i, pivot = (fromIndex) ? fromIndex : 0,
                        length;
                    if (!this) {
                        throw new TypeError();
                    }
                    length = this.length;
                    if (length === 0 || pivot >= length) {
                        return -1;
                    }
                    if (pivot < 0) {
                        pivot = length - Math.abs(pivot);
                    }
                    for (i = pivot; i < length; i++) {
                        if (this[i] === searchElement) {
                            return i;
                        }
                    }
                    return -1;
                };
            }
        };

    })(yiban);

    /**
     * UI方法
     */
    (function (yiban) {

        yiban.ui = {};

        /**
         * dialog
         */
        (function (ui) {

            var _dialog = {
                $wrapper: null,
                $container: null,
                $content: null
            };

            ui.closeDialog = function () {
                var self = _dialog;
                self.$container.removeClass('active');
                self.$content.css({
                    'height': 0,
                    'margin-top': 0
                });
                setTimeout(function () {
                    self.$wrapper.remove();
                    yiban.util.lockWindow(false);
                }, 300);
            };

            ui.dialog = function (opts) {
                yiban.util.lockWindow(true);
                var self = _dialog,
                    timeout = opts.timeout || 2000,
                    content = opts.content || '请填写内容',
                    btnTpl = '';

                switch (opts.type) {
                    case 'alert':
                        btnTpl = '';
                        setTimeout(function () {
                            yiban.ui.closeDialog();
                        }, timeout);
                        break;
                    case 'confirm':
                        btnTpl = '<div class="dialog-btn">' +
                            '<div class="dialog-btn-wrapper">' +
                            '<a class="dialog-confirm" href="javascript:void(0)">完成</a>' +
                            '<a class="dialog-cancel" href="javascript:void(0)">取消</a>' +
                            '</div>' +
                            '</div>';
                        break;
                    default:
                        setTimeout(function () {
                            yiban.ui.closeDialog();
                        }, opts.timeout);
                        break;
                }

                var output = '<div class="dialog-wrapper">' +
                    '<div class="dialog-container">' +
                    '<div class="dialog-mask"></div>' +
                    '<div class="dialog-content">' +
                    '<div class="dialog-bg">' +
                    '<div class="dialog-main">' +
                    content +
                    '</div>' +
                    btnTpl +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                //console.log(output)
                yiban.$body.append(output);
                opts.fn && opts.fn();

                self.$wrapper = $('.dialog-wrapper');
                self.$container = self.$wrapper.find('.dialog-container');
                self.$content = self.$container.find('.dialog-content');

                var $bg = self.$content.find('.dialog-bg'),
                    $main = $bg.find('.dialog-main');

                setTimeout(function () {
                    self.$container.addClass('active');
                }, 1);

                var imgLen = $main.find('img').length;
                if (imgLen) {
                    $main.find('img').load(function () {
                        reset();
                        //console.log('图片加载成功');
                    }).attr('onerror', function () {
                        var imgWidth = $(this).width();
                        reset(imgWidth);
                        //console.log('图片加载失败');
                    });
                } else {
                    reset();
                }

                $D.on('click', '.dialog-confirm', function () {
                    if (opts.confirmFn) {
                        opts.confirmFn();
                    } else {
                        yiban.ui.closeDialog();
                    }
                }).on('click', '.dialog-cancel', function () {
                    yiban.ui.closeDialog();
                    opts.cancelFn && opts.cancelFn();
                });

                function reset(imgWidth) {
                    imgWidth = imgWidth || 0;
                    var inHeight = $bg.outerHeight() + imgWidth;
                    if (self.$content.height() < inHeight) {
                        self.$content.css({
                            'height': inHeight,
                            'margin-top': -inHeight / 2
                        });
                    }
                }
            };

        })(yiban.ui);

        /**
         * overlay
         */
        yiban.ui.overlay = function () {
            yiban.$mask.set('opacity', 0.4);
            $D.on('click', '.ui-mask, .ui-close, .btn-cancel', function (e) {
                var $this = $(this);
                if (yiban.isGuide) { // fix for guide
                    $this = $(e.target);
                    if ($this.attr('class') === 'ui-mask') {
                        return false;
                    } else if ($this.attr('class') === 'ui-close') {
                        $this.closest('.yiban-popup').hide();
                        yiban.guide.willExit();
                        return false;
                    }
                } else {
                    $this.closest('.yiban-popup').hide();
                }
                if (yiban.ui._confirm.cancelSelf) {
                    yiban.ui._confirm.$confirm.hide();
                    return false;
                }
                if (!yiban.publish.$panel) {
                    //console.log('no publish');
                    yiban.$mask.hide();
                    yiban.$popup && yiban.$popup.hide();
                    if (yiban.ui._confirm.isVisible) {
                        yiban.ui._confirm.$confirm.hide();
                    }
                } else {
                    //console.log('has publish');
                    if (yiban.ui._confirm.isVisible) {
                        yiban.ui._confirm.$confirm.hide();
                    } else {
                        yiban.publish.hide();
                    }
                }
            });
        };

        /**
         * alert
         */
        (function (ui) {

            var _alert = {
                $alert: null,
                timer: null
            };

            ui.alert = function (msg, time) {
                var self = _alert;
                self.$alert = self.$alert || new Overlay({
                        template: '<div id="yiban-alert"></div>',
                        align: {
                            baseXY: ['50%', '50%'],
                            selfXY: ['50%', 0]
                        }
                    });
                self.$alert.before('show', function () {
                    clearTimeout(self.timer);
                    this.element.html(msg).show();
                }).after('show', function () {
                    var that = this;
                    self.timer = setTimeout(function () {
                        that.element.fadeOut();
                    }, time || 3000);
                }).show();
            };
            ui.newalert=function(msg,_ok_callback){
                var info_alert ='<div class="alert_bg"></div><div class="info_wrap"><div class="info_alert"><h4>温馨提示</h4><p>'+msg+'</p><div class="alert_sure">确定</div></div></div>';
                $("button.submit").attr("disabled", true);
                $(".yiban-content").append(info_alert);
                $(".alert_sure").on('click',function(){
                    $(".info_wrap,.alert_bg").fadeOut(300,function(){$(this).remove();});
                    $("button.submit").attr("disabled", false);
                    _ok_callback && _ok_callback();
                });
            };

            ui.alertconfirm=function(msg,_ok_callback){
                var confirm_alert ='<div class="alert_bg"></div><div class="info_wrap confirm_block"><div class="info_alert"><h4>温馨提示</h4><p>'+msg+'</p><div class="confirm_sure" data-type="base">确定</div><div class="confirm_cancel">取消</div></div></div>';
                $("button.submit").attr("disabled", true);
                $(".yiban-content").append(confirm_alert);
                $(".confirm_sure").on('click',function(){
                    $(".confirm_block,.alert_bg").fadeOut(300,function(){$(this).remove();});
                    $("button.submit").attr("disabled", false);
                    _ok_callback && _ok_callback();
                });
                $(".confirm_cancel").on('click',function(){
                    $(".confirm_block,.alert_bg").fadeOut(300,function(){$(this).remove();});
                    $("button.submit").attr("disabled", false);
                });
            };

        })(yiban.ui);

        /**
         * confirm
         */
        (function (ui) {

            // 全局
            ui._confirm = {
                $confirm: null,
                isVisible: false,
                button: '#yiban-confirm .btn-ok',
                confirmPadding: 20 * 2,
                cancelSelf: false,
                manualClose: false,
                confirmOk: function () { },
                close: function () {
                    if(yiban.ui._confirm.$confirm){
                        yiban.ui._confirm.$confirm.hide();
                    }
                    if (!yiban.publish.$panel) { // just for publish
                        yiban.$mask.hide();
                    }
                },
                getConfirmTemplate: function (opts) {
                    var className = '',
                        content = '',
                        msg = opts.msg || '',
                        theme = 'btn-green',
                        buttonTemplate = '<p class="confirm-action clearfix"><button class="pull-left btn ' + theme + ' btn-ok" type="button">' + yiban.msg.confirm.ok + '</button><button class="pull-right btn btn-gray btn-cancel" type="button">' + yiban.msg.confirm.cancel + '</button></p>';
                    if (opts.className) {
                        className = ' ' + opts.className;
                    }
                    if (opts.theme) {
                        theme = 'btn-' + opts.theme;
                    }
                    if (opts.content) {
                        content = '<div class="confirm-content' + className + '">' + opts.content + buttonTemplate + '</div>';
                    } else {
                        content = '<p class="confirm-content' + className + '">' + msg + '</p>' + buttonTemplate;
                    }
                    return '<div class="confirm-inner">' + content + '</div>';
                }
            };

            ui.confirm = function (opts, afterOk, cancelSelf) {
                var self = yiban.ui._confirm,
                    width = opts.width || 420,
                    height = opts.height || 200,
                    contentPaddingTop = opts.paddingTop || 30,
                    margin = '-100 0 0 -210';
                self.cancelSelf = cancelSelf || false;
                self.manualClose = opts.manualClose || false;
                self.$confirm = self.$confirm || new Overlay({
                        template: '<div class="yiban-popup" id="yiban-confirm"></div>',
                        align: {
                            baseXY: ['50%', '50%'],
                            selfXY: ['50%', '50%']
                        }
                    });
                margin = (-height / 2) + ' 0 0 ' + (-width / 2);
                var $curConfirm = self.$confirm.element,
                    css = {
                        width: width,
                        margin: margin
                    };
                css.height = opts.msg ? height : 'auto';
                $curConfirm.css(css).html(self.getConfirmTemplate(opts));
                self.$confirm.before('show', function () {
                    yiban.$mask.show();
                }).after('show', function () {
                    self.isVisible = true;
                    var containerHeight = $curConfirm.height() - self.confirmPadding,
                        contentHeight = containerHeight - $curConfirm.find('.confirm-action').height();
                    if (yiban.IE.lte7) {
                        $curConfirm.find('.confirm-inner').css('height', containerHeight);
                        contentHeight -= contentPaddingTop;
                    }
                    if (opts.msg) {
                        $curConfirm.find('.confirm-content').css({
                            'height': contentHeight,
                            'padding-top': contentPaddingTop
                        });
                    } else {
                        $curConfirm.find('.confirm-content').css({
                            'height': 'auto',
                            'padding-top': 0
                        });
                    }
                }).after('hide', function () {
                    self.isVisible = false;
                }).show();
                self.confirmOk = afterOk || yiban.noop;
                return {
                    close: self.close,
                    resetOffset: function () {
                        self.$confirm.show();
                    }
                };
            };

        })(yiban.ui);

        /**
         * blink
         */
        (function (ui) {

            var blinkColor = '#D1351E',
                blinkDuration = 100;

            ui.blink = function ($dom, time) {
                var self = this,
                    color;
                time = (typeof time === 'number') ? time : 3;
                if ($dom.data('border-color')) {
                    color = $dom.data('border-color');
                } else {
                    color = $dom.css('borderColor');
                    $dom.data('border-color', color);
                }
                if (time === 0) {
                    $dom.val($dom.val().trim());
                    return;
                } else {
                    time--;
                    setTimeout(function () {
                        $dom.css('borderColor', self.blinkColor);
                        setTimeout(function () {
                            $dom.css('borderColor', color);
                            self.blink($dom, time);
                        }, self.blinkDuration);
                    }, self.blinkDuration);
                }
            };

        })(yiban.ui);


        /**
         * switchButton
         */
        (function (ui) {

            var _switchButton = {
                $switchButton: null,
                switchButtonClassName: 'btn-switch',
                onClassName: 'on',
                offClassName: 'off',
                switchButtonTemplate: '<i class="icon icon-switch"></i><span class="on">' + yiban.msg.switchButton.on + '</span><span class="off">' + yiban.msg.switchButton.off + '</span>',
                switchOn: function ($switch) {
                    (function (self) {
                        self.$switchButton.attr('class', self.switchButtonClassName + ' ' + self.onClassName).find('input:checkbox').prop('checked', true);
                    })(_switchButton);
                },
                switchOff: function () {
                    (function (self) {
                        self.$switchButton.attr('class', self.switchButtonClassName + ' ' + self.offClassName).find('input:checkbox').prop('checked', false);
                    })(_switchButton);
                }
            };

            ui.switchButton = function (fn) {
                var self = _switchButton,
                    $switcher = $('.' + self.switchButtonClassName);
                $switcher.each(function () {
                    var $this = $(this);
                    $this.addClass($this.data('default'));
                }).append(self.switchButtonTemplate).find('input:checkbox').on('change', function () {
                    var $this = $(this);
                    self.$switchButton = $this.parent();
                    if (!$this.prop('checked')) {
                        fn($this, self.switchOn);
                    } else {
                        fn($this, self.switchOff);
                    }
                });
                $switcher.find('.on, .off').on('click', function () {
                    var $this = $(this),
                        $switch = $this.parent();
                    if (!$switch.hasClass($this.attr('class'))) {
                        $switch.find('input:checkbox').trigger('change');
                    }
                });
            };

        })(yiban.ui);


        // other
        yiban.ui.hidePopup = function () {
            yiban.$popup.hide();
            yiban.$mask.hide();
        };
        yiban.ui.showPopup = function () {
            yiban.$mask.show();
            yiban.$popup.show();
        };

        /**
         * popover 2015.01.08 新增弹出框
         */
        (function (ui) {

            // 全局
            ui._popover = {
                className: 'y-popover',
                duration: 200,
                iconToolHeight: 28,
                arrowWidth: 10,
                moveOffsetTop: 15,
                show: function ($parent, $child, opts) {
                    var self = this,
                        parentPosition = $parent.offset(),
                        offsetTop = opts.top || 0,
                        offsetLeft = opts.left || 0;
                    if ($parent.attr('id') === 'y-publish') {
                        if ($parent.find('span').css('display') === 'none') {
                            $child.find('.arrow').css('left', 280);
                            offsetLeft = -120;
                        } else {
                            $child.find('.arrow').css('left', 255);
                        }
                    }
                    opts.fn && opts.fn();
                    if (opts.event === 'click') {
                        self.reset();
                        $parent.addClass(yiban.className.active);
                        $child.css({
                            top: parentPosition.top + self.iconToolHeight + offsetTop,
                            left: parentPosition.left + self.arrowWidth / 2 + offsetLeft
                        }).show().animate({
                            opacity: 1,
                            top: '+=' + self.moveOffsetTop
                        }, self.duration);
                    } else {
                        $child.css({
                            top: parentPosition.top + self.iconToolHeight + self.moveOffsetTop + offsetTop,
                            left: parentPosition.left + self.arrowWidth / 2 + offsetLeft
                        }).fadeIn('fast');
                    }
                },
                hide: function ($parent, $child) {
                    var self = yiban.ui._popover;
                    $child.animate({
                        opacity: 0,
                        top: '-=' + self.moveOffsetTop
                    }, self.duration, function () {
                        $parent.removeClass(yiban.className.active);
                    });
                },
                reset: function () {
                    $('.user-account').find('.icon-font').each(function () {
                        if ($(this).hasClass(yiban.className.active)) {
                            $(this).removeClass(yiban.className.active);
                        }
                    });
                    $('.' + yiban.ui._popover.className).each(function () {
                        if ($(this).css('display') !== 'none') {
                            $(this).hide();
                        }
                    });
                }
            };

            ui.popover = function (opts) {
                var ui_popover = yiban.ui._popover,
                    $parent = $(opts.parent),
                    $child = $(opts.child);
                opts.event = opts.event || 'hover';
                if (opts.event === 'click') {
                    $('#y-user-account ' + opts.parent).click(function () {
                        var $this = $(this);
                        if (!$this.hasClass(yiban.className.active)) {
                            ui_popover.show($parent, $child, opts);
                        } else {
                            ui_popover.hide($parent, $child);
                        }
                    });
                } else {
                    $parent.mouseDelay(false, opts.group).hover(function () {
                        ui_popover.show($parent, $child, opts);
                    }, function () {
                        $child.fadeOut();
                    });
                    $child.mouseDelay(false, opts.group).hover(null, function () {
                        $child.fadeOut();
                    });
                }
            };

        })(yiban.ui);

        yiban.ui.init = function () {
            var ui_popover = yiban.ui._popover;

            yiban.ui.overlay();

            $D.on('click', yiban.ui._confirm.button, function () {
                yiban.ui._confirm.confirmOk();
                if (!yiban.ui._confirm.manualClose) {
                    yiban.ui._confirm.close();
                }
            }).on('click', function (e) {
                var $this = $(e.target),
                    UI = $this.data('ui'),
                    parentUI = $this.parent().data('ui');
                if (yiban.$mask.element.css('display') === 'none') { // fix for guide
                    if (!(UI === 'popover' || parentUI === 'popover' || $this.closest('.' + ui_popover.className).length)) {
                        ui_popover.reset();
                    }
                    if (!(UI === 'subnav' || parentUI === 'subnav' || $this.closest(yiban.plugin.subNav.subNavId).length)) {
                        yiban.plugin.subNav.hide();
                    }
                }
            });

            $W.scroll(function () {
                ui_popover.reset();
            }).wresize(function () {
                ui_popover.reset();
            });
        };

    })(yiban);

    /**
     * 易班自定义插件
     */
    (function (yiban) {

        yiban.plugin = {};

        yiban.plugin.mobileNav = {
            on: false,
            $navBtn: $('#mobile-main-nav'),
            setMenuWidth: function () {
                var self = yiban.plugin.mobileNav,
                    subNav = yiban.plugin.subNav;
                if (self.$navBtn.css('display') === 'block') {
                    yiban.$mainMenu.css('height', $D.height());
                    $(subNav.subNavId).css('height', $D.height());
                    if (self.$navBtn.hasClass(yiban.className.active) || $(yiban.plugin.subNav.subNavId).hasClass(yiban.className.show)) {
                        yiban.$mainMenu.show();
                    } else {
                        yiban.$mainMenu.hide();
                    }
                } else {
                    yiban.$mainMenu.css('height', '100%').show();
                    if (!$(yiban.plugin.subNav.subNavId).hasClass(yiban.className.show)) {
                        $(subNav.subNavId).css('height', 0);
                    } else {
                        $(subNav.subNavId).css('height', yiban.IE.lte7 ? subNav.height - 40 : subNav.height);
                    }
                }
            },
            init: function () {
                var self = this,
                    subNav = yiban.plugin.subNav;
                self.on = true;
                self.$navBtn.on('click', function () {
                    var $this = $(this);
                    if (!$this.hasClass(yiban.className.active)) {
                        $this.addClass(yiban.className.active);
                        yiban.$mainMenu.slideDown();
                    } else {
                        subNav.hide(function () {
                            $(subNav.mainMenuClass).find('a').removeClass(yiban.className.active);
                            $this.removeClass(yiban.className.active);
                            yiban.$mainMenu.slideUp();
                        });
                    }
                });
                self.setMenuWidth();
                $W.wresize(function () {
                    self.setMenuWidth();
                });
                $D.on('click', '#publish-popover', function () {
                    var $this = $(this);
                    if ($this.hasClass('y-popover')) {
                        $this.hide();
                        $('#y-publish').removeClass('active');
                    }
                });
                var startX,startY;
                // 2018.09.13 新增好声音快速注册
                if (yiban.getPar('from') !== 'voice') {
                    $('.sign-phone').on('touchstart',function(e){
                        $('#close-num').html('5');
                        $('#mask').show();
                        interval = window.setInterval('changeNum()',1000);
                        return false;
                    });
                }
                $(document).on('touchstart','#mask',function(e){
                    startX = e.originalEvent.changedTouches[0].clientX;
                    startY = e.originalEvent.changedTouches[0].clientY;
                    e.preventDefault();
                    e.stopPropagation();
                });
                $(document).on('touchend','#mask',function(e){
                    if (e.originalEvent.changedTouches[0].clientX == startX && e.originalEvent.changedTouches[0].clientY == startY) {
                        window.clearInterval(interval);
                        t = 5;
                        $(this).hide();
                    }
                });
                $(document).on('touchstart','#mask-close .close',function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    window.clearInterval(interval);
                    t = 5;
                    $('#mask').hide();
                });
                $(document).on('touchstart','#mask-win',function(e){
                    /*e.preventDefault();*/
                    e.stopPropagation();
                });
                $(document).on('click','#mask-link',function(e){
                    window.clearInterval(interval);
                    t = 5;
                    $('#mask').hide();
                });
            }
        };

        yiban.plugin.subNav = {
            $a: null,
            mainMenuClass: '.has-submenu',
            subNavId: '#sub-nav',
            duration: 300,
            height: 240,
            show: function () {
                var self = yiban.plugin.subNav,
                    mobileNav = yiban.plugin.mobileNav;
                self.$a.addClass(yiban.className.active);
                $(self.subNavId).addClass(yiban.className.show);
                $(self.subNavId).animate({
                    height: yiban.IE.lte7 ? self.height - 10 : self.height,
                    opacity: 1
                }, self.duration, function () {
                    if (mobileNav.on && mobileNav.$navBtn.css('display') === 'block') {
                        $(self.subNavId).css('height', $D.height());
                    }
                });
                mobileNav.$navBtn.addClass(yiban.className.active);
            },
            hide: function (fn) {
                var self = yiban.plugin.subNav;
                self.$a && self.$a.removeClass(yiban.className.active);
                fn && fn();
                $(self.subNavId).animate({
                    height: 0,
                    opacity: 0
                }, self.duration, function () {
                    $(self.subNavId).removeClass(yiban.className.show);
                    yiban.plugin.mobileNav.$navBtn.removeClass(yiban.className.active);
                });
            },
            auto: function (open) {
                open = open || false;
                var self = this;
                if (open) {
                    if (!$(self.subNavId).hasClass(yiban.className.show)) {
                        $(self.mainMenuClass).trigger('click');
                    }
                } else {
                    if ($(self.subNavId).hasClass(yiban.className.show)) {
                        $(self.mainMenuClass).trigger('click');
                    }
                }
            },
            init: function () {
                var self = this,
                    ui_popover = yiban.ui._popover;
                if ($(self.subNavId).length) {
                    $(self.mainMenuClass).on('click', function () {
                        if(window.innerWidth && window.innerWidth>1366){
                            if($(self.subNavId).find(".sub-menu-third").find("li").length < 7){
                                $(".sub-menu-third").css("padding","70px 0");
                            }
                        }

                        /*else if(navigator.userAgent.indexOf("MSIE 8.0")>0){
                            if($(self.subNavId).find(".sub-menu-third").find("li").length > 5){
                                $(".sub-menu-third").css("padding","12px 0");
                            }else{
                                $(".sub-menu-third").css("padding","70px 0 70px 20px");
                            }
                        }else{
                            $(".sub-menu-third").css("padding","70px 0 70px 20px");
                        };*/

                        self.$a = $(self.mainMenuClass).find('a');
                        if (!$(self.subNavId).hasClass(yiban.className.show)) {
                            ui_popover.reset();
                            self.show();
                        } else {
                            self.hide();
                        }
                        self.$a.blur();
                        return false; // fix for bubble
                    });
                }
            }
        };

        yiban.plugin.gotop = {
            $gotop: null,
            stickClassName: 'sticktop',
            headerMarginTop: 30,
            scroll: function () {
                var self = this;
                $W.on('scroll', function () {
                    var scrollTop = $D.scrollTop();
                    //windowHeight = $W.height();
                    /*if (scrollTop > windowHeight / 3) {
                     self.$gotop.show();
                     } else {
                     self.$gotop.hide();
                     }*/
                    // for header
                    if (scrollTop < self.headerMarginTop) {
                        yiban.$header.removeClass(self.stickClassName);
                    } else {
                        yiban.$header.addClass(self.stickClassName);
                    }
                });
                // fix for F5
                if ($D.scrollTop() >= self.headerMarginTop) {
                    yiban.$header.addClass(self.stickClassName);
                }
            },
            go: function () {
                $('html,body').animate({
                    scrollTop: 0
                }, 3e2);
            },
            init: function () {
                /*var self = this,
                 a = document.createElement('A');
                 a.id = 'gotop';
                 a.href = '#';
                 a.style.display = 'none';
                 a.setAttribute('title', yiban.msg.gotop);
                 a.setAttribute('onFocus', 'this.blur()');
                 a.innerHTML = '<span><em class="tr">♦</em><em class="tube">▐</em></span>';
                 a.onclick = function() {
                 self.go();
                 //return false;
                 };
                 $(a).appendTo('body');
                 self.$gotop = $('#gotop');*/
                this.scroll();
            }
        };

        (function (plugin) {

            var _banner = {
                $slider: undefined,
                maxWidth: 960,
                changeWidth: function (newBannerWidth) {
                    this.$slider.find('ul > li').css('width', newBannerWidth);
                }
            };

            plugin.banner = function (id) {
                id = id || '#slider';
                var self = _banner;
                self.$slider = $(id);
                if (self.$slider.length) {
                    var oldBannerWidth = self.maxWidth,
                        newBannerWidth = self.$slider.width();
                    self.$slider.unslider({
                        speed: 500,
                        delay: 3000,
                        keys: true,
                        dots: true,
                        fluid: true
                    });
                    // fix default status
                    self.changeWidth(newBannerWidth);
                    // fix for responsive
                    $W.wresize(function () {
                        newBannerWidth = self.$slider.width();
                        if (newBannerWidth !== oldBannerWidth) {
                            oldBannerWidth = newBannerWidth;
                            self.changeWidth(newBannerWidth);
                        }
                    });
                }
            };

        })(yiban.plugin);

        (function (plugin) {

            var _hotTopic = {
                $image: $('#topic-image'),
                itemClass: '.topic-item',
                count: 0,
                curId: 0,
                defaultId: 0,
                timer: null,
                delay: 5e3,
                changeTopic: function () {
                    var self = this,
                        $this = $(self.itemClass + '-' + self.curId),
                        src = $this.data('src'),
                        url = $this.data('url');
                    $(self.itemClass).removeClass(yiban.className.active);
                    $this.addClass(yiban.className.active);
                    self.$image.attr('src', src).hide().fadeIn().parent().attr('href', url);
                },
                run: function () {
                    var self = this;
                    self.timer = setInterval(function () {
                        if (self.curId < self.count) {
                            self.curId++;
                        } else {
                            self.curId = self.defaultId;
                        }
                        self.changeTopic();
                    }, self.delay);
                }
            };

            plugin.hotTopic = function () {
                var self = _hotTopic;
                $(self.itemClass + '-' + self.defaultId).addClass(yiban.className.active);
                self.count = $(self.itemClass).length - 1;
                self.run();
                $(self.itemClass).on('mouseenter', function () {
                    var $this = $(this);
                    clearInterval(self.timer);
                    self.curId = $this.data('id');
                    self.changeTopic();
                }).on('mouseleave', function () {
                    self.run();
                });
            };

        })(yiban.plugin);

        (function (plugin) {

            var _scroll = {
                $loader: $('.yiban-loading'),
                bufferPx: 40,
                page: 0,
                maxPage: 0, // 暂未使用
                scroll: 1,
                maxScroll: 0, // 暂未使用
                autoLoad: false,
                canScroll: true,
                type: 'POST',
                stop: function () {
                    this.canScroll = false;
                    this.$loader.hide();
                    yiban.$footer.show();
                },
                behavior: function (url, data, afterSuccess, afterFailure) {
                    var self = this;
                    if (self.page) {
                        data.page = self.page;
                    }
                    if(self.topic_content){
                        data.topic_content = self.topic_content;
                    }else{
                        data.topic_content = '';
                    }

                    data.scroll = self.scroll;
                    $.ajax({
                        url: baseUri + url,
                        type: self.type,
                        data: data,
                        dataType: 'json',
                        beforeSend: function () {
                            self.canScroll = false;
                            self.$loader.show();
                        },
                        success: function (resp) {
                            self.canScroll = true;
                            if (resp.code === 200) {
                                if (!!resp.data && resp.data.length) {
                                    self.page && self.page++;
                                    self.scroll++;
                                    data.lastid = afterSuccess(resp);
                                    if (!$W.scrollTop() && ($D.height() - $W.height() === 0)) {
                                        _scroll.behavior(url, data, afterSuccess, afterFailure);
                                    }
                                } else {
                                    afterSuccess && afterSuccess(resp); // no more data
                                    self.stop();
                                }
                            } else {
                                if (resp.code === 110) {
                                    if (g_config && g_config.sign && g_config.sign == true) {
                                    } else {
                                        yiban.util.needLogin(resp);
                                    }
                                } else {
                                    self.stop();
                                    afterFailure && afterFailure(resp);
                                }
                            }
                        },
                        complete: function () {
                            self.$loader.hide();
                        }
                    });
                }
            };

            plugin.scroll = function (opts, afterSuccess, afterFailure) {
                var self = _scroll,
                    url = opts.url,
                    data = opts.data || {},
                    beforeAction = opts.beforeAction || false;
                self.type = opts.type || 'POST';
                self.page = opts.page || 0;
                self.autoLoad = opts.autoLoad || false;
                self.scroll= opts.scroll || 1 ;
                self.topic_content = opts.topic_content || '';

                yiban.$footer.hide();
                if (self.autoLoad) {
                    self.behavior(url, data, afterSuccess, afterFailure);
                }
                $W.on('scroll', function () {
                    var nearBottom = $D.height() - $W.height() - $W.scrollTop() <= self.bufferPx;
                    if (self.canScroll && nearBottom) {
                        if (beforeAction) {
                            data = beforeAction(data);
                        }
                        self.behavior(url, data, afterSuccess, afterFailure);
                    }
                });
            };

        })(yiban.plugin);

        yiban.plugin.loading = function ($dom) {
            var loading = '<div class="yiban-loading"><i class="loading"></i></div>';
            if ($dom) {
                $dom.html(loading);
            } else {
                yiban.$content.append(loading);
            }
        };

        (function (plugin) {

            var _waterfall = {
                containerId: undefined,
                boxClass: undefined,
                colCount: 0,
                colWidth: 240,
                gapWidth: 0,
                gapHeight: 0,
                spaceLeft: 0,
                windowWidth: 0,
                blocks: [],
                positionBlocks: function () {
                    var self = _waterfall;
                    $(self.boxClass).each(function (i) {
                        var $this = $(this),
                            min = Array.min(self.blocks),
                            index = $.inArray(min, self.blocks),
                            leftPos = (self.colWidth + self.gapWidth * 2) * index;
                        $this.css({
                            'top': min + 'px',
                            'left': (leftPos + self.spaceLeft) + 'px'
                        });
                        if (+$this.css('opacity') < 1) {
                            $this.animate({
                                'opacity': 1
                            });
                        }
                        self.blocks[index] = min + $this.outerHeight() + self.gapHeight;
                    });
                    // update waterfall container height
                    $(self.containerId).height(Math.max.apply({}, self.blocks));
                },
                setupBlocks: function () {
                    var self = _waterfall;
                    self.windowWidth = $(self.containerId).width();
                    self.blocks = [];
                    // Calculate the margin so the blocks are evenly spaced within the window
                    self.colCount = Math.floor(self.windowWidth / (self.colWidth + self.gapWidth * 2));
                    self.spaceLeft = +((self.windowWidth - (self.colWidth + self.gapWidth * 2) * self.colCount) / 2);
                    if (yiban.debug) {
                        yiban.log(self.spaceLeft);
                    }
                    for (var i = 0; i < self.colCount; i++) {
                        self.blocks.push(self.gapWidth);
                    }
                    self.positionBlocks();
                }
            };

            plugin.waterfall = function (opts) {
                var self = _waterfall;
                if (opts === 'reLayout') {
                    self.setupBlocks();
                } else {
                    self.containerId = opts.id || '#waterfall';
                    self.boxClass = opts.box || '.item';
                    self.colWidth = opts.width || 240;
                    self.gapWidth = opts.gapWidth || 0;
                    self.gapHeight = opts.gapHeight || 0;
                    // Function to get the Min value in Array
                    Array.min = function (array) {
                        return Math.min.apply(Math, array);
                    };
                    $(function () {
                        $(self.containerId).css({
                            'position': 'relative',
                            'width': '100%'
                        });
                        self.setupBlocks();
                        $W.wresize(self.setupBlocks);
                    });
                }
            };

        })(yiban.plugin);

        // 2015.01.08 新顶部导航
        yiban.plugin.topbar = {
            search: {
                parent: '#y-search',
                child: '#search-popover'
            },
            setting: {
                parent: '#y-setting',
                child: '#setting-popover'
            },
            publish: {
                parent: '#y-publish',
                child: '#publish-popover'
            },
            init: function () {
                var self = this;
                yiban.ui.popover({
                    event: 'click',
                    group: 'search',
                    parent: self.search.parent,
                    child: self.search.child,
                    left: 8,
                    top: -3
                });
                yiban.ui.popover({
                    event: 'click',
                    group: 'setting',
                    parent: self.setting.parent,
                    child: self.setting.child,
                    left: -35,
                    top: -3
                });
                yiban.ui.popover({
                    event: 'click',
                    group: 'publish',
                    parent: self.publish.parent,
                    child: self.publish.child,
                    left: -70,
                    top: -3
                });
                //输入空提示
                $(".y-popover-inner .btn-search").click(function (e) {
                    var keyword = $(".y-popover-inner .txt-search").val();
                    if (keyword == "") {
                        yiban.ui.alert("请输入关键字");
                        return false;
                    }
                });
            }
        };

        // 2015.01.08 新侧边栏
        yiban.plugin.sidebar = {
            $sidebar: $('#y-sidebar'),
            $newbie: $('#tool-newbie'),
            $sign: $('#tool-sign'),
            $gotop: $('#tool-gotop'),
            $btn: $('#btn-sidebar'),
            $newbieTaskPopup: $('#newbie-task-popup'),
            publishTask: {
                $feed: $('#task-feed'),
                $blog: $('#task-blog'),
                $topic: $('#task-topic'),
                $vote: $('#task-vote')
            },
            width: 40,
            duration: 100,
            minClassName: 'min',
            cookieName: 'y_sidebar_min',
            // for sign
            signedClassName: 'sign-done',
            signSurveyId: '#sign-survey',
            $signSurvey: null,
            checkboxClass: '.survey-option',
            checkedClassName: 'checked',
            survey: function (survey) {
                var self = yiban.plugin.sidebar;
                yiban.ui.dialog({
                    type: 'confirm',
                    content: survey,
                    fn: function () {
                        self.$signSurvey = $(self.signSurveyId);
                        if (+self.$signSurvey.data('type')) {
                            $('.survey-option,.survey-reason').on('click', function () {
                                $(this).parent().find(self.checkboxClass).toggleClass(self.checkedClassName);
                            });
                        } else {
                            $('.survey-option,.survey-reason').on('click', function () {
                                var $this = $(this).parent().find(self.checkboxClass);
                                if (!$this.hasClass(self.checkedClassName)) {
                                    $(self.checkboxClass).removeClass(self.checkedClassName);
                                    $this.addClass(self.checkedClassName);
                                }
                            });
                        }
                    },
                    confirmFn: function () {
                        var reason;
                        if (+self.$signSurvey.data('type')) {
                            var val = $("#others").val();
                            reason = { optionid: [], input: val ? val : null };
                            self.$signSurvey.find(self.checkboxClass).filter('.checked').each(function () {
                                reason.optionid.push($(this).data('value'));
                            });
                            //console.log(reason);
                            self.sign(1, reason);
                        } else {
                            reason = { optionid: [], input: val ? val : null };
                            self.$signSurvey.find(self.checkboxClass).filter('.checked').each(function () {
                                reason.optionid.push($(this).data('value'));
                            });
                            self.sign(1, reason);
                        }
                    },
                    cancelFn: function () {
                        yiban.ui.alert(yiban.msg.signin.cancel);
                    }
                });
            },
            sign: function (hasSurvey, reason) {
                var self = this;
                if (hasSurvey) {
                    yiban.postData(yiban.url.answer, {
                        optionid: reason.optionid,
                        input: reason.input
                    }, function (resp) {
                        yiban.isSigned = true;
                        self.$sign.parent().addClass(self.signedClassName);
                        yiban.ui.alert(resp.data.subMessage);
                        yiban.ui.closeDialog();
                        yiban.guide && yiban.guide.finish(1); // 2015新手任务1
                    }, function (resp) {
                        yiban.ui.alert(resp.message);
                    });
                } else {
                    yiban.postData(yiban.url.signin, {}, function (resp) {
                        if (resp.data.has_survey) {
                            self.survey(resp.data.survey);
                        } else {
                            yiban.isSigned = true;
                            self.$sign.parent().addClass(self.signedClassName);
                            yiban.ui.alert(yiban.msg.signin.success);
                            yiban.guide && yiban.guide.finish(1); // 2015新手任务1
                        }
                    }, function (resp) {
                        yiban.ui.alert(resp.message);
                    });
                }
            },
            /*newbieTask: function() {
             var self = this;
             yiban.postData(yiban.url.newbieTask, {}, function(resp) {
             if (resp.data) {
             $.each(resp.data, function(k, v) {
             var $task = self.$newbieTaskPopup.find('.task-' + (k + 1));
             $task.find('.money').html(v.money);
             $task.find('.exp').html(v.experience);
             if (!!v.complete) {
             $task.addClass('finished');
             }
             });
             yiban.$mask.show();
             yiban.$popup = self.$newbieTaskPopup;
             yiban.$popup.fadeIn();
             }
             }, function(resp) {
             yiban.ui.alert(resp.message);
             });
             },*/
            init: function () {
                var self = this,
                    y_sidebar_min = yiban.util.cookie.get(self.cookieName);
                if (!!y_sidebar_min && y_sidebar_min == 1) {
                    self.$sidebar.addClass(self.minClassName);
                }
                self.$sidebar.animate({
                    right: 0
                }, self.duration);
                // 切换
                self.width = self.$sidebar.width();
                self.$btn.on('click', function () {
                    if (!self.$sidebar.hasClass(self.minClassName)) {
                        self.$sidebar.animate({
                            right: -self.width
                        }, self.duration, function () {
                            yiban.util.cookie.set(self.cookieName, 1);
                            $(this).addClass(self.minClassName).animate({
                                right: 0
                            });
                        });
                    } else {
                        self.$sidebar.animate({
                            right: -self.width
                        }, self.duration, function () {
                            yiban.util.cookie.set(self.cookieName, 0);
                            $(this).removeClass(self.minClassName).animate({
                                right: 0
                            });
                        });
                    }
                    $(this).blur();
                });
                // 回顶部
                self.$gotop.on('click', function () {
                    yiban.plugin.gotop.go();
                });
                // 签到
                self.$sign.on('click', function () {
                    if (yiban.isSigned) {
                        yiban.ui.alert(yiban.msg.signin.done);
                    } else {
                        self.sign(0);
                    }
                });
                // 新人任务（2015.06.16弃用）
                /*self.$newbie.on('click', function() {
                 self.newbieTask();
                 });*/
                // 发布按钮
                self.publishTask.$feed.on('click', function () {
                    yiban.publish.show('feed');
                });
                self.publishTask.$blog.on('click', function () {
                    yiban.publish.show('blog');
                });
                self.publishTask.$topic.on('click', function () {
                    yiban.publish.show('topic');
                });
                self.publishTask.$vote.on('click', function () {
                    yiban.publish.show('vote');
                });
            }
        };

        yiban.login = {
            menuTpl: function () {
                return '<li class="pull-left main-menu-item has-submenu guide2015_3-1" data-submenu="0" data-ui="subnav"><a class="guide-' + yiban.msg.guide.my + '" href="javascript:void(0);">' + yiban.msg.my.my + '<i class="icon icon-arrow">&rsaquo;</i></a></li>';
            },
            userTpl: function (user) {
                var output = '<span class="user-account nav-toolbar-logined">',
                    newMsgCount = user.msg_count || 0;
                output += '<i class="icon icon-yiban icon-magnifier" id="y-search" data-ui="popover" title="搜索"></i>';
                output += '<a href="' + user.url + '"><i class="icon icon-yiban icon-user guide2015_2-1" title="个人主页"></i></a>'; // 新手引导2-1 (2015.06.11)
                output += '<a class="" href="' + yiban.url.user.applyList + '"><span title="消息盒子" class="icon icon-yiban icon-mail';
                if (newMsgCount) {
                    output += ' new-message';
                }
                output += '">';
                if (newMsgCount) {
                    if (yiban.IE.lte7) {
                        output += '<i class="font-fix">R</i>'; // for iconfont
                    }
                    output += '<b><span class="arrow"></span></b><em data-sum="' + newMsgCount + '">' + (newMsgCount > 99 ? '99+' : newMsgCount) + '</em>';
                }
                output += '</span></a>';
                output += '<i class="icon icon-yiban icon-set" id="y-setting" data-ui="popover" title="设置"></i>';
                output += '<i class="icon icon-yiban icon-pub guide2015_4-1" id="y-publish" data-ui="popover"><span>发 布</span></i>';
                output += '</span>';
                return output;
            },
            settingTpl: function () {
                var output = '<div class="y-popover" id="setting-popover">';
                output += '<ul>';
                output += '<li><a href="' + yiban.url.user.management + '">' + yiban.msg.user.management + '</a></li>';
                output += '<li class="exit"><a href="' + yiban.url.logout + '">' + yiban.msg.exit + '</a></li>';
                output += '</ul>';
                output += '<i class="icon arrow"><b></b></i></div>';
                return output;
            },
            publishTpl: function () {
                var output = '<div class="y-popover" id="publish-popover">';
                output += '<ul class="publish-list clearfix" id="i-publish">';
                output += '<li class="publish-verify"><a target="_blank" href="' + (yiban.isSchoolVerify ? yiban.url.publish.topic : 'javascript:void(0)') + '"><i class="icon-font font-publish-topic"></i><b>发话题</b></a></li>';
                output += '<li class="publish-verify"><a target="_blank" href="' + (yiban.isSchoolVerify ? yiban.url.publish.vote : 'javascript:void(0)') + '"><i class="icon-font font-publish-vote"></i><b>投票</b></a></li>';
                output += '<li><a target="_blank" href="/my/publishfeed"><i class="icon-font font-publish-feed guide2015_4-2"></i><b>发动态</b></a></li>';
                output += '<li><a target="_blank" href="' + yiban.url.publish.news + '"><i class="icon-font iconfont icon-miao-01"></i><b>易瞄瞄</b></a></li>';
                output += '<li class="publish-verify"><a target="_blank" href="' + (yiban.isSchoolVerify ? yiban.url.publish.blog : 'javascript:void(0)') + '"><i class="icon-font font-publish-blog"></i><b>写博文</b></a></li>';
                output += '<li class="publish-verify"><a target="_blank" href="' + (yiban.isSchoolVerify ? yiban.url.publish.questionnaire : 'javascript:void(0)') + '"><i class="icon-font font-publish-questionnaire"></i><b>发问卷</b></a></li>';
                output += '<li><a target="_blank" href="/my/publishalbum"><i class="icon-font font-publish-userAlbum font-publish-album"></i><b>传照片</b></a></li>';
                output += '</ul>';
                output += '<i class="icon arrow"><b></b></i>';
                output += '</div>';
                return output;
            },
            render: function (data) {
                // main menu
                yiban.$mainMenu.prepend(this.menuTpl());
                // sub nav
                $('#y-user-account').html(this.userTpl(data.user)); // 2015.01.08
                // set g_config
                yiban.isSchoolVerify = +data.user.isSchoolVerify; // 是否校方认证 for cache
                g_config.isOrganization = +data.user.isOrganization; // for vote
                g_config.ispublic = +data.user.ispublic; // for vote
                g_config.token = data.user.token; // 2015.02.09 for blog & vote
                g_config.isSchoolVerify = data.user.isSchoolVerify;
                g_config.isLogin = data.isLogin;

                yiban.$header.append(data.subNav);
                yiban.$header.find('.user-account').append('<a class="font-exit" href="/logout">退出登录</a>'); //退出登录
                yiban.plugin.subNav.init();
                // account
                yiban.$body.append(this.settingTpl());
                yiban.$body.append(this.publishTpl());
                yiban.plugin.topbar.init(); // 2015.01.12
                // sign in
                if (data.checkin) { // 2015.01.12
                    var sidebar = yiban.plugin.sidebar;
                    sidebar.$sign.parent().addClass(sidebar.signedClassName);
                    yiban.isSigned = true;
                }
                //搜索框已登录样式
                $('#search-popover').addClass('y-popover-isLogin');
            },
            // 完善手机号 (2014.10.13) 可弃用 (改成强制绑定手机套路 2014.10.14)
            checkMobileInfo: function () {
                if ($('#username').length) {
                    var result = yiban.util.cookie.get('need_verify_mobile');
                    if (!!result && result == 1) {
                        $('#username').parent().append('<span class="complete-mobile"><a href="' + yiban.url.user.security + '">' + yiban.msg.user.security + '</a></span>');
                    }
                }
            },
            yiban_account_sso:function(){//大学页面的SSO接口，登陆之后调用
                var sso_url = "http://www.iyiban.cn/yiban_account/sso";
                var token = yiban.cookieUtil.get('yiban_user_token');
                if(token){
                    var script=document.createElement("script");
                    script.setAttribute("type", "text/javascript");
                    script.setAttribute("src", sso_url + '?token=' + token);
                    var heads = document.getElementsByTagName("body");
                    if(heads.length){
                        heads[0].appendChild(script);
                    }else{
                        document.documentElement.appendChild(script);
                    }
                }
            },
            init: function () {
                var self = this,
                    $newbie = $('#tool-newbie');
                yiban.postData(yiban.url.user.getLogin, {}, function (resp) {
                    if (resp.data.isLogin) { // 已登录
                        self.yiban_account_sso();
                        if (resp.data.completedMission) {
                            $newbie.remove();
                        } else {
                            yiban.isNewbie = true;
                            if (!$newbie.length) { // 兼容首页静态缓存问题
                                $('.sidebar-tools').prepend('<li class="first-sidebar-tool"><i class="icon icon-newbie guide2015_0" id="tool-newbie"></i></li>');
                            }
                            require.async('guide'); // 2015新手引导 (V2 2015.06.09)
                        }
                        self.render(resp.data);
                        //require.async('publish');
                        // self.checkMobileInfo();
                    } else { // 未登录
                        $('.sign-in').attr('href', resp.data.loginUrl); // just for index cache
                        $newbie.on('click', function () {
                            yiban.util.needLogin();
                        });
                    }
                });
            }
        };

        yiban.plugin.init = function () {
            yiban.plugin.subNav.init();
            yiban.plugin.gotop.init(); // 2015.01.08并入sidebar
            yiban.plugin.topbar.init();
            yiban.plugin.sidebar.init();
            yiban.plugin.mobileNav.init();
        };

    })(yiban);

    yiban.setPublish = function (afterSuccess) {
        yiban.publish.success = afterSuccess;
    };
    yiban.cookieUtil = {
        //写cookies
        set:function(name,value,day,path)
        {
            var Days = day ? day:30;
            var _path = path ? path:'/';

            var exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*1000);

            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() +";path="+_path;
        },
        //读取cookies
        get:function(name)
        {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        //删除cookies
        del:function(name)
        {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=getCookie(name);
            if(cval!=null)
                document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }
    };

    yiban.init = function () {
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)) {
            yiban.isMobile = true;
            // 移动端面下易智招聘改链接
            $( '.link-yizhi' ).attr( 'href', 'http://ht.myjob500.com/Landing?id=yb_m' );
        } else {
            var isFactory = /(q.yiban.\w|factory)/i.test(location.href); // 是否快搭 (2015.02.11)
            if (KickIE.IE.lte9) {
                require.async('placeholders');
                if (KickIE.IE.ver < 9) {
                    yiban.polyfill();
                    // Avoid `console` errors in browsers that lack a console.
                    (function () {
                        var method;
                        var noop = function () { };
                        var methods = [
                            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                            'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
                        ];
                        var length = methods.length;
                        var console = (window.console = window.console || {});

                        while (length--) {
                            method = methods[length];

                            // Only stub undefined methods.
                            if (!console[method]) {
                                console[method] = noop;
                            }
                        }
                    }());
                }
            }
            if (!isFactory) {
                // yiban.plugin.login.checkMobileInfo(); // 完善手机号 (2014.10.13)
                if (!yiban.isCachePage && yiban.isLogin) { // 是否登录
                    require.async('publish');
                }
                if (!yiban.isCachePage) {
                    require.async('guide');
                }
            } else {
                yiban.factoryPath = /(q.yiban.\w)/i.test(location.href) ? '/' : '/factory/';
            }
        }
        yiban.plugin.init();
        yiban.ui.init();
    };
    /**
     * 载入方法
     * var y = require('yiban.js');
     * y.yiban_statistics_script('yforum');
     *
     * 调用方法
     *
     * 1) ys.sendEvent('事件名'，可选参数)
     *
     * ys.sendEvent('分享',{
     *      school_id: 23
     * })
     *
     * 2) 给标签添加属性：yiban-ys-data = "['html事件名','事件名',可选参数]"
     *
     * <a href="a.html" yiban-ys-data="['click','点击a']" >a.html</a>
     * <button yiban-ys-data="['click','哈哈哈哈']">哈哈</button>
     * <button yiban-ys-data="['click','哈哈哈哈',"{\"id\":1,\"name\":\"fantoby\"}"]">哈哈param</button>
     *
     * @param appName
     */
    yiban.yiban_statistics_script = function (appName) {
        var uri_abj = {
            dev:"http://statistics.yiban.dev/js",
            pro:'http://www.yiban.cn/statistics-gongjian/js'
        };

        var uri = uri_abj.dev;

        if(window.location.href.indexOf("www.yiban.cn") != -1){
            uri = uri_abj.pro;
        }
        var script=document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", uri + '?app=' + appName);
        var heads = document.getElementsByTagName("body");
        if(heads.length){
            heads[0].appendChild(script);
        }else{
            document.documentElement.appendChild(script);
        }
    }

    yiban.init();

    var voiceUrl = yiban.getPar('from') === 'voice' ? '/user/reg/indexQuick' + location.search : '/user/reg/index'; // 2018.09.13 新增好声音快速注册
    setTimeout(function(){$('.sign-phone').attr('href', voiceUrl);},1000);

    // 2017.10.10 新增权限检查
    $D.on('click', '#i-publish .publish-verify a', function() {
        if (!yiban.isSchoolVerify) {
            yiban.ui.alert('<p>未校方认证的用户不能发布哦，请先去完成校方认证呢！<a href="/user/info/index?type=2" style="color:#03a9f4;text-decoration:underline;">去认证</a></p>', 5000);
            return false;
        }
    });

    module.exports = yiban;
    module.exports.url = yiban.url;
    module.exports.msg = yiban.msg;
    module.exports.$D = $D;
    module.exports.$W = $W;
});
