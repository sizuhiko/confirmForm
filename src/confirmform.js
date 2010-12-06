/**
 * confirmForm
 *
 * Require :
 *  jQuery (recommend 1.4.2 or over)
 *  jqModal plug-in.
 *
 * <form id="inputForm">
 * ....
 * </form>
 *
 * <div id="confirmForm" />
 *
 * For initialize confirm window.
 * $().ready(function() {
 *  ...
 * $("#inputForm").confirmForm("#confirmForm", {'title':'your title'});
 *  ...
 * }
 *
 * If you confirm inputForm then call followings:
 * $("#inputForm").confirmShow();
 *
 * If you check status of confirmation, then call followings:
 * $("#inputForm").isConfirmed(); // return true is already confirmed or false is until confirmed.
 *
 */
(function ($) {
	$.fn.confirmForm = function(appendTo, options) {
		var form = this;
		$.data($(form).get(0), 'confirmForm.confirmed', false);
		$.data($(form).get(0), 'confirmForm.block', appendTo);
		$.data($(form).get(0), 'confirmForm.options', $.extend({}, $.fn.confirmShow.options, options));

		$(appendTo).jqm({overlay:88, modal:true, trigger: false, toTop:true});
		$(form).submit(function(){
			return $(form).isConfirmed();
		});

		// If submit button is clicked on inputForm, then append hidden value to inputForm used specific id.
		$(form).find("#submitButtonValue").remove();
		$(form).find(':submit:visible').click(function(){
			$(form).find("#submitButtonValue").remove();
			$(form).append($("<input type='hidden' id='submitButtonValue' name='"+this.name+"' value='"+this.value+"' />"));
			return true;
		});
	};

	$.fn.confirmShow = function () {
		var form = this;
		$.data($(form).get(0), 'confirmForm.confirmed', false);
		var appendTo = $.data($(form).get(0), 'confirmForm.block');
		var options = $.data($(form).get(0), 'confirmForm.options');

		// If exists then remove
		$(appendTo).empty();
		$(appendTo).removeClass("jqmConfirm");

		// set attributes to confirmation division.
		$(appendTo).addClass("jqmConfirm");
		$(appendTo).css({"z-index": "5000", "top":50}); // z-index is For Internet explorer
		$(appendTo)
			.append($('<div/>').addClass("jqmConfirmWindow")
				.append($('<div/>').addClass("jqmConfirmTitle").addClass("clearfix")
					.append($('<h1>'+options.title+'</h1><a href="#" class="jqmClose"><em>Close</em></a>'))
				)
				.append($('<div/>').addClass("jqmConfirmContent").css({"overflow-y":"scroll", "width":"80%", "height":$(window).height() - 150})
					.append($('<form action="#" />')
						.append(__createTable(form, options))
						.append($('<p class="crudButtons">')
							.append($('<input type="submit" id="confirmFormYes" value="'+options.yes+'" />'))
							.append($('<input type="submit" id="confirmFormNo" value="'+options.no+'" />'))
						)
					)
				)
			);

		// Show modal dialog
		$(appendTo).jqmShow().find(':submit:visible').click(function(){
			if(this.id != 'confirmFormYes') {
				$(appendTo).jqmHide();
			} else {
				$(appendTo).jqmHide();
				$.data($(form).get(0), 'confirmForm.confirmed', true);
				$(form).submit();
			}
		});

		// scroll to top
		$(window).scrollTop(0);
		$(".jqmConfirmContent").scrollTop(0);

		return this;
	};

	$.fn.isConfirmed = function () {
		return 	$.data($(this).get(0), 'confirmForm.confirmed');
	};

	$.fn.confirmShow.options = {
		'title': 'Are you sure?',
		'yes':'Yes',
		'no':'No',
		'findLabel': function(inputField) {
			return $(inputField).prev().html();
		},
		'formatValue': {},
		'defaultFormat' : function (inputField) {
			return $(inputField).val();
		},
		'separator': ', '
	};

	/**
	 * private: Create table from Input form
	 */
	function __createTable(form, options) {
		var table = $('<table />');
		__addField(table, $(form).find(':text, :radio, :checkbox, select, textarea'), options);

		return table;
	}

	function __addField(table, fields, options) {
		var prev = false;
		var td = false;
		fields.each(function() {
			if($(this).is(':radio,:checkbox') && !$(this).is(':checked')) {
				return;	// not checked
			}
			if(prev.name == this.name) {
				td = td.text(td.text()+options.separator+__formatValue(this, options));
			} else {
				td = $('<td />').text(__formatValue(this, options));
				table.append($('<tr />')
					.append($('<th />').text(options.findLabel(this)))
					.append(td)
				);
			}
			prev = this;
		});
	}

	function __formatValue(field, options) {
		if(options.formatValue[field.name]) {
			return options.formatValue[field.name](field);
		}
		return options.defaultFormat(field);
	}

})(jQuery);