(function($) {
	$.fn.plusMinus = function() {
		
		var count = this.length;
		$("body").on("click",".o-plus-minus-btn",function(e){
			onClick(this);
		});
		
		onClick = function(e){
			if($(e).hasClass("p-btn")){
				increase(e);
			}
			else{
				decrease(e);
			}
		};
		increase = function(e){
			let container = $(e).parents(".o-plus-minus-container");
			let input = container.find(".o-plus-minus[data-item='"+container.attr("data-item")+"']");
			let step = parseInt($(input).attr("step"));
			let max = $(input).attr("max");
			
			let oldValue = $(input).val();
			if(!oldValue){
				oldValue = 0;
			}
			let newValue = parseInt(oldValue) + step;
			if((max && newValue <= max) || !max){
				$(input).val(newValue);
			}
		};
		decrease = function(e){
			let container = $(e).parents(".o-plus-minus-container");
			let input = container.find(".o-plus-minus[data-item='"+container.attr("data-item")+"']");
			let step = parseInt($(input).attr("step"));
			let min = $(input).attr("min");
			let oldValue = $(input).val();
			if(!oldValue){
				oldValue = 0;
			}
			let newValue = parseInt(oldValue) - step;
			if((min && newValue >= min) || !min){
				$(input).val(newValue);
			}
		};
		
		return this.each(function(){
			let el = $(this);
			let step = el.attr("step");
			if(!step){
				step = 1;
			}
			let random = Math.floor(Math.random() * 999999999);
			el.addClass("o-plus-minus").addClass("copy").attr("data-item","o-"+random);
			let container = '<span class="o-plus-minus-container" data-item="o-'+random+'"></span>';
			el.after(container);
			el.attr("type","number");
			el.attr("step",step);
			
			this.init = function(){
				return this.setSize();
			};
			
			this.setSize = function(){
				let elBorderLeftWidth = el.css("border-left-width");
				let elBorderRightWidth = el.css("border-right-width");
				let elBorderTopWidth = el.css("border-top-width");
				let elBorderBottomWidth = el.css("border-bottom-width");
				let elWidth = el.width();
				let elHeight = el.innerHeight();
				let item = el.attr("data-item");
				let elContainer = $(".o-plus-minus-container[data-item='"+item+"']");
				let arr = {elWidth:elWidth,elHeight:elHeight,item:item,elContainer:elContainer,elBorderLeftWidth:elBorderLeftWidth,elBorderTopWidth:elBorderTopWidth,elBorderRightWidth:elBorderRightWidth,elBorderBottomWidth:elBorderBottomWidth};
				this.copyItem(arr);
				this.setButtons(arr);
			};
			this.setButtons = function(e){
				let plusBtn = '<a class="o-plus-minus-btn p-btn" style="width:'+e.elHeight+'px;height:'+e.elHeight+'px;line-height:'+e.elHeight+'px;top:'+e.elBorderTopWidth+';right:'+e.elBorderRightWidth+';">+</a>';
				let minusBtn = '<a class="o-plus-minus-btn m-btn" style="width:'+e.elHeight+'px;height:'+e.elHeight+'px;line-height:'+e.elHeight+'px;top:'+e.elBorderTopWidth+';left:'+e.elBorderLeftWidth+';">-</a>';
				e.elContainer.append(plusBtn).append(minusBtn);
			};
			this.copyItem = function(e){
				el.clone().removeClass("copy").appendTo(e.elContainer);
				el.remove();
			};
			/* return this.init(); */
			this.init();
			
			
			
		});
		
	};
})(jQuery);