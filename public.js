$(function() {
	//$('#headerBox').load('./header.html', function() {
		// ========== 检查是否有用户
		//common.checkUser()
		// 监听滚动条

	//})
	//$('#footerBox').load('./footer.html')
	$('.noUser').show()
	$('.hasUser').show()

	listenScroll();
	mobileSlideBar();
})

function getUser() {

}

/**
 * 监听滚动条
 */
function listenScroll() {
	$(window).scroll(function() { //开始监听滚动条
		var topp = $(document).scrollTop();
		if (topp > 30) {
			$("#header").addClass("HeaderV2--fixed");
		} else {
			if ($("#header").hasClass('HeaderV2--fixed')) {
				$("#header").removeClass("HeaderV2--fixed");
			}
		}
	})
}

function mobileSlideBar() {
	$("#slideBar_btn").on("click", function() {
		$("#sidebar").addClass('active')
	})

	$("#closeBtn").on("click", function() {
		$("#sidebar").removeClass('active')
	})
}

// ==================================== 公共方法 ==================================== //
var common = {
	//字符串为空返回true,否则返回false
	"empty": function(str) {
		if (!isNaN(str)) {
			if (parseFloat(str) == 0) return true;
		}
		if (str == null || str == 0 || $.trim(str) == '' || typeof(str) == "undefined" || str == "undefined" ||
			str == false || str == "false")
			return true;
		return false;
	},

	/**
	 * 复制
	 * @param {String} dom 需要复制的dom
	 * @param {String} str 复制的内容
	 */
	"copy": function(dom, str) {
		var input = document.createElement('input');
		input.setAttribute('id', 'content');
		input.setAttribute('readonly', 'readonly');
		input.setAttribute('value', str);
		document.body.appendChild(input);

		$(dom).attr('data-clipboard-target', '#content');
		var clipboard = new ClipboardJS(dom);
		return new Promise((reslove, reject) => {
			clipboard.on('success', async (e) => {
				document.body.removeChild(input);
				$(dom).removeAttr('data-clipboard-target');
				reslove()
			});

			clipboard.on('error', async (e) => {
				document.body.removeChild(input);
				$(dom).removeAttr('data-clipboard-target');
				reject()
			});
		})
	},

	"versions": function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核 
			presto: u.indexOf('Presto') > -1, //opera内核 
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端 
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
			iPad: u.indexOf('iPad') > -1, //是否iPad 
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部 
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增） 
			qq: u.match(/\sQQ/i) == " qq" //是否QQ }; 
		}
	},

	/**
	 * 检查是否有用户
	 */
	"checkUser": function() {
		var username = common.getCookie('cpreusername')
		if (username != null && username != "") {
			$('.noUser').hide()
			$('.hasUser').show()
			$('.logUsername').text(username)
			return true
		} else {
			$('.hasUser').hide()
			$('.noUser').show()
			$('.logUsername').text('')
			return false
		}
	},

	/**
	 * 获取cookie
	 * @param {String} c_name cookie的key
	 */
	"getCookie": function(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=")
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1
				c_end = document.cookie.indexOf(";", c_start)
				if (c_end == -1) c_end = document.cookie.length
				return unescape(document.cookie.substring(c_start, c_end))
			}
		}
		return ""
	}
}
