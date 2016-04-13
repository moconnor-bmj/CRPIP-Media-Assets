/* global ctxPath, doGoogleAnalytics, googleTrack, googleTrackScriptAction, googleTrackAjaxLink */
/* global tinymce, bsn, searchTermList, category, subCategory, currentLocale */


///////////////////////////////////////////////////////////////////
// GENERAL-PURPOSE STUFF
//Fixed message properties file name not matched based on currentLocale
// and only load the message properties when the document is ready.
// This will avoid the AppsDynamic errors.
$(document).ready(function() {
	loadBundles();
});

function clickedThing(ev, type) {
  var $el = jQuery(ev.target);
  return $el.is(type) ? $el : $el.parents(type).first();
}


function getQueryParameter(name) {
  var results = location.search.match(RegExp("[?&]" + name.replace(/\[/, "\\[").replace(/\]/, "\\]") + "=([^&#]*)"));
  return results ? results[1] : "";
}


function getParamsString(params) {
  var paramString = "", i;
  for (i = 1; i < params.length; i++) {
    paramString = paramString + "/" + params[i];
  }
  return paramString;
}


function setUsingJavascript(e) {
  e.stopPropagation();
  var link = clickedThing(e, "a");
  var jsParam = "?js=true";
  var href = link.attr("href");
  if (href && href.indexOf("js=true") == -1) {
    if (href.indexOf("?") != -1) {
      jsParam = "&js=true";
    }
    jQuery(link).attr("href", href + jsParam);
  }

  return true;
}



function closePopupReflink(e) {
  jQuery(".popup").hide();
  return false;
}

function selectShare() {
  jQuery('#shareLinkUrl').select();
}

function positionPopup(popupIdentifier, position, height) {
  // get the width of the popup
  var width = jQuery(popupIdentifier).width();
  var setY = position.top + height;
  var setX = position.left - (width / 2.3);
  // get the width of client's browser
  var pageX = window.innerWidth;
  // Check for overlapping from right
  if ((setX + width) > pageX) {
    setX = pageX - width;
  }
  // Check for overlapping from left
  if (setX < 20) {
    setX = 20;
  }
  jQuery(popupIdentifier).css({
    top: setY,
    left: setX
  });
}


  //closing the popup when clicking on table outside popup window
function checkPopup(e) {
  if (jQuery(".popup").is(":visible")) {
    jQuery(".popup").hide();
  }
}


function enablePrint(imgHref) {
  jQuery(".print").attr({
    href: imgHref
  });
}


function hideEditForm(e) {
  e.stopPropagation();
  var eidtlink = clickedThing(e, "a");
  var itemId = eidtlink.attr("id");
  var displayForm = "#display-" + itemId;
  var editForm = "#edit-" + itemId;
  jQuery(displayForm).show();
  jQuery(editForm).hide();
  var parentForm = jQuery(eidtlink).closest("form");
  var parentFormId = "#" + parentForm.attr("id");
  jQuery(parentFormId)[0].reset();
  return true;
}


function showEditForm(e) {
  e.stopPropagation();
  var eidtlink = clickedThing(e, "div");
  var itemId = eidtlink.attr("id");
  var displayForm = "#display-" + itemId;
  var editForm = "#edit-" + itemId;
  jQuery(editForm).show();
  jQuery(displayForm).hide();
  return false;
}


function removeErrormsg(selector) {
  jQuery(selector).hide();
}


function validateField(fieldIdentifier, selector, fieldName) {
  var fieldId = jQuery(fieldIdentifier).attr("id");
  if (jQuery.trim(jQuery("#" + fieldId).val()) === "") {
    jQuery(selector).html("Please insert " + fieldName).show();
    return false;
  }
  return validateFieldLength(fieldIdentifier, selector, fieldName, 300);
}

function validateFieldLength(fieldIdentifier, selector, fieldName, fieldLength) {
	var fieldId = jQuery(fieldIdentifier).attr("id");
    if ((jQuery.trim(jQuery("#" + fieldId).val())).length > fieldLength) {
        jQuery(selector).html("Your " + fieldName + " is too long! It should be less than "	+ fieldLength + " characters").show();
        return false;
	}
    return true;
}


function deleteAlert(e) {
  var response = confirm("Are you sure you want to delete this item?");
  return response;
}


function formValidate(e) {
  e.stopPropagation();
  var eidtButton = clickedThing(e, "input");
  var itemId = eidtButton.attr("id");

  if ((jQuery("#notes-" + itemId).length > 0) &&
    (jQuery.trim(jQuery("#notes-" + itemId).val()) === "")) {
    return false;
  }

  if (jQuery.trim(jQuery("#dataKey-" + itemId).val()) === "" ||
    jQuery.trim(jQuery("#dataValue-" + itemId).val()) === "") {
    return false;
  }
  if ((jQuery.trim(jQuery("#dataKey-" + itemId).val())).length > 300 ||
    (jQuery.trim(jQuery("#dataValue-" + itemId).val())).length > 300) {
    return false;
  }
}


/* SPECIAL BEHAVIOUR FOR GENERIC MONOGRAPHS */

function initialiseTabContainers() {
  if (window.location.href.match(/mybp\.html/)) {
	  
    var tabContainers = jQuery('div.box-content > div'),
      cookie = $.cookies.get($.bp.tabCookieName),
      hash = window.location.hash,
      className = "";

    if (cookie && cookie != "undefined" && (hash == null || hash.length === 0)) {
      jQuery('body ul.tabNavigation a')
        .removeClass('selected firstOn secondOn thirdOn fourthOn fifthOn');
      
      jQuery('#' + cookie).addClass('selected');

      switch (cookie) {
      case "first":
        className = 'firstOn';
        tabContainers.hide().filter('#tab-search').show();
        break;
      case "second":
        className = 'secondOn';
        tabContainers.hide().filter('#tab-portfolio').show();
        break;
      case "third":
        className = 'thirdOn';
        tabContainers.hide().filter('#tab-guideline').show();
        break;
      case "fourth":
        className = 'fourthOn';
        tabContainers.hide().filter('#tab-patient-leaflet').show();
        break;
      case "fifth":
        className = 'fifthOn';
        tabContainers.hide().filter('#tab-drugsdb').show();
        break;
      case "sixth":
        tabContainers.hide().filter("#tab-notes").show();
        break;
      case "seventh":
        tabContainers.hide().filter("#tab-cme").show();
        break;
      default:
        break;
      }
    }
    else if (hash != null && hash.length > 0) {
      
      jQuery('body ul.tabNavigation a').removeClass('selected firstOn secondOn thirdOn fourthOn fifthOn sixthOn');
      switch (hash) {
      case "#tab-search":
        className = 'firstOn';
        jQuery('#first').addClass('selected');
        $.cookies.set($.bp.tabCookieName, "first", {
          path: "/"
        });
        break;
      case "#tab-portfolio":
        className = 'secondOn';
        jQuery('#second').addClass('selected');
        $.cookies.set($.bp.tabCookieName, "second", {
          path: "/"
        });
        break;
      case "#tab-guideline":
        className = 'thirdOn';
        jQuery('#third').addClass('selected');
        $.cookies.set($.bp.tabCookieName, "third", {
          path: "/"
        });
        break;
      case "#tab-patient-leaflet":
        className = 'fourthOn';
        jQuery('#fourth').addClass('selected');
        $.cookies.set($.bp.tabCookieName, "fourth", {
          path: "/"
        });
        break;
      case "#tab-drugsdb":
        className = 'fifthOn';
        jQuery('#fifth').addClass('selected');
        $.cookies.set($.bp.tabCookieName, "fifth", {
          path: "/"
        });
        break;
     case "#tab-notes":
        className = 'sixthOn';
        jQuery('#sixth').addClass('selected');
        $.cookies.set($.bp.tabCookieName, "sixth", {
          path: "/"
        });
        break;
      case "#tab-cme":
        jQuery('#seventh').addClass('selected');
        $.cookies.set($.bp.tabCookieName, "seventh", {
          path: "/"
        });
        break;
      default:
        break;
      }
      tabContainers.hide().filter(hash).show();
    }
    else {
      $.cookies.set($.bp.tabCookieName, "first", {
        path: "/"
      });
    }
    jQuery('body ul.tabNavigation a').not('a.selected').addClass(className);
    jQuery('ul.tabNavigation a').click(function() {
      tabContainers.hide();
      tabContainers.filter(this.hash).show();
      return false;
    });
  }
  else {
    var tabContainers = jQuery('div.tabs > div');
    tabContainers.hide().filter(':first').show();
    jQuery('ul.tabNavigation a').click(function() {
      tabContainers.hide();
      tabContainers.filter(this.hash).show();
      return false;
    });
  }
}

/* fixing the IE bug for external link icons */
function inlineLinks(optional) {
  //if (!document.getElementById || !document.createTextNode) {return false;}
  var linkPic = ctxPath + '/images/icon-web-link.gif';
  var beforeLink = 1;
  var links = jQuery("a.web-link");
  if (optional) {
    var links = jQuery(optional + " a.web-link");
  }
  for (var i = 0; i < links.length; i++) {
    var newimg = document.createElement('span');
    newimg.setAttribute('class', 'ext-link');
    links[i].appendChild(newimg);
  }
  jQuery('span.ext-link').text("(external link)");
}


/**
 * Sets the initial state of the notes view.
 */
function initNotesEditView() {
  // Hide the add notes form - only if we are not
  // displaying validation error from previous submit
  var displayingError = getQueryParameter("errorMsg");
  var noteId = getQueryParameter("note");
  if (displayingError) {
    jQuery("#add-notes-button").hide();
    jQuery("div[id*='display-']").show();
    if (noteId) // Editing failed
    {
      jQuery("#display-" + noteId).hide();
      jQuery("#edit-" + noteId).show();
      jQuery("#add-notes-form").hide();
    }
    else // Adding failed
    {
      jQuery("#add-notes-form").show();
    }
  }
  else {
    jQuery("#add-notes-button").show();
    jQuery("div[id*='display-']").show();
  }
}


function showHideAuthor() {
  if ($(this).is(':checkbox')) {
    // Show hide the author box depending on whether the checkbox is clicked
    $("#mybp-edit-note-author-div").toggle($(this).attr('checked'));
  }
  else {
    // Show/hide the author box depending on which edit cancel button is clicked
    var myClass = $(this).attr("class");

    if ($('#mybp-edit-note-institutional-item').attr('value') == "on"){
      $("#mybp-edit-note-author-div").show();
    }
    if (myClass.indexOf("pers-notes-edit-cancel") >= 0) {
      $("#mybp-edit-note-author-div").hide();
    }
    else if (myClass.indexOf("inst-notes-edit-cancel") >= 0) {
      $("#mybp-edit-note-author-div").show();
    }
  }
}


///////////////////////////////////////////////////////////////////
// SEARCH STUFF

function populateElement(selector, defaultSelector) {
  var defvalue = jQuery(defaultSelector).val();
  jQuery(selector).val(defvalue);
}


function clearSearch(selector, defaultVal, alertVal) {
  jQuery(selector).css({
    color: "#777777"
  });
  var searchBox = jQuery.trim(jQuery(selector).val());
  if (searchBox == defaultVal || searchBox == jQuery.trim(jQuery(alertVal).val())) {
    jQuery(selector).val("");
  }
}


function showSearch(selector, defaultSelector) {
  var defvalue = jQuery(defaultSelector).val();
  if (jQuery.trim(jQuery(selector).val()) === "") {
    jQuery(selector).val(defvalue);
  }
}


function liveSearchSubmit(formIdentifier, defaultVal, alertVal) {
  var searchTerm = jQuery.trim(jQuery("#" + formIdentifier + " .text").fieldValue()[0]);

  if (searchTerm === "" || searchTerm == defaultVal || searchTerm == jQuery.trim(jQuery(alertVal).val())) {
    jQuery("#" + formIdentifier + " .text").css({
      color: "#CC0000"
    });
    jQuery("#" + formIdentifier + " .text").attr("value", jQuery.trim(jQuery(alertVal).val()));
    //if the value of the languageCode is empty add the locale's default language code 
    return false;
  }
  else{
	  if(formIdentifier==='searchform'){
		  if($('.autoDetectDropdown').val()===''){
			  $('.autoDetectDropdown').val($('#languageCodeFromLocale').val());
		  }
	  }
  }
  
}


///////////////////////////////////////////////////////////////////
// SEARCH/BROWSE STUFF



function openBrowseBox(e) {
  checkPopup();

  // Set current tab
  jQuery(".tabNav li a").removeClass("current");
  jQuery(".tabNav .tab-browse a").addClass("current");

  // Hide search/symptom div
  jQuery("#search-options").hide();

  // Now load the browse contents
  if (jQuery("#browser").length === 0) {
    $("#search-options")
      .after("<div class='browser-container' id='browser'><div class='row-fluid'><div class='span12'>" +
             "<span class='loading'>" + $.i18n.prop('related.loading.message') + "</span></div></div></div>");

    loadBrowseBoxFromLink(clickedThing(e, "a"));
  }
  else {
    jQuery("#browser").show();
  }

  resetCatListScrollTop();

  googleTrackScriptAction("/browse-box-opened");
  return false;
}


function closeBrowseBox() {
  checkPopup();
  jQuery("#browser").hide();

  googleTrackScriptAction("/browse-box-closed");
  return false;
}


// WITHIN THE BROWSE BOX:

// position of category list scroll box:
var catListScrollTop = 0;


function resetCatListScrollTop() {
  jQuery("#browser #categories").scrollTop(catListScrollTop);
}


function loadBrowseBoxFromLink(target) {
  $("#browser").load($(target).attr("href"), { ajax: true }, resetCatListScrollTop);
  googleTrackAjaxLink(target);
  return false;
}


function browseLinkClicked(e) {
  var target = clickedThing(e, "a");
  catListScrollTop = jQuery("#browser #categories").scrollTop();
  ga('send', 'event', 'Navigation', $(target).attr('title'), window.location.pathname );
  loadBrowseBoxFromLink(target);
  return false;
}
/*

function buttonClicked(e) {
	  var target = clickedThing(e, "button");

	  if ($(target).attr("id") == 'content-search-button' )
	  {
	     ga('send', 'event', 'Navigation', $(target).attr('title'), window.location.pathname );
	  }
	  return false;
	}
	*/

///////////////////////////////////////////////////////////////////
// LANGUAGE BAR STUFF

function toggleLanguageMenu(e) {
  var dropDownDiv = jQuery('#language-drop-down');
  var languageLink = jQuery('.language-select-link');
  positionLanguageDropdown(dropDownDiv, languageLink.offset());
  dropDownDiv.toggle();

  if (dropDownDiv.is(':visible')) {
    // add close click to the whole document - click anywhere closes the div:
    jQuery(document).bind('click', closeDropDown);
  }
  else {
    jQuery(document).unbind('click', closeDropDown);
  }

  return false;
}

function closeDropDown(e) {
  var target = jQuery(e.target);
  if (!target.is('#language-drop-down') && !target.parents().is('#language-drop-down')) {
    toggleLanguageMenu();
  }
}

function changeToHoverImage(e) {
  var img = clickedThing(e, "img");
  var imgurl = img.attr("src");
  img.attr("src", imgurl.replace("-default", "-hover"));
}


function changeToDefaultImage(e) {
  var img = clickedThing(e, "img");
  var imgurl = img.attr("src");
  img.attr("src", imgurl.replace("-hover", "-default"));
}


function positionLanguageDropdown(languageDropdown, position) {
  var setY = position.top + jQuery(".language-select-link").height();
  var setX = position.left;
  jQuery(languageDropdown).css({
    top: setY,
    left: setX
  });
}


// ----------------------------------------------------------------------------


function doBMJTracker() {
  var imageUrl = "http://tracker.bmj.com/tracker/trk/test-me.png?" +
    "t=" + document.title +
    "&u=" + encodeURIComponent(location.href) +
    "&ref=" + document.referrer;
  jQuery("#bmj-tr-image").attr("src", imageUrl);
}


function doSearchHighlights() {
  var $content = $("#content");

  // first, are we coming from the search page?
  if (document.referrer.match("/search.html") && location.href.match(/\/(evidence|monograph)/)) {
    if (typeof searchTermList  !== "undefined" && searchTermList !== null) {
      $.each(searchTermList, function(i, term) {
        if (term.length > 0) {
          // we pass the DOM object for this content DIV tag
          jQuery.highlight($content.get(0), term.toUpperCase());
        }
      });
    }
  }
}

function performAutoPopup() {
  var button = getQueryParameter("auto-popup");
  if (button) {
    jQuery("#" + button).click();
  }
}

function performAutoClick() {
  var button = getQueryParameter("auto-click"), addr;
  if (button) {
    addr = jQuery("#" + button).attr('href');
    window.location = addr;
  }
}

function showSubMenu(menuId, headingId) {
  var menuId = "#" + menuId;
  var menuHeadingId = "#" + headingId;
  if (jQuery(menuId).css('display') == 'none') {
    jQuery(menuId).css({
      'display': 'block'
    });
    jQuery(menuHeadingId).addClass('on');
  }
  else {
    jQuery(menuId).css({
      'display': 'none'
    });
    jQuery(menuHeadingId).removeClass('on');
  }
  return false;
}

function setLocaleFormValue(localeCodeValue) {
  jQuery("#locale-value").attr('value', localeCodeValue);
  jQuery("#locale-form").submit();

}

function setInputFormValue(searchAliasValue, searchAliasName) {
  if (jQuery("#menu-heading").attr('innerHTML') == 'Search All') {
    var currentSubMenu = jQuery("#search-menu").attr('innerHTML');
    var subMenuReplace1 = currentSubMenu.replace("setInputFormValue('" + searchAliasValue + "', '" + searchAliasName + "');", "setInputFormValue('', 'Search All');");
    var subMenuReplace2 = subMenuReplace1.replace("title=\"" + searchAliasName + "\"", "title=\"Search Entire Site\"");
    var subMenuReplace3 = subMenuReplace2.replace(searchAliasName, "Search All");
    jQuery("#search-menu").attr('innerHTML', subMenuReplace3);
  }
  else {
    var currentTempName = jQuery("#menu-heading").attr('innerHTML');
    var currentTempValue = jQuery("#aliasHandle").attr('value');
    var currentSubMenu = jQuery("#search-menu").attr('innerHTML');
    var subMenuReplace1 = currentSubMenu.replace("setInputFormValue('', 'Search All');", "setInputFormValue('" + currentTempValue + "', '" + currentTempName + "');");
    var subMenuReplace2 = subMenuReplace1.replace("title=\"Search Entire Site\"", "title=\"" + currentTempName + "\"");

    var subMenuReplace3 = subMenuReplace2.replace("Search All", currentTempName);
    var subMenuReplace4 = subMenuReplace3.replace("setInputFormValue('" + searchAliasValue + "', '" + searchAliasName + "');", "setInputFormValue('', 'Search All');");
    var subMenuReplace5 = subMenuReplace4.replace("title=\"" + searchAliasName + "\"", "title=\"Search Entire Site\"");
    var subMenuReplace6 = subMenuReplace5.replace(searchAliasName, "Search All");

    jQuery("#search-menu").attr('innerHTML', subMenuReplace6);
  }
  jQuery("#menu-heading").attr('innerHTML', searchAliasName);
  jQuery("#aliasHandle").attr('value', searchAliasValue);
  return false;

}


function enableSearchAutoComplete() {
	var hostname = location.hostname;
	var charLen = 3;
	if(hostname.indexOf('china') > -1)
	{
		charLen = 1;
	}
	var bsnAsOptions = {
			script: ctxPath + "/titleAutoComplete.html?ajax=true&",
			varname: "searchableText",
			minchars: charLen,
			cache: true,
			json: true,
			shownoresults: false,
			callback: autoSuggestSelect,
			timeout: 25000 // length of time before it goes away
	};
	var bsnSearch = new bsn.AutoSuggest("search", bsnAsOptions);
	var bsnSearchCopy = new bsn.AutoSuggest("searchCopy", bsnAsOptions);
	jQuery("#search").bind('input propertychange', function(event) {
		return bsnSearch.onKeyUp(event);
	});
	jQuery("#searchCopy").bind('input propertychange', function(event) {
		return bsnSearchCopy.onKeyUp(event);
	});
}


function autoSuggestSelect(selected) {
  var params = selected.info.split(';'),
    type = params[0],
    id = params[1];

  if (type == 'Monograph') { // Navigate to the monograph page
    window.location.href = ctxPath + "/monograph/" + id + ".html";
  }
  else { // execute search
    jQuery("#content-search-button").click();
  }
  return false;
}


// Allows the preselection of tab based on the selected category
function preselectTab() {

  if (category) {
    var selectTab = "first"; // Default tab
    if (category == "patientleaflet") {
      selectTab = "second";
    }
    else if (category == "locale") {
      selectTab = "third";
    }
    else if (category == "sidebarlink") {
      selectTab = "fourth";
    }
    else if (category == "drugdb") {
      selectTab = "fifth";
    }
    else if (category == "annotation") {
      selectTab = "sixth";
    }
    else if (category == "cme") {
      selectTab = "seventh";
    }
    jQuery("#" + selectTab).click();
  }
}

function preselectSubTab() {
  if (subCategory) {
    var selectTab = "inner-first"; // Default tab
    if (subCategory == "personal") {
      selectTab = "inner-second";
    }
    jQuery("#" + selectTab).click();
  }
}


function initNotesEditPopup() {
  var triggers = jQuery(".modalInput").overlay({
    // some mask tweaks suitable for modal dialogs
    mask: {
      color: '#000000',
      loadSpeed: 200
    },
    closeOnClick: true,
    onLoad: function(event) {
      tinymce.editors[0].setContent(this.getTrigger().parents('.control').parent().find('.note').children('div').html());
      //tinymce.activeEditor.setContent(this.getTrigger().parents('.control').parent().find('.note').children('div').html());
    }

  });
}


function positionLcDrugCategoryList() {
  var lcDrugLink = jQuery("#tools ul.quick-links li#lexicomp a");
  var lcDrugLinkHref = lcDrugLink.attr("href");
  var lcDrugLinkClass = lcDrugLink.attr("class");
  if (lcDrugLinkHref && lcDrugLinkClass) {
    var lcDrugCatDiv = jQuery("#categories");
    var activeCatLink = jQuery("#categories ul li a.active");
    if (lcDrugCatDiv.length > 0 && activeCatLink.length > 0) {
      var offsetTopForCat = lcDrugCatDiv.offset().top;
      var offsetForALink = activeCatLink.offset();
      var offsetTopForALink = offsetForALink.top;
      lcDrugCatDiv.scrollTop((offsetTopForALink - offsetTopForCat));
    }
  }
}


function prtflo_click() {
  var u = location.href,
    t = document.title,
    h = "portfolio.bmj.com";
  var obj = document.getElementById("addToPortfolio");
  if (obj !== null) {
    t = obj.value;
  }
  var objUrl = document.getElementById("addUrlToPortfolio");
  if (objUrl !== null) {
    u = objUrl.href;
  }
  var objHost = document.getElementById("portfolioHost");
  if (objHost !== null && objHost.value !== '') {
    h = objHost.value;
  }
  var windowFeatures = "height=500,width=790,status=0,left=" + parseInt((screen.availWidth / 2) - 310, 10) + ",top=50,scrollbars=yes";
  window.open("http://" + h + "/portfolio/v2/add-to-portfolio.html?t=" + encodeURIComponent(t) + "&u=" + encodeURIComponent(u), "sharer", windowFeatures);
  return false;
}


function prtflo_later_click(u) {
  var t = document.title,
    h = "portfolio.bmj.com",
    obj = document.getElementById("addToPortfolio");

  if (obj !== null) {
    t = obj.value + " - related content";
  }
  var objHost = document.getElementById("portfolioHost");
  if (objHost != null && objHost.value !== '') {
    h = objHost.value;
  }
  var windowFeatures = "height=500,width=790,status=0,left=" + parseInt((screen.availWidth / 2) - 310, 10) + ",top=50,scrollbars=yes";
  window.open("http://" + h + "/portfolio/v2/add-to-portfolio.html?tagText=learning%20need&t=" + encodeURIComponent(t) + "&u=" + encodeURIComponent(u), "sharer", windowFeatures);
  return false;
}


/**
 * Initiales drug links
 */
function initDrugLinks() {
  // Iterate through all treatment page drug links
  jQuery('.druglink, .druglink-search').each(function() {
    // Get the component id
    var compId = jQuery(this).attr("id");
    //alert(compId);
    var drugLink = jQuery(this).attr("href");

    // Only provide choice if there isnt a default
    // drug datbase
    if (drugLink.indexOf("dd=") == -1) {
      jQuery(this)
        .attr("href", "#drug-link-content-" + compId);

      jQuery("#drug-link-content-" + compId)
        .find('#bnf-option')
          .attr("href", drugLink + "&dd=BNF")
          .end()
        .find('#martindale-option')
          .attr("href", drugLink + "&dd=MARTINDALE")
          .end()
        .find('#micromedex-option')
          .attr("href", drugLink + "&dd=MICROMEDEX")
          .end()
        .find('#ashp-option')
          .attr("href", drugLink + "&dd=ASHP");
    }
  });

  var drugPopup = false,
    drugSearchPopup = false,
    drugShowHide = false;

  jQuery(".druglink-search").hover(function(event) {
    event.stopPropagation();
    var compId = jQuery(this).attr("id");
    $('#'+compId).popover({
      placement : 'bottom',
      title : 'Choose your drug database',
      html: 'true',
      content : jQuery('#drug-link-content-'+compId).html().concat("<a class='popover-close'>&#215;</a>")
    });
    
    $('.popover-close').click(function(e){
    	$('#' + compId).popover('hide');
    });

  });


  $('.drug-information-popup-link').click(function () {
    return false;
  });

  jQuery('a.messagepop-close').click(function(event) {
    drugPopup = !drugPopup;
    drugSearchPopup = !drugSearchPopup;
    jQuery(event.target).parent('.messagepop').hide();
    return false;
  });

  jQuery('a.popover-close').on('click', function(event) {
    drugShowHide = !drugShowHide;
    jQuery(".popover").slideFadeToggle();
    return false;
  });

  $('#drug-information-popup-link').popover({
    placement : 'bottom',
    title : 'Choose your formulary:',
    html: 'true',
    content : jQuery("#drug-popover-content").html()
  });

  $('#drug-information-popup-link').click(function () {
    return false;
  });

  jQuery('input.drug-pref').click(function(e) {
    e.stopPropagation();
    var option = clickedThing(e, "input");
    jQuery("#drug-pref-form #dataValue").val(option.val());
    jQuery("#drug-pref-form").submit();
  });

  jQuery('#remove-drug-pref').click(function(e) {
    e.stopPropagation();
    jQuery("#drug-pref-form")
      .attr("action", "/best-practice/mybp/mybpDelete.html")
      .submit();
  });

  jQuery(".druglink").click(function(event) {
    var $el = $(this),
      drugLink = $el.attr("href");

    event.stopPropagation();
    jQuery('.messagepop').hide();
    drugPopup = !drugPopup;

    if (drugLink.indexOf("dd=") > 0) {
      return true;
    }
    else {
      $(this)
        .parents('.treatment-box')
          .find('#drug-link-content-' + $el.attr('id'))
            .toggle(drugPopup);
      return false;
    }
  });
}


// ----------------------------------------------------------------------------

function popupReflink(e) {
  e.stopPropagation();
  var _class = jQuery(e.target).attr('class');
  if (typeof _class !== "undefined" && _class.match(/portfolio/)) {
    return false;
  }
  var defaultPopupClass = "popup-reference";
  var evidenceScoreClass = "popup-evidencescore";
  var shareClass = "popup-share";
  var learningClass = "popup-learning";
  var imageClass = "popup-image";
  var niceGuidelineClass = "popup-niceguideline";

  var reflink = clickedThing(e, "a");
  var topicId = jQuery(".monograph-title").attr("id").replace(/monograph-/, "");
  var basePath = ctxPath + "/monograph/" + topicId + "/";
  // Parse the id attribute
  var linkId = reflink.attr("id");
  var params = linkId.split(/\s*_\s*/);
  var popupType = params[0].replace(/popuplink-/, "");
  var paramsString = getParamsString(params);
  var pathEnd = paramsString + ".html?ajax=true";
  var printEnd = paramsString + ".html";
  // Setup popup style class

  // first remove all existing classes:
  jQuery(".popup").removeClass(defaultPopupClass).removeClass(imageClass).removeClass(evidenceScoreClass).removeClass(shareClass).removeClass(learningClass).removeClass(niceGuidelineClass);

  if (popupType == 'ref-score') {
    jQuery(".popup").addClass(evidenceScoreClass);
  }
  else if (popupType == 'img-bp') {
    jQuery(".popup").addClass(imageClass);
  }
  else if (popupType == 'share') {
    jQuery(".popup").addClass(shareClass);
  }
  else if (popupType == 'learning') {
    jQuery(".popup").addClass(learningClass);
  }
  else if (popupType == 'nice-guideline') {
    jQuery(".popup").addClass(niceGuidelineClass);
  }
  else {
    jQuery(".popup").addClass(defaultPopupClass);
  }

  var pth;

  if ((popupType == 'glos-sr') || (popupType == 'learning') || (popupType == 'share') || (popupType == 'nice-guideline')) {
    if (reflink.attr("href").indexOf("?") == -1) {
      pth = reflink.attr("href") + "?ajax=true";
    }
    else {
      pth = reflink.attr("href") + "&ajax=true";
    }
  }

  if (popupType == 'ref-bp') {
    pth = basePath + "resources/reference/bp" + pathEnd;
  }
  if (popupType == 'img-bp') {
    pth = basePath + "resources/image/bp" + pathEnd;
    var printUrl = basePath + "resources/image/bp" + printEnd;
  }

  if (popupType == 'ref-score') {
    pth = basePath + "treatment/evidence/scorepopup" + pathEnd;
  }
  if (popupType == 'ref-sr') {
    pth = reflink.attr("href").replace(/references.*$/, "reference" + pathEnd);
  }

  var popId = "pop_" + linkId, popupIdentifier = "#" + popId;

  // does this already exist? If so, just hide it:
  if (jQuery(popupIdentifier).is(":visible")) {
    jQuery(popupIdentifier).hide();
  }
  else {
    // hide other popup:
    jQuery(".popup").hide();
    jQuery(".popup").attr({
      id: popId
    });
    //positioning popup
    positionPopup(popupIdentifier, reflink.offset(), reflink.height());
    if (popupType == "diff-comment") {
      var contentDivIdentifier = "#popup-content_" + params[1];
      var closeButtonIdentifier = "#close_" + params[1];
      jQuery(closeButtonIdentifier).html("<a class='close'>" + $.i18n.prop('close') + "</a>");
      jQuery(popupIdentifier).html(jQuery(contentDivIdentifier).html()).show();
      jQuery(".close").click(closePopupReflink);
      jQuery(popupIdentifier).draggable();
      googleTrackScriptAction("/more");
    }
    else {
      jQuery(popupIdentifier).html('<span class="loading">' + $.i18n.prop('related.loading.message') + '</span>').show();
      jQuery(popupIdentifier).load(pth, null, function() {

        inlineLinks('.popup');
        if (popupType == 'img-bp') {
          enablePrint(printUrl);
        }
        if (popupType == 'glos-sr' || popupType == 'img-bp' || popupType == 'learning' || popupType == 'share') {
          jQuery(".button").show();
        }
        jQuery(".close").click(closePopupReflink);
        jQuery('#shareLinkUrl').click(selectShare);
        jQuery(this).draggable();
      });

      googleTrack(pth);
    }
  }

  return false;
}


function loadBundles() {
  var localeVar = getQueryParameter("locale") || currentLocale || '';

  localeVar = localeVar.replace(/_([a-z]+)$/, function(m, l) {
    return '_' + l.toUpperCase();
  });

  $.i18n.properties({
    name: "messages",
    path: ctxPath + "/resources/",
    mode: "map",
    language: localeVar,
    callback: function() {
    }
  });
}


// ----------------------------------------------------------------------------
// Page initialisation code

$.bp = {
  tabCookieName: "my-bp-tab-cookie"
};


$.fn.extend({

  slideFadeToggle: function(easing, callback) {
    return this.animate({
      opacity: 'toggle',
      height: 'toggle'
    }, "fast", easing, callback);
  }

});


jQuery(function() {
  populateElement("#groupSearchGadget","#defaultTextAll");
  populateElement("#search","#defaultText");

  enableSearchAutoComplete();

  $(".ajax-browser")
    .click(openBrowseBox);

  $("#browser").on("click", ".ajax", browseLinkClicked);

  $("a[data-toggle='tab'][data-target='#browse-tab']")
    .on("shown", function (ev) {
      if ($("#browser .loading").length > 0) {
        loadBrowseBoxFromLink(this);
      }
    });

  jQuery(".print").show().click(function(ev) {
    window.print();
  });

  //monograph functions
  initialiseTabContainers();

  jQuery(".reflink").click(popupReflink);
  jQuery("table, dl").click(checkPopup);


  $(".expandable")
  .expandable({
    expanded_test: "> *.expanded:first-child",
    create: function(event, data) {
      if (typeof data.widget !== "undefined" && data.widget.content.find('.update').length > 0) {
        data.widget.content.find('.update').hide();
      }
    }
  })
  .on("expandablechanged", function(ev, data) {
    if (data.widget.header.parents('.update').length === 1) {
      data.widget.content
        .css("height", data.expanded ? "auto" : "0px")
        .toggleClass('in', data.expanded);
    }

    if (data.widget.content.find('.update').length > 0) {
      data.widget.content
        .css("height", data.expanded ? "auto" : "0px")
        .find('.update')
          .toggle(data.expanded);
    }

    var target = "/expandable/toggle/" + $.trim(data.widget.header.text());
    googleTrackScriptAction(target);
  });


  // This is to add text("show all") and also the right styles to <span> when javascript enabled
  $("span.showall")
  .addClass("expand-all")
  .text($.i18n.prop("text.showall"))
  .on("click", function(ev) {
    var $el = $(this),
      show = $el.hasClass("expand-all");

    $el
      .toggleClass("expand-all collapse-all")
      .text($.i18n.prop(show ? "text.hideall" : "text.showall"))
      .closest(".expandable-section")
        .find(".expandable")
          .expandable("expanded", show, true);

    if (show && $el.closest(".expandable-section .update").length > 0) {
      $el.closest(".expandable-section .update")
        .show()
        .find(".collapse")
          .addClass('in')
          .attr('style','height:auto;')

      $el.closest(".expandable-section .update-category").attr('style', 'height:auto;').addClass('in');
    }

    if (!show && $el.closest(".expandable-section .update").length > 0) {
      $el.closest(".expandable-section .update")
        .hide()
        .find(".expand")
          .removeClass('in')
          .end()
        .find(".collapse")
          .attr('style', 'height:0px;');

      $el.closest(".expandable-section .update-category").attr('style','height:0px;').removeClass('in');
    }

    googleTrackScriptAction("/expandable/" + show ? "showall" : "closeall");

    return false;
  });

  inlineLinks();

  jQuery("a.delete-nojs").removeClass("delete-nojs").addClass("delete");


  jQuery(".edit-button").click(showEditForm);
  jQuery(".cancel").click(hideEditForm);

  jQuery(".remove .delete").click(deleteAlert);

  jQuery(".frmedit").click(formValidate);

  jQuery(".language-select-link").click(toggleLanguageMenu);
  jQuery(".language-image")
    .on("mouseenter", changeToHoverImage)
    .on("mouseleave", changeToDefaultImage);

  doSearchHighlights();

  // call google analytics guff:
  doGoogleAnalytics();

  // Set tooltips
  $('.jstooltip').tooltip({
    html: true
  });

  jQuery(".learning").click(setUsingJavascript);

  performAutoPopup();

  initDrugLinks();

  initNotesEditView();
  initNotesEditPopup();

  $("#add-notes-button").click(function(ev) {
    $(this).hide();
    $("#add-notes-form").show();
    window.scrollTo(0, $("#page-tools").offset().top);
  });

  $("#cancel-notes-button").click(function(ev) {
    $("#add-notes-button").show();
    $("#add-notes-form").hide();
    return false;
  });

  jQuery('#mybp-edit-note-institutional-item').change(showHideAuthor);
  jQuery('.inst-notes-edit-cancel, .pers-notes-edit-cancel').click(showHideAuthor);

  positionLcDrugCategoryList();

  //doGoogleTranslation();

  doBMJTracker();

  var _hash, target_top;

  /*
   * Expands the expandable section based on the anchor in the URL.
   * The anchor id has to be expsec-? where ? can be any number.
   * The anchor has to be a direct child of the expandable dt element.
   */
  if (location.hash.indexOf("expsec") !== -1) {
    $(location.hash).parents(".expandable").expandable("expand");
    _hash = location.href.split('#')[1];
    target_top = $(window).scrollTop() + (document.getElementById(_hash).getBoundingClientRect().top);
    $('html, body').animate({scrollTop:target_top}, 100, 'easeInSine');
  }

  if (location.hash.indexOf("panel") !== -1) {
    _hash = $(location.hash);
    changePanel(_hash);
  }

  jQuery('.tabNavigation a').click(function(ev) {
    ev.preventDefault();
    if (this.href.indexOf("panel") !== -1) {
      _hash = '#' + this.href.split('#')[1];
      changePanel(_hash);
    }
  });

});

var hideEditForm = function(e) {
  e.stopPropagation();
  var eidtlink = clickedThing(e, "a");
  var itemId = eidtlink.attr("id");
  var displayForm = "#display-" + itemId;
  var editForm = "#edit-" + itemId;
  jQuery(displayForm).show();
  jQuery(editForm).hide();
  var parentForm = jQuery(eidtlink).closest("form");
  var parentFormId = "#"+parentForm.attr("id");
  jQuery(parentFormId)[0].reset();
  return true;
};

var showEditForm = function(e) {
  e.stopPropagation();
  var eidtlink = clickedThing(e, "div");
  var itemId = eidtlink.attr("id");
  var displayForm = "#display-" + itemId;
  var editForm = "#edit-" + itemId;
  setTopicListForGuidelines(itemId);
  jQuery(editForm).show();
  jQuery(displayForm).hide();
  return false;
};

function changePanel(_hash) {
  jQuery(".tabs > div").each(function(i) {
    jQuery(this).hide();
  });
  jQuery('.tabs').find(_hash).show();
}


// My Institution page  tabs (tab-search, tab-guideline, tab-patient-leaflet, tab-locale, tab-sidebarlink, 
// tab-cpd-cme-report

jQuery(function() {
	
    var $tabContainers = $('div.box-content > div'),
    $tabLinks = $("body ul.tabNavigation a");

	$tabLinks.click(function(ev) {
	    var tabId = $(this).attr("ud");
	    	    	    
	    if (location.href.match(/mybp\.html/)) {
	      console.log("first if");	
	      var cookie = $.cookies.get($.bp.tabCookieName);
	
	      if ((cookie === null || cookie === "undefined") && this.hash === "undefined") {
	    	$.cookies.set($.bp.tabCookieName, "first", {
	          path: "/"
	        });
	      }
	      else {
	    	var tabIdentifirer = jQuery(this).attr('id');
	        console.log("tabIdentifirer = " + tabIdentifirer);
	        $.cookies.set($.bp.tabCookieName, tabIdentifirer, {
	          path: "/"
	        });
	      }
	    }
	    
	    $tabContainers.hide().filter(this.hash).show();
	    
	    // Remove selected from all tabs first and set selected to clicked tab
	    //$tabLinks.removeClass('selected firstOn secondOn thirdOn fourthOn fifthOn sixthOn');
	    $tabLinks.removeClass('selected');
	    jQuery(this).addClass('selected');
	
	    // Get the selected tab id and correctly set class of non selected tabs
	    jQuery('body ul.tabNavigation a:not(.selected)').addClass(tabId + "On");
	
	    return false;
	}).filter('').click();
	
	preselectTab();

    // Inner tabs
    var innertabContainers = jQuery('div.inner-box-content > div');
    
    jQuery('body ul.inner-tabNavigation a').click(function() {
    	console.log("helooooooo3");
	    innertabContainers.hide().filter(this.hash).show();
	
	    // Remove selected from all tabs first and set selected to clicked tab
	    jQuery('body ul.inner-tabNavigation a').removeClass('selected inner-firstOn inner-secondOn');
	    jQuery(this).addClass('selected');
	
	    // Get the selected tab id and correctly set class of non selected tabs
	    var id = jQuery(this).attr('id'), className;
	    switch (id) {
	    case 'inner-first':
	      className = 'inner-firstOn';
	      break;
	    case 'inner-second':
	      className = 'inner-secondOn';
	      break;
	    }
	
	    jQuery('body ul.inner-tabNavigation a').not('a.selected').addClass(className);
	
	    return false;
    }).filter('').click();

    preselectSubTab();
});


///////////////////////////////////////////////////////////////////
// MONO NAV RESPONSIVE
// $(document).ready(function() {
  // var maxHeight = 0;

  // $("dl.nav-mono-tabs").each(function(e) {
    // if ($(this).height() > maxHeight) {
      // maxHeight = $(this).height() + 30;
    // }
  // });

  // $("dl.nav-mono-tabs").height(maxHeight);
  // $('dl.nav-mono-tabs').each(function(f) {
    // if ($(this).is('.active')) {
      // $(this).css('background-color', '#fff');
      // $(this).children('dt').children('a').css('color', '#333');
    // }
  // });

  // $(window).on('resize', function(g) { //mobile and tablet view - collapse monograph navigation
    // var width = window.innerWidth;

    // if (width < 979) {
      // $('dl.nav-mono-tabs dd').addClass('collapse');
      // $("dl.nav-mono-tabs").height('auto');

      // $('dl').each(function(h) {
        // if ($(this).is('.active')) {
          // $(this).children('dd').addClass('collapse in');
        // }
      // });
    // }
    // if (width > 979) {
      // $('dl.nav-mono-tabs dd').removeClass('collapse in');
      // $("dl.nav-mono-tabs").height(maxHeight);
    // }
  // }).resize();
// });


//The code below is used to track the clicks outside popups

$(document).on('click', function(e) {
  var $clicked = $(e.target);

  //if the click is out side the popup winodw remove the popup
  if (!$clicked.is(".popup") && !$clicked.parents().is(".popup")) {
    jQuery(".popup").hide();
  }

  if (!$clicked.is(".search-menu,#menu-heading")) {
    jQuery(".search-menu").hide();
    jQuery("#menu-heading").removeClass('on');
  }
});

$(document).ready(function() {
	if ($(window).height() < "768") {
		if (window.location.href.indexOf("monograph") > -1) {
			window.scrollTo(0, $(".monograph-title").offset().top);
		}
		else if (window.location.href.indexOf("search")> -1){
			window.scrollTo(0, $("#content-header").offset().top);
		}
	}
});

$(function () {
  $(".drug-page").hide();

  if ($(".warning").length > 0) {
    $(".warning").show();
    $(".warning-nav-link").addClass("active");
  }
  else {
    if (getQueryParameter("source")) {
      $(".intro-desc").show();
      $("#intro-desc-nav-link").addClass("active");
    }
    else {
      $(".dosage-admin").show();
      $("#dosage-admin-nav-link").addClass("active");
    }
  }

  $(".ashp-nav-link").click(function () {
    var href = $(this).attr('href');

    $("#disclaimer-div").toggle(href !== "#disclaimer-page");

    $(href).hide();
    $(".drug-page").hide();
    $(href).show();
    $(".ashp-nav-link").removeClass("active");
    $(this).addClass("active");

    return false;
  });

  $("a.internal-ref-link").click(function () {
    //Hide all pages
    $(".drug-page").hide();

    // Show the pages with this particular section in it
    var $href = $(this).attr('href'),
      $page = $href.hasClass('drug-page') ? $href : $href.parents('div.drug-page'),
      navlinkid = $page.attr('id');

    $(".ashp-nav-link").removeClass("active");
    $("#" + navlinkid + "-nav-link").addClass("active");
    $("#disclaimer-div").show();

    $page
      .show()
      .find('h2')
        .click();

    return true;
  });

  $("a.reference").click(function () {
    $(".drug-page").hide();
    $("#disclaimer-div").show();
    $(".refs").show();
    $(".ashp-nav-link").removeClass("active");
    $("#refs-nav-link").addClass("active");
    $("#disclaimer-div").show();
    return true;
  });

  $("a.disclaimer-internal-link").click(function () {
    $(".drug-page").hide();
    $(".disclaimer-page").show();
    $("#disclaimer-div").hide();
    $(".ashp-nav-link").removeClass("active");
    $("#disclaimer-page-nav-link").addClass("active");
    return true;
  });
});

$.fn.carousel.defaults = {
  interval: false,
  pause: 'hover'
};

///////////////////////////////////////////////////////////////////
// BACK TO TOP FLOATING LINK CODE 
jQuery(document).ready(function() {
				var offset = 220;
				var duration = 500;
				jQuery(window).scroll(function() {
					if (jQuery(this).scrollTop() > offset) {
						jQuery('.back-to-top').fadeIn(duration);
					} else {
						jQuery('.back-to-top').fadeOut(duration);
					}
				});
				
				jQuery('.back-to-top').click(function(event) {
					event.preventDefault();
					jQuery('html, body').animate({scrollTop: 0}, duration);
					return false;
				})
			});
///////////////////////////////////////////////////////////////////
// reorder divs on resize (reg box first)
    $(window).resize(function(){
      if ($(window).width() <= 767){	
      $("#hp_first").insertAfter("#newReg");
    }	
  });
    
// Autodetecct functionality for search calling google translate API    
////////////////////////////////////////
    jQuery(document).ready(function() {
    	var autoDetect=$('#isAutodetectEnabled').val()=="true";
    	
    	if(autoDetect){
	    	var isGoogleTransalteEnabled = $('#isGoogleTransalteEnabled').val();
	    	var userSelectedLanguage=false;
	    	var autoDetectedLanguage=false;
	    	
	    	$('.autoDetectDropdown').click(function(){
	    		autoDetectedLanguage = false;	    		
	    	});
	    	
	    	$('.autoDetectDropdown').change(function(){
	    		if (!autoDetectedLanguage)
	    		{
	    			$("#autoDetectDropdownLabel").text("- "+$.i18n.prop('search.selected.language'));
	    			userSelectedLanguage=true;
	    		}
	    	});
	    	
	    	$('.main-search-text').on('propertychange input',function(){
	    		var sTerm=$(this).val();
	    		if(!userSelectedLanguage && sTerm.length>1&&isGoogleTransalteEnabled=="true"){
	    			$.ajax({
	    				url:"/best-practice/api/detectLanguage.json",
	    				method: "GET",
	    				data: {searchTerm: sTerm},
	    		        cache: false
	    			}).done(function(data){
	    				console.log("detected language:"+data.language);
	    				autoDetectedLanguage = true;
	    				$(".autoDetectDropdown").val(data.language);	    
	    				$("#autoDetectDropdownLabel").text("- "+$.i18n.prop('search.detected.language'));	
	    			})
	    		}
	    	})	
    	}
	});

  
////////////////* RESIZE SELECT BOX LANG DETECT ////////////////
 (function($, window){
  var arrowWidth = 20;

  $.fn.resizeselect = function(settings) {  
    return this.each(function() { 

      $(this).change(function(){
        var $this = $(this);

        // create test element
        var text = $this.find("option:selected").text();
        var $test = $("<span>").html(text);

        // add to body, get width, and get out
        $test.appendTo('body');
        var width = $test.width();
        $test.remove();

        // set select width
        $this.width(width + arrowWidth);

        // run on start
      }).change();

    });
  };

  // run by default
  $("select.resizeselect").resizeselect();                       

})(jQuery, window);