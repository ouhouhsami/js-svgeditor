(function($){  
    $.widget("ui.svgeditor_delete", {
    	options:{ 
    	},
    	_init: function(){
    		var self = this;
    		this.shapes = this.element.find('.shape')
    		this.shapes.each(function(i){
    			
    			$(this).click(function(evt){
    				self._trigger('.delete_shape', evt, {'shape':this})
    				$(this).remove()
    			})
    		})
    		
    	},
    	destroy: function(){
    		this.shapes.unbind('click');
    	}
    })
})(jQuery);  