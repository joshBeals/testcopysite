var CookieConsent = {
	"closePopup": function () {
		this.fadeOut('dsgvo-widget__popup');
		this.fadeOut('dsgvo-widget__popup-bg');
		this.releaseScroll();
	},
	"initForm": function () {
		if (this.getCookie('performanceCookies') !== null) {
			document.getElementById('dsgvo-performance').checked = (this.getCookie('performanceCookies') === 'true');
			document.getElementById('dsgvo-functional').checked = (this.getCookie('functionalCookies') === 'true');
			document.getElementById('dsgvo-targeting').checked = (this.getCookie('targetingCookies') === 'true');
		} else {
			document.getElementById('dsgvo-performance').checked = false;
			document.getElementById('dsgvo-functional').checked = false;
			document.getElementById('dsgvo-targeting').checked = false;
		}
	},
	"showPopup": function () {
		this.initForm();
		this.fadeIn('dsgvo-widget__popup', 'block');
		document.getElementById('dsgvo-widget__popup-bg').style.display = 'block';
		this.captureScroll();
	},
	"closeNotice": function () {
		this.fadeOut('dsgvo-widget__popup-notice');
		this.fadeOut('dsgvo-widget__popup-bg');
		this.releaseScroll();
	},
	"showNotice": function () {
		this.initForm();
		document.getElementById('dsgvo-widget__popup-notice').style.display = 'block';
		document.getElementById('dsgvo-widget__popup-bg').style.display = 'block';
		this.captureScroll();
	},
	"allowPerformanceCookies": function () {
		return this.getCookie('performanceCookies') === 'true';
	},
	"allowFunctionalCookies": function () {
		return this.getCookie('functionalCookies') === 'true';
	},
	"allowTargetingCookies": function () {
		return this.getCookie('targetingCookies') === 'true';
	},
	"savePreferences": function () {
		//Save performance cookie settings
		var checkStatus = document.getElementById('dsgvo-performance').checked; //Gets the inverted value
		if (checkStatus) {
			this.setCookie('performanceCookies', true, 365);
		} else {
			this.setCookie('performanceCookies', false, 365);
		}

		//Save functional cookie settings
		var checkStatus = document.getElementById('dsgvo-functional').checked; //Gets the inverted value
		if (checkStatus) {
			this.setCookie('functionalCookies', true, 365);
		} else {
			this.setCookie('functionalCookies', false, 365);
		}

		//Save targeting cookie settings
		var checkStatus = document.getElementById('dsgvo-targeting').checked; //Gets the inverted value
		if (checkStatus) {
			this.setCookie('targetingCookies', true, 365);
		} else {
			this.setCookie('targetingCookies', false, 365);
		}

		this.sendData('save');

		//Close popup
		this.closePopup();
		this.closeNotice();
	},
	"savePreferencesAllowAll": function () {
		document.getElementById('dsgvo-performance').checked = true;
		document.getElementById('dsgvo-functional').checked = true;
		document.getElementById('dsgvo-targeting').checked = true;
		this.savePreferences();
	},
	"rejectCookies": function () {
		document.getElementById('dsgvo-performance').checked = false;
		document.getElementById('dsgvo-functional').checked = false;
		document.getElementById('dsgvo-targeting').checked = false;
		this.savePreferences();
	},
	"sendData": function (url) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState === 4 && xmlHttp.status == 200) {
				document.location.reload(true);
			}
		};
		xmlHttp.open("post", '/dsgvo-xhr/' + url);
		xmlHttp.send();
	},
	"setCookie": function (cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
	},
	"getCookie": function (cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return null;
	},
	"fadeOut": function (el) {
		el = document.getElementById(el);
		el.style.opacity = 1;
		(function fade() {
			if ((el.style.opacity -= .1) < 0) {
				el.style.display = "none";
			} else {
				requestAnimationFrame(fade);
			}
		})();
	},
	"fadeIn": function (el, display) {
		el = document.getElementById(el);
		el.style.opacity = 0;
		el.style.display = display || "block";
		(function fade() {
			var val = parseFloat(el.style.opacity);
			if (!((val += .1) > 1)) {
				el.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();
	},
	"captureScroll": function () {
		document.body.classList.add('dsgvo-widget__fixBody');
	},
	"releaseScroll": function () {
		document.body.classList.remove('dsgvo-widget__fixBody');
	}
};