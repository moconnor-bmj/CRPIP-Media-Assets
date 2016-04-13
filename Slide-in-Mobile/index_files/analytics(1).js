
// Google analytics tracker needs to be a globally-available variable for use
// in tracking external links.
var pageTracker = null;


function googleTrack(href) {
	
  if(pageTracker != null) {
	  pageTracker._trackPageview(href);
  }	  
}

function googleTrackAjaxLink(target) {
  googleTrack(jQuery(target).attr("href"));
}

function googleTrackScriptAction(action) {
  googleTrack(window.location.pathname + "/scriptaction" + action);
}

function googleTrackCarousel(image) {
	googleTrack(image);
}


function doGoogleAnalytics() {
  /*  this is the half of the google analytics thing that goes off to Google, so
      it might take some time. We load it via Ajax after the rest of the onload handler
      has kicked in.

      NOTE: this assumes you have already loaded the ga.js thingy somewhere.. normally
      via one of the sitemesh includes. */

  if (window._gat != null && window.googleTrackerId != null) {
    pageTracker = window._gat._getTracker(window.googleTrackerId);
    pageTracker._setDomainName(window.googleTrackerDomainName);
    pageTracker._setAllowLinker(true);
    pageTracker._initData();
    pageTracker._trackPageview();
  }

  // add trackers for some universal links:

  // login form:
  jQuery("form.quick-login").submit(function(ev) {
    googleTrack($(this).attr("action"));
  });

  // registration link and password reminder (My Account)
  var hrefsToTrack = "a.status-login-register-link,div.forgot a";

  // athens and shibboleth:
  hrefsToTrack += "," + "a.athens,a.shibboleth";

  // drug links:
  hrefsToTrack += "," + "a.druglink";

  // Track links via rosettes:
  hrefsToTrack += "," + "a.rosette";

  jQuery(hrefsToTrack).click(function(ev) {
    googleTrack($(this).attr("href"));
  });

  // External links:
  jQuery("a.web-link").click(function(ev) {
    googleTrack("/web-link/" + $(this).attr("href"));
  });
}
