$(document).ready(function() {

	$("header h1 .menu-button").on("click", function(event){
		$(".container").toggleClass("container-shift");
	});
	
	$(".container").on("click", function(event){
		$(".container").removeClass("container-shift");
	});
	
	$("#menu1 .dropdown-toggle").on("click", function(event){
		if ($(window).width() < 767){
			window.open("/best-practice/login.html","_self");
		};
	});
	
	$(window).on("resize", function(event){
		if ($(window).width() < 767){
			$(".dropdown-toggle b").hide();
			$("#menu1").removeClass("open");
			$("#menu3").removeClass("open");
		}
		else {
			$(".dropdown-toggle b").show();
		}
	}).resize();
	
	$('#my-locale').on("click", function(event){
		if ($(window).width() < 767){
			$("#menu2 .dropdown-menu").toggle();
			return false;
		};
	});
	
	$('#signed-in').on("click", function(event){
		if ($(window).width() < 767){
			$("#menu3 .dropdown-menu").toggle();
			return false;
		};
	});

	
	/*  Official bug in bootstrap, fixed below. Previously, Firefox dropdown menus disappear on right click. 
		http://stackoverflow.com/questions/15931962/bootstrap-dropdown-disappear-with-right-click-on-firefox  */

	// obtain a reference to the original handler
	var _clearMenus = $._data(document, "events").click.filter(function (el) {
		return el.namespace === 'data-api.dropdown' && el.selector === undefined
	  })[0].handler;

	// disable the old listener
	$(document)
	  .off('click.data-api.dropdown', _clearMenus)
	  .on('click.data-api.dropdown', function (e) {
		// call the handler only when not right-click
		e.button === 2 || _clearMenus()
	  });  
});