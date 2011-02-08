(function($){  
    $.widget("ui.svgeditor_delete", {
    	options:{ 
    	},
    	_init: function(){
    		var self = this;
    		this.shapes = this.element.find('.shape')
    		this.shapes.each(function(i){
    			$(this).click(function(evt){$(this).remove()})
    		})
    		
    	},
    	destroy: function(){
    		this.shapes.unbind('click');
    	}
    })
})(jQuery);  