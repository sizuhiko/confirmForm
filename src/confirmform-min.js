(function(b){b.fn.confirmForm=function(f,e){var g=this;b.data(b(g).get(0),"confirmForm.confirmed",false);b.data(b(g).get(0),"confirmForm.block",f);b.data(b(g).get(0),"confirmForm.options",b.extend({},b.fn.confirmShow.options,e));b(f).jqm({overlay:88,modal:true,trigger:false,toTop:true});b(g).submit(function(){return b(g).isConfirmed()});b(g).find("#submitButtonValue").remove();b(g).find(":submit:visible").click(function(){b(g).find("#submitButtonValue").remove();b(g).append(b("<input type='hidden' id='submitButtonValue' name='"+this.name+"' value='"+this.value+"' />"));return true})};b.fn.confirmShow=function(){var g=this;b.data(b(g).get(0),"confirmForm.confirmed",false);var f=b.data(b(g).get(0),"confirmForm.block");var e=b.data(b(g).get(0),"confirmForm.options");b(f).empty();b(f).removeClass("jqmConfirm");b(f).addClass("jqmConfirm");b(f).css({"z-index":"5000",top:50});b(f).append(b("<div/>").addClass("jqmConfirmWindow").append(b("<div/>").addClass("jqmConfirmTitle").addClass("clearfix").append(b("<h1>"+e.title+'</h1><a href="#" class="jqmClose"><em>Close</em></a>'))).append(b("<div/>").addClass("jqmConfirmContent").css({"overflow-y":"scroll",width:"80%",height:b(window).height()-150}).append(b('<form action="#" />').append(a(g,e)).append(b('<p class="crudButtons">').append(b('<input type="submit" id="confirmFormYes" value="'+e.yes+'" />')).append(b('<input type="submit" id="confirmFormNo" value="'+e.no+'" />'))))));b(f).jqmShow().find(":submit:visible").click(function(){if(this.id!="confirmFormYes"){b(f).jqmHide()}else{b(f).jqmHide();b.data(b(g).get(0),"confirmForm.confirmed",true);b(g).submit()}});b(window).scrollTop(0);b(".jqmConfirmContent").scrollTop(0);return this};b.fn.isConfirmed=function(){return b.data(b(this).get(0),"confirmForm.confirmed")};b.fn.confirmShow.options={title:"Are you sure?",yes:"Yes",no:"No",findLabel:function(e){return b(e).prev().html()},formatValue:{},defaultFormat:function(e){return b(e).val()},separator:", "};function a(g,e){var f=b("<table />");d(f,b(g).find(":text, :radio, :checkbox, select, textarea"),e);return f}function d(h,e,f){var g=false;var i=false;e.each(function(){if(b(this).is(":radio,:checkbox")&&!b(this).is(":checked")){return}if(g.name==this.name){i=i.append(jQuery.fn.text(f.separator+c(this,f)))}else{i=b("<td />").text(c(this,f));h.append(b("<tr />").append(b("<th />").text(f.findLabel(this))).append(i))}g=this})}function c(f,e){if(e.formatValue[f.name]){return e.formatValue[f.name](f)}return e.defaultFormat(f)}})(jQuery);