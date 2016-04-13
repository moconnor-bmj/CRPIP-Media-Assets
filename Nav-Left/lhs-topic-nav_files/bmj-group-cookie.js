$(window).load(function (){
	bmjCookiePolicyPopUp('ad-leaderboard');
});
function bmjCookiePolicyPopUp(globalNavDiv) {
	
	var cookiePolicyHtml = '<div id="cookie-policy" class="bmj-cookie-noticebar-content"><span class="cookie-notice">'
			+ 'This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.'
			+ ' <a id="bmj-cookie-link" target="_blank" href="http://group.bmj.com/group/about/legal/privacy#cookies" title="Read our privacy policy">'
			+ 'Find out more here.</a></span><span class="hide-bar">&times;</span></div>';
	
	topBarPopUp(globalNavDiv, 'BMJ-cookie-policy', cookiePolicyHtml, 'cookie-policy');
}

function topBarPopUp(globalNavDiv, cookieName, userMessageHtml, divIdVal) {
	if (getBMJCookie(cookieName) != null) {
		if (getBMJCookie(cookieName) == 'open') {
			$('body').prepend(userMessageHtml);
			setBMJCookie(cookieName, 'open', '365');
		} else {
			setBMJCookie(cookieName, 'close', '365');
		}
	} else {
		$('div#'+globalNavDiv+':first').after(userMessageHtml);
		setBMJCookie(cookieName, 'open', '365');
	}
	
	$('#' + divIdVal + ',#' + divIdVal + ' .hide-bar').on('click', function() {
		$('div#' + divIdVal).animate({opacity: 0}, 1900, "easeInOutBounce");
		setTimeout(function() {
			$('div#' + divIdVal).hide();
		}, 1300);
		setBMJCookie(cookieName, 'close', '365');
		return true;
	});
	$('#' + divIdVal + ' #bmj-cookie-link').on('click', function() {
		$('div#' + divIdVal).animate({opacity: 0}, 1900, "easeInOutBounce");
		setTimeout(function() {
			$('div#' + divIdVal).hide();
		}, 1300);
		setBMJCookie(cookieName, 'close', '365');
		return true;
	});
}

function setBMJCookie(name, value, days) {	
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} 

	var holder = window.location.hostname.split('.');
	var l = holder.length;
	var crossDomain = holder[l - 2];

	document.cookie = name + "=" + value + expires + "; domain=." + crossDomain
			+ ".com;path=/";
}

function getBMJCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for ( var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function deleteBMJCookie(name) {
	setCookie(name, "", -1);
}