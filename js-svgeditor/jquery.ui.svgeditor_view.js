(function($){  
    $.widget("ui.svgeditor_view", {
    	options:{ 
    	},
    	_init: function(){
    		var self = this;
    		
    		
    		
    		this.zoom_in = $('<input type="button" value="+"/>')
    		this.zoom_init = $('<input type="button" value="100%"/>')
    		this.zoom_out = $('<input type="button" value="-"/>')
    		this.zoom_value = $('<input type="text" value="100" />')
    		this.zoom = 1


    		
    		$(this.element).wrap('<div class="view_container" />')    		
    		$(this.element).parent().before('<div class="view_controls_container" />')
    		
    		this.view_controls_container = $(this.element).parent().prev()
    		$(this.view_controls_container).append(this.zoom_out)
    		$(this.view_controls_container).append(this.zoom_init)
    		$(this.view_controls_container).append(this.zoom_in)
    		$(this.view_controls_container).append(this.zoom_value)
    		
    		this.view_container = $(this.element).parent()
    		this.original_height = $(this.view_container).css('height').split('p')[0]*this.zoom
    		this.scale_node = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    		$(this.scale_node).attr({'class':'scale'})
    		$(this.element).wrapInner(this.scale_node)
    		
    		this.scale = this.element.children('.scale').first()

    		this.zoom_in.click(function(evt){
    			self.zoom = self.zoom + 0.1
    			self._zoom()
    		})
    		this.zoom_init.click(function(evt){
    			self.zoom = 1
    			self._zoom()
    		})
    		this.zoom_out.click(function(evt){
    			self.zoom = self.zoom - 0.1
    			self._zoom()
    		})
    		this.zoom_value.change(function(evt){
    			self.zoom = $(this).val()/100
    			self._zoom()
    		})
    	},
    	destroy: function(){
    		
    	},
    	_zoom:function() {
    		var k = this.element.get(0).createSVGMatrix().scale(this.zoom)
    		this._setCTM(this.scale, this.element.get(0).createSVGMatrix().multiply(k))
    		$(this.element).parent().css('height', (this.zoom*this.original_height)+'px')
    		//this.zoom_value.val(Math.floor(this.zoom*100))
    		this.zoom_value.val(this.zoom*100)
    	},
        _setCTM: function(elmnt, matrix) {
        	var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
        	elmnt.attr("transform", s);
		}
    	
    })
})(jQuery);

