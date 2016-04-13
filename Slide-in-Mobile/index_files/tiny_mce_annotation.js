tinyMCE.init({
        // General options
        mode : "textareas",
        theme : "advanced",
        plugins : "style,layer,save,advhr,advlink,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking",

        // Theme options
theme_advanced_buttons1 : "bold,italic,underline,|,formatselect,|,bullist,numlist,|,link,unlink,|,forecolor,backcolor",        
theme_advanced_toolbar_location : "top",
        theme_advanced_toolbar_align : "left",
        theme_advanced_statusbar_location : "none",
        theme_advanced_resizing : true,
        external_link_list_url : "js/link_list.js",
        media_external_list_url : "js/media_list.js",
        convert_urls : true,
        relative_urls : false,
        remove_script_host : true
});