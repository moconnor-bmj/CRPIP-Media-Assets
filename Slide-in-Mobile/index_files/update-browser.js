$(window).load(function (){
	updateBrowserPopUp('ad-update-browser');
});
function updateBrowserPopUp(globalNavDiv) {
	var messageHtml = '<div id="update-browser" class="bmj-cookie-noticebar-content"><span class="cookie-notice">'
			+ '<strong>Browser upgrade needed!</strong> '
			+ 'To get the best possible experience using our website we recommend that you upgrade to a newer version or choose another browser.'
			+ '</span><span class="hide-bar">&times;</span></div>';
	
	if(isUpdateBrowser()) {
		topBarPopUp(globalNavDiv, 'BMJ-update-browser', messageHtml, 'update-browser');
	}
}

function isUpdateBrowser() {
	return checkVersion(updateBrowserOptions);
}

// source: https://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
//Returns the version of a browser or a -1
function getBrowserVersion(userAgentRegExp){
	var rv = -1; // Return value assumes failure.
	var ua = navigator.userAgent;
	var re = new RegExp(userAgentRegExp);
	
	if (re.exec(ua) != null) {
	   rv = parseFloat(RegExp.$1);
	}
	
	return rv;
}

// source: https://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
function checkVersion(opt)
{
  var rv = false;
  var ver = -1
  
  for(i=0; i<opt.userAgentRegExp.length; i++) {
	  ver = getBrowserVersion(opt.userAgentRegExp[i]);
	  if(ver > -1) {
		  if(ver <= opt.version[i]) {
			  rv = true;
		  }
		  break;
	  }
  }
  
  return rv;
}