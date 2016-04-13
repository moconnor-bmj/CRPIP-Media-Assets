
(function($, window, document, undefined) {

  $.widget("bmj.expandable", {

    // Options to be used as defaults
    options: {
      expanded: false,          // whether we start expanded
      expanded_test: null,      // selector to test for initial state
      quiet: false              // whether we emit events or not
    },

    _create: function () {
      // this.element -- a jQuery object of the element the widget was invoked on.
      // this.options --  the merged options hash


      this.header = this.element.children().first();
      this._icon = $("<i class='icon-arrow-right'></i>").prependTo(this.header);

      this.content = this.element.children().slice(1);

      this._on(this.header, {
        click: function(ev) {
          this.toggle();
          return false;
        },

        keydown: function(ev) {
          if (ev.which === 13) {
            this.toggle();
            return false;
          }
        }
      });

      // if (this.header.hasClass("expanded")) {
      if (typeof this.options.expanded_test === "string") {
        this.options.expanded = $(this.options.expanded_test, this.element).length > 0;
      }
      
      this._trigger("create", null, {
          widget: this,
          expanded: this.options.expanded
        });      
    },

    _destroy: function () {
      this.element.removeClass("expandable");
      this.header.removeClass("expanded collapsed");
      this._icon.remove();
      this.content.removeClass("collapse in out");
    },

    _str: function() {
      var $c = this.element.clone();
      if (!$c.is(":empty")) {
        $c.text("...");
      }
    },

    _changed: function() {
      if (!this.options.quiet) {
        this._trigger("changed", null, {
          widget: this,
          expanded: this.options.expanded
        });
      }
    },

    _setOption: function(key, value) {
      if (key === "expanded") {
        this.options.expanded = !!value;
        this._refresh();
        this._changed();
      }

      this._super(key, value);
    },

    _refresh: function() {
      var expanded = this.options.expanded;

      this.header
        .removeClass("expanded collapsed")
        .addClass(expanded ? "expanded" : "collapsed");
      this._icon
        .attr("class", expanded ? "icon-arrow-down" : "icon-arrow-right");
      this.content
        .collapse(expanded ? "show" : "hide");
    },

    toggle: function() {
      this._setOption("expanded", !this.options.expanded);
    },

    expand: function() {
      this._setOption("expanded", true);
    },

    collapse: function() {
      this._setOption("expanded", false);
    },

    expanded: function(new_value, suppress_event) {
      if (typeof new_value === "undefined") {
        return this.options.expanded;
      }

      var quiet = this.options.quiet;

      if (suppress_event === true) {
        this.options.quiet = true;
        this._setOption("expanded", new_value);
        this.options.quiet = quiet;
      }
      else {
        this._setOption("expanded", new_value);
      }
    },

    set: function(new_value) {
      var quiet = this.options.quiet;

      this.options.quiet = true;
      this._setOption("expanded", new_value);
      this.options.quiet = quiet;
    }

  });

})(jQuery, window, document);
