//需要抓取的节点要有类似的类名和属性，例：<div class="fetch-XXX" data-fetch-type="ad" data-fetch-id="333">ad</div>
//类名fetch为必须的前缀，防止类名带样式
var cifnewsCounter = {
	api: {
		log: function (entity_type, entity_id, action, output_chanel, other, title, medium) {
			var _postData = {
				'entity_type': entity_type,
				'entity_id': entity_id,
				'action': action,
				"entity_title": title,
				"medium": medium || ''
			};
			if (output_chanel) {
				_postData["output_channel"] = output_chanel;
			}
			cifnewsCounter.otherData(other, _postData);
			cifnewsCounter.fetchData(_postData);
		}
	},
	common: {
		getCookie: function (cname) {
			if (cname && escape(cname).indexOf("%u") > 0) {
				cname = encodeURIComponent(cname);
			}
			var name = cname + "=";
			var ca = document.cookie.split(';');
			//var valueList = [];
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i].trim();
				if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
			}
			return "";
		},
		setCookie: function (cname, cvalue, span, mainDomain) {
			if (cname && /[\u4e00-\u9fa5]/.test(cname)) {
				cname = encodeURIComponent(cname);
			}
			var d = new Date();
			d.setTime(d.getTime() + span);
			var expires = "expires=" + d.toGMTString();
			if (!/(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/.test(location.host) && mainDomain) {
				var domain = "; domain=." + location.host.split(".").slice(1).join(".") + ";path=/";
				document.cookie = cname + "=" + cvalue + "; " + expires + domain;
			} else {
				document.cookie = cname + "=" + cvalue + "; " + expires;
			}
		},
		getDevice: function () {
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i)) {
				return cifnewsCounter.config.KEY.WX;//微信浏览器
			}
			else if (ua.match(/cifnewsapp/i)) {
				return cifnewsCounter.config.KEY.APP;//App
			}
			else if (ua.match(/(iphone|ipod|android|ios|symbianos)/i)) {
				return cifnewsCounter.config.KEY.M;//手机浏览器
			}
			else {
				return cifnewsCounter.config.KEY.PC; //PC浏览器
			}
		},
		getuuid: function () {
			if (typeof crypto != 'undefined') {
				return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
					return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
				})
			} else {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
					var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			}
		},
		require: function (url, func) {
			if (url) {
				if (url.indexOf(".js") > 0) {
					var isExist = false;
					if (typeof func !== "function") {
						func = function () { };
					}
					for (var i = 0; i < document.scripts.length; i++) {
						var src = document.scripts[i].src.toLowerCase();
						if (src.indexOf(url.toLowerCase()) > -1) {
							isExist = true;
						}
					}
					if (!isExist) {
						var head = document.getElementsByTagName('head')[0],
							js = document.createElement('script');
						js.type = "text/javascript";
						js.src = url + "?v=" + cifnewsCounter.common.getVersion();
						head.appendChild(js);
						js.onload = function () {
							func();
						}
					} else {
						func();
					}
				}
			}
		},
		getVersion: function () {
			var Version = 1.0;
			for (var i = 0; i < document.scripts.length; i++) {
				var src = document.scripts[i].src.toLowerCase();
				if (src.indexOf("/c.js") > -1) {
					var ps = src.split('/c.js?');
					if (ps.length > 1) {
						ps = ps[1].split('&')
						for (var j = 0; j < ps.length; j++) {
							var pps = ps[j];
							if (pps.indexOf('v=') > -1) {
								var ppps = pps.split('=');
								if (ppps.length > 1) {
									Version = ppps[1];
								}
							}
						}
					}
				}
			}
			return Version;
		},
		getSource: function () {
			var result = "直接访问";
			if (document.referrer) {
				var aElement = document.createElement("a");
				aElement.href = document.referrer;
				if (aElement.host == "mp.weixin.qq.com") {
					result = "公众号";
				} else {
					var hostChar = aElement.host.split('.');
					if (hostChar.length > 2) {
						result = hostChar[hostChar.length - 2];
					} else if (hostChar.length > 1) {
						result = hostChar[hostChar.length - 1];
					}
					if (result == "cifnews") {
						var name = cifnewsCounter.common.getFirstPathName(aElement.pathname);
						result = cifnewsCounter.common.getSystem(name, "站内来源");
					} else if (result == "ccee") {
						result = "CCEE_Web";
					} else {
						result = aElement.host;
					}
				}
			}
			return result;
		},
		getFirstPathName: function (pathname) {
			if (!pathname) pathname = location.pathname;
			var list = pathname.split('/');
			var name = "";
			if (list.length > 1) {
				name = list[1].toLowerCase();
			}
			return name;
		},
		getSystem: function (name, defaultResult) {
			if (!defaultResult) defaultResult = "首页";
			var result = defaultResult;
			if (!name) name = cifnewsCounter.common.getFirstPathName();
			if (name) {
				if (cifnewsCounter.config.system[name]) {
					result = cifnewsCounter.config.system[name];
				} else result = name;
			}
			return result;
		}
	},
	fetchData: function (_postData) {//立即发送
		_postData = $.extend(cifnewsCounter.data(), _postData);
		if (!_postData.entity_id) {
			cifnewsCounter.debugMsg('id为空不发送');
			return false;
		}
		//Cookie未过期则无法再发送相同日志请求
		var key = _postData.entity_type + "_" + _postData.entity_id + "_" + _postData.action;
		if (cifnewsCounter.common.getCookie(key) == "") {
			cifnewsCounter._core._sendData(_postData);
			cifnewsCounter.debugMsg("api交互");
			cifnewsCounter.common.setCookie(key, 1, cifnewsCounter.config.cookieTimeOut);
		} else {
			cifnewsCounter.debugMsg(cifnewsCounter.config.cookieTimeOut + "毫秒内无法发送相同请求" + key);
		}
	},
	pushData: function (_postData) {//打包发送
		//Cookie未过期则无法再发送相同日志请求
		_postData = $.extend(cifnewsCounter.data(), _postData);
		if (!_postData.entity_id) {
			cifnewsCounter.debugMsg('id为空打包');
			return false;
		}
		var key = _postData.entity_type + "_" + _postData.entity_id + "_" + _postData.action;
		if (cifnewsCounter.common.getCookie(key) == "") {
			cifnewsCounter._core._cache.push(JSON.stringify(_postData));
			cifnewsCounter.debugMsg("api交互");
			cifnewsCounter.common.setCookie(key, 1, cifnewsCounter.config.cookieTimeOut);
		} else {
			cifnewsCounter.debugMsg(cifnewsCounter.config.cookieTimeOut + "毫秒内无法发送相同请求" + key);
		}
	},
	_core: {
		_cache: [],
		_popCache: function () {
			var tmp = [];
			var c = cifnewsCounter._core._cache;
			while (c.length > 0) {
				tmp.push(c.pop());
			}//另存数据 避免并发
			if (tmp.length > 0) {
				cifnewsCounter._core._cors(tmp);
			}
		},
		_sendData: function (data) {
			var datas = [];
			datas.push(JSON.stringify(data));
			cifnewsCounter._core._cors(datas);
		},
		_cors: function (datas, success) {//默认有Cors
			try {
				$.ajax({
					type: "POST",
					url: cifnewsCounter.config.apiUrl,
					data: { 'txt': datas, 'uid': cifnewsCounter.uid },
					success: function (json) {
						cifnewsCounter.debugMsg('success');
						if (success && typeof success == "function") success();
					},
					error: function () {
						cifnewsCounter._core._josnp(datas, success);
						cifnewsCounter.debugMsg('fail');
					}
				});
			}
			catch (ex) {
				cifnewsCounter.debugMsg(ex.message);
				cifnewsCounter._core._josnp(data, success);
				cifnewsCounter.errLog(ex, 3);
			}
		},
		_josnp: function (datas, success) {//不支持cors 则使用jsonp  长度有限制数据量大会造成部分 present/view丢失
			try {
				$.ajax({
					type: "GET",
					url: cifnewsCounter.config.apiUrl,
					dataType: "JSONP",
					data: { 'txt': JSON.stringify(datas), 'uid': cifnewsCounter.uid },
					success: function (json) {
						cifnewsCounter.debugMsg('success');
						if (success && typeof success == "function") success();
					},
					error: function () {
						cifnewsCounter.debugMsg('fail');
					}
				});
			}
			catch (ex) {
				cifnewsCounter.debugMsg(ex.message);
				cifnewsCounter._core._josnp(data);
				cifnewsCounter.errLog(ex, 3);
			}
		}
	},
	bind: function () {
		cifnewsCounter.openSession();
		var config = cifnewsCounter.config;
		if ($(config.viewTag).length != 0) {//view 一个页面一个
			var _postData = {
				entity_type: $(config.viewTag).attr(config.typeAttr),
				entity_id: $(config.viewTag).attr(config.idAttr),
				entity_title: $(config.viewTag).attr(config.titleAttr),
				medium: $(config.viewTag).attr(config.mediumAttr),
				action: $(config.viewTag).attr(config.actionAttr) || 'view',
				create_time: new Date().getTime()
			};
			try {
				cifnewsCounter.otherData($(config.viewTag).attr(config.otherAttr), _postData);
				cifnewsCounter.fetchData(_postData);
				cifnewsCounter.debugMsg(_postData);
			} catch (ex) { cifnewsCounter.errLog(ex, 1, _postData.action); }
		}

		if ($(config.clickTag).length > 0) {
			cifnewsCounter.dynamicevent(config.clickTag, "click");
		}
		if ($(config.presentTag).length > 0) {
			cifnewsCounter.dynamicevent(config.presentTag, "present", "inView", "push");
		}
		if ($(config.readContainer).length > 0) {
			cifnewsCounter.dynamicevent(config.readContainer, "read", "overView", "push");
		}

		$(config.presentTag + ',' + config.readContainer).on('checkView', function () {
			var a = $(this).offset().top;
			if (a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
				cifnewsCounter.debugMsg("div在可视范围");
				$(this).trigger('inView');
			}
			//文章内容页判断是否读完
			if ($(this).hasClass(config.readContainer.substring(1))) {
				if ($(window).scrollTop() + $(window).height() > $(this).height() + $(this).offset().top) {
					cifnewsCounter.debugMsg('div已经全部显示');
					$(this).trigger('overView');
				}
			}
			cifnewsCounter._core._popCache();//数据全部提交
		});
		var tId;
		$(window).scroll(function () {
			clearTimeout(tId);
			tId = setTimeout(function () {
				$(config.presentTag + ',' + config.readContainer).trigger('checkView');
			}, 500);
		});
		//页面记录
		var pageData = cifnewsCounter.data();
		pageData.entity_type = "page";
		pageData.entity_id = location.href;
		pageData.action = "page_view";
		delete pageData.var_url;
		cifnewsCounter._core._sendData(pageData);
	},
	//动态绑定,js加载DOM元素时使用
	dynamicbind: function ($this, array) {
		array = array || ["click", "inview"];
		var config = cifnewsCounter.config;
		if (typeof array != "undefined" && $.isArray(array)) {
			for (var l = array.length; l > 0; l--) {
				var tag = array[l - 1].toLowerCase();
				switch (tag) {
					case "click":
						cifnewsCounter.dynamicevent($this, "click");
						break;
					case "inview":
						cifnewsCounter.dynamicevent($this, "present", "inView", "push");
						$this.on('checkView', function () {
							var a = $(this).offset().top;
							if (a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
								cifnewsCounter.debugMsg("dbind div在可视范围");
								$(this).trigger('inView');
							}
							cifnewsCounter._core._popCache();//数据全部提交
						});
						break;
					case "overview":
						cifnewsCounter.dynamicevent($this, "read", "overView", "push");
						$this.on('checkView', function () {
							if ($(this).hasClass(config.readContainer.substring(1))) {
								if ($(window).scrollTop() + $(window).height() > $(this).height() + $(this).offset().top) {
									cifnewsCounter.debugMsg('dbind div已经全部显示');
									$(this).trigger('overView');
								}
							}
							cifnewsCounter._core._popCache();//数据全部提交
						});
						break;
				}
			}
		}
	},
	//动态绑定事件
	//acion,行为
	//event,默认为click
	//type,请求类型，值有fetch和push，默认为fetch
	dynamicevent: function ($this, action, event, type) {
		var config = cifnewsCounter.config;
		type = type || "fetch";
		event = event || "click";
		/****  旧版传的是jquery元素对象 兼容旧版 如果发现 可以改成新版 可直接传元素class   ***/
		if (typeof $this === 'string') {
			$(document).on(event, $this, function () {
				if (action == "present" && $(this).attr(config.typeAttr) == "article") {
					return;
				}
				var str_entity_id = $(this).attr(config.idAttr);
				var _postData = {
					entity_type: $(this).attr(config.typeAttr),
					entity_id: str_entity_id,
					entity_title: $(this).attr(config.titleAttr),
					medium: $(this).attr(config.mediumAttr),
					action: $(this).attr(config.actionAttr) || action
				};
				try {
					cifnewsCounter.otherData($(this).attr(config.otherAttr), _postData);
					switch (type) {
						case "fetch":
							cifnewsCounter.fetchData(_postData);
							break;
						case "push":
							cifnewsCounter.pushData(_postData);
							break;
					}
					cifnewsCounter.debugMsg(_postData);
				} catch (ex) { cifnewsCounter.errLog(ex, 1, _postData.action); }
			});
		}
		else {
			$this.on(event, function () {
				if (action == "present" && $(this).attr(config.typeAttr) == "article") {
					return;
				}
				var str_entity_id = $(this).attr(config.idAttr);
				var _postData = {
					entity_type: $(this).attr(config.typeAttr),
					entity_id: str_entity_id,
					entity_title: $(this).attr(config.titleAttr),
					medium: $(this).attr(config.mediumAttr),
					action: $(this).attr(config.actionAttr) || action
				};
				try {
					cifnewsCounter.otherData($(this).attr(config.otherAttr), _postData);
					switch (type) {
						case "fetch":
							cifnewsCounter.fetchData(_postData);
							break;
						case "push":
							cifnewsCounter.pushData(_postData);
							break;
					}
					cifnewsCounter.debugMsg(_postData);
				} catch (ex) { cifnewsCounter.errLog(ex, 1, _postData.action); }
			});
		}

	},
	//其他数据
	//格式为otherKey1=otherValue1;otherKey2=otherValue2
	otherData: function (otherData, postData) {
		if (otherData) {
			otherData = otherData.split(';');
			for (var i = 0; i < otherData.length; i++) {
				var params = otherData[i].split('=');
				if (params.length > 1) {
					var value = params[1];
					if (value) {
						postData["var_" + params[0]] = value;
					}
				}
			}
		}
	},
	debugMsg: function (msg) {
		if (msg && cifnewsCounter.config.debug) console.log(msg);
	},
	errLog: function (ex, level, action) {
		if (cifnewsCounter.logger) {
			cifnewsCounter.logger.push("data_type", "error");
			if (ex) {
				cifnewsCounter.logger.push("stack", ex.stack.toString());
				cifnewsCounter.logger.push("err_message", ex.message);
			}
			cifnewsCounter.logger.push("err_level", level);
			cifnewsCounter.logger.push("device_type", cifnewsCounter.device_type);
			cifnewsCounter.logger.push("create_time", new Date().getTime());
			if (action) cifnewsCounter.logger.push("err_action", action);
			cifnewsCounter.logger.push("user_agent", navigator.userAgent);
			cifnewsCounter.logger.push("url", location.href);
			cifnewsCounter.logger.push("user_id", (cifnewsCounter.uid || cifnewsCounter.guestId));
			cifnewsCounter.logger.push("page_system", cifnewsCounter.common.getSystem());
			cifnewsCounter.logger.logger();
		}
	},
	infoLog: function (msg) {
		if (cifnewsCounter.logger && msg) {
			cifnewsCounter.logger.push("data_type", "info");
			cifnewsCounter.logger.push("message", msg);
			cifnewsCounter.logger.push("device_type", cifnewsCounter.device_type);
			cifnewsCounter.logger.push("create_time", new Date().getTime());
			cifnewsCounter.logger.push("user_agent", navigator.userAgent);
			cifnewsCounter.logger.push("url", location.href);
			cifnewsCounter.logger.push("user_id", (cifnewsCounter.uid || cifnewsCounter.guestId));
			cifnewsCounter.logger.push("page_system", cifnewsCounter.common.getSystem());
			cifnewsCounter.logger.logger();
		}
	},
	config: {
		presentTag: '.fetch-present',//present
		clickTag: '.fetch-click',//click
		readContainer: '.fetch-read',//read
		viewTag: '.fetch-view',//view
		actionAttr: 'data-fetch-action',//自定义动作 默认 click为click、read为read、view为view、present为present 
		typeAttr: 'data-fetch-type',
		idAttr: 'data-fetch-id',
		titleAttr: 'data-fetch-title',//title
		mediumAttr: 'data-fetch-medium',//位置
		otherAttr: 'data-fetch-other',
		presentAttr: 'data-present',//控制是否收集
		apiUrl: location.protocol + '//api2.cifnews.com/tongji/api/fetch/ajax',
		userCookieKey: 'PassPort_Token',
		cookieTimeOut: 2 * 60 * 1000,//2分钟
		guestCookieKey: 'Guest_Token',
		debug: location.hash.indexOf("debug") > 0,
		//浏览器指纹key
		fingerKey: 'Finger_Token',
		//获取cookie接口地址
		cookieUrl: function () {
			var result = location.protocol + '//www.cifnews.com/tools/getcookie';
			if (cifnewsCounter.config.debug) {
				result = location.protocol + '//test.cifnews.com/tools/getcookie';
			} else if (cifnewsCounter.common.getDevice() != cifnewsCounter.config.KEY.PC) {
				result = location.protocol + '//m.cifnews.com/tools/getcookie';
			}
			return result;
		},
		//游客过期时间
		guestTimeOut: 365 * 24 * 60 * 60 * 1000,
		//首次打开过期时间
		openTimeOut: 24 * 60 * 60 * 1000,
		openKey: "Open_Session",
		KEY: {
			PC: "pc",
			M: "mweb",
			APP: "app",
			WX: "wechat"
		},
		preGuest: "guest_",
		system: {
			"yuke": "雨课",
			"article": "资讯",
			"ask": "问答",
			"theme": "专题",
			"live": "直播",
			"vc": "培训",
			"active": "活动",
			"enroll": "表单",
			"vote": "投票",
			"ccee": "CCEE_Web"
		}
	},
	data: function () {
		var _data = cifnewsCounter.commonData();
		_data.entity_type = "";
		_data.entity_id = "";
		_data.action = "";
		_data.entity_title = "";
		return _data;
	},
	//公共数据
	commonData: function () {
		var _data = {
			data_type: "event",
			var_url: location.href,
			var_referrer: document.referrer,
			device_type: cifnewsCounter.device_type,
			create_time: new Date().getTime(),
			var_finger: cifnewsCounter.finger,
			source: cifnewsCounter.common.getSource(),
			var_ad_blocking: typeof _hmt === "undefined" || _hmt instanceof Array,
			var_user_agent: navigator.userAgent
		};
		if (cifnewsCounter.guestId && cifnewsCounter.uid && cifnewsCounter.uid.indexOf(cifnewsCounter.config.preGuest) == -1) {
			_data.var_guestId = cifnewsCounter.guestId;
		}
		return _data;
	},
	openSession: function () {
		if (!cifnewsCounter.common.getCookie(cifnewsCounter.config.openKey)) {
			var _data = cifnewsCounter.commonData();
			_data.action = "open_session";
			var json = JSON.stringify(_data);
			cifnewsCounter._core._cors(json, function () {
				var now = new Date();
				var end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
				cifnewsCounter.common.setCookie(cifnewsCounter.config.openKey, new Date().getTime(), (end.getTime() - now.getTime()), 1);
			});
		}
	},
	device_type: "",
	uid: '',
	//浏览器指纹
	finger: '',
	//游客id
	guestId: '',
	fingerInit: function () {
		var _finger = localStorage.getItem(cifnewsCounter.config.fingerKey);
		if (_finger) {
			cifnewsCounter.finger = _finger;
		} else {
			cifnewsCounter.common.require("//static.cifnews.com/plug/fp.min.js", function () {
				if (typeof Fingerprint2 == "function") {
					new Fingerprint2().get(function (result, components) {
						cifnewsCounter.finger = result;
						localStorage.setItem(cifnewsCounter.config.fingerKey, result);
					});
				}
			});
		}
	},
	//日志记录器
	logger: null,
	//初始化日志记录器
	loggerInit: function () {
		function createHttpRequest() {
			if (window.XMLHttpRequest) { return new XMLHttpRequest(); } else if (window.ActiveXObject) { return new ActiveXObject("Microsoft.XMLHTTP"); }
		}
		function AliLogTracker(host, project, logstore) {
			this.uri_ = location.protocol + '//' + project + '.' + host + '/logstores/' + logstore + '/track?APIVersion=0.6.0';
			this.params_ = new Array();
			this.httpRequest_ = createHttpRequest();
		}
		AliLogTracker.prototype = {
			push: function (key, value) {
				if (!key || !value) {
					return;
				}
				this.params_.push(key);
				this.params_.push(value);
			},
			logger: function () {
				var url = this.uri_;
				var k = 0;
				while (this.params_.length > 0) {
					if (k % 2 == 0) {
						url += '&' + encodeURIComponent(this.params_.shift());
					} else {
						url += '=' + encodeURIComponent(this.params_.shift());
					}
					++k;
				}
				try {
					this.httpRequest_.open("GET", url, true);
					this.httpRequest_.send(null);
				} catch (ex) {
					if (window && window.console && typeof window.console.log === 'function') {
						console.log("Failed to log to ali log service because of this exception:\n" + ex);
						console.log("Failed log data:", url);
					}
				}

			}
		};
		cifnewsCounter.logger = new AliLogTracker("cn-hangzhou.log.aliyuncs.com", "cifnews", "web_fe");
	},
	setGuestUser: function () {
		var _guestFunc = function (visitor) {
			var _visitor = null;
			if (visitor) {
				_visitor = visitor;
			} else {
				_visitor = cifnewsCounter.common.getuuid();
			}
			if (_visitor.indexOf(cifnewsCounter.config.preGuest) != 0) {
				_visitor = cifnewsCounter.config.preGuest + _visitor;
			}
			cifnewsCounter.common.setCookie(cifnewsCounter.config.guestCookieKey, _visitor, cifnewsCounter.config.guestTimeOut);
			cifnewsCounter.uid = _visitor;
			cifnewsCounter.guestId = _visitor;
			cifnewsCounter.bind();
		};
		var _fetchGuest = function () {
			try {
				$.ajax({
					type: "GET",
					url: cifnewsCounter.config.cookieUrl(),
					dataType: "JSONP",
					data: { key: cifnewsCounter.config.guestCookieKey, set: true, expire: cifnewsCounter.config.guestTimeOut },
					success: function (json) {
						if (json.result_code == 1 && json.data) {
							_guestFunc(json.data);
						} else {
							_guestFunc();
						}
					},
					error: function () {
						_guestFunc();
					}
				});
			}
			catch (ex) {
				_guestFunc();
				cifnewsCounter.errLog(ex, 3);
			}
		}
		if (location.origin.indexOf("ccee.com") > 0) {
			try {
				$.ajax({
					type: "GET",
					url: cifnewsCounter.config.cookieUrl(),
					dataType: "JSONP",
					data: { key: cifnewsCounter.config.userCookieKey },
					success: function (json) {
						if (json.result_code == 1 && json.data) {
							if (json.data.length < 32) {
								cifnewsCounter.common.setCookie(cifnewsCounter.config.userCookieKey, json.data, cifnewsCounter.config.guestTimeOut);
								cifnewsCounter.uid = json.data;
								cifnewsCounter.bind();
							} else {
								_fetchGuest();
							}
						} else {
							_fetchGuest();
						}
					},
					error: function () {
						_fetchGuest();
					}
				});
			} catch (ex) {
				_fetchGuest();
				cifnewsCounter.errLog(ex, 3);
			}
		} else {
			_fetchGuest();
		}
	},
	init: function (config) {
		cifnewsCounter.fingerInit();
		if (config) {
			cifnewsCounter.config = $.extend(cifnewsCounter.config, config);
		}
		cifnewsCounter.device_type = cifnewsCounter.common.getDevice();
		var uid = cifnewsCounter.common.getCookie(cifnewsCounter.config.userCookieKey);
		if (uid) {
			cifnewsCounter.uid = uid;
			cifnewsCounter.guestId = cifnewsCounter.common.getCookie(cifnewsCounter.config.guestCookieKey);
			cifnewsCounter.bind();
		}
		else {
			if (cifnewsCounter.common.getDevice() == cifnewsCounter.config.KEY.APP) {
				cifnewsCounter.common.require("//static.cifnews.com/common/js/app.js", function () {
					try {
						app.addReady(function () {
							cifnewsApp.Config(JSON.stringify({
								Oauth: [
									"getUnionId"
								]
							}));
						});
						app.addComplete(function () {
							cifnewsCounter.uid = cifnewsApp.getUnionId();
							cifnewsCounter.device_type = "app";
							cifnewsCounter.bind();
						});
					} catch (ex) {
						cifnewsCounter.debugMsg(ex.message);
						cifnewsCounter.errLog(ex, 3);
					}
				});
			} else {//添加游客记录
				var _visitor = cifnewsCounter.common.getCookie(cifnewsCounter.config.guestCookieKey);
				if (!_visitor) {
					cifnewsCounter.setGuestUser();
				} else {
					if (_visitor.indexOf(cifnewsCounter.config.preGuest) != 0) {
						_visitor = cifnewsCounter.config.preGuest + _visitor;
						cifnewsCounter.common.setCookie(cifnewsCounter.config.guestCookieKey, _visitor, cifnewsCounter.config.guestTimeOut);
					}
					cifnewsCounter.uid = _visitor;
					cifnewsCounter.guestId = _visitor;
					cifnewsCounter.bind();
				}
			}
		}
	},
	changeConfig: function (config) {
		if (config) { cifnewsCounter.config = $.extend(cifnewsCounter.config, config); }
	}
}
$(document).ready(function () {
	cifnewsCounter.init();
});
cifnewsCounter.loggerInit();
window.onerror = function (msg, url, lineNo, columnNo, error) {
	if (!error) {
		error = new Error();
		error.message = msg;
		error.stack = url + ":" + lineNo;
	}
	cifnewsCounter.errLog(error, 2);
	return false;
};
window.onunload = function () {
	cifnewsCounter._core._popCache();//数据全部提交
}