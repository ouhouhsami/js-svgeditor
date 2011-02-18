(function($){  
    $.widget("ui.svgeditor_translate", {
    	options:{ 
    		'class':'layout',
    	},
    	_init: function(){
			var self = this
			// items to translate
			this.items = $(this.element).find('.'+this.options.class)
    		//console.log(this.items)
    		// private var
    		this._current = 0
    		this._total_length = this.items.length
    		    		
    		// translate g svg element creation
    		this.translate_node = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    		$(this.translate_node).attr({'class':'translate'})
    		this.items.eq(0).parent().wrapInner(this.translate_node)    		
    		this.translate = this.items.eq(0).parent()	
    		
    		// translate controls container creation
    		this.translate_nav = $('<div class="translate_controls_container"></div>').insertAfter($(this.element).parent())
    		
    		// controls creation
    		this.prev_button = $('<input type="button" value="<"/>').appendTo(this.translate_nav)
    		
    		this.items.each(function(i){
    			this.button = $('<input type="button" class="page_button" value="'+i+'" />').appendTo(self.translate_nav)
    			if(i == 0){
    				this.button.addClass('current')	
    			}

    			this.button.bind('click', function(evt){
    				self._translate($(this).attr('value'))
    			})
    		})
    		
    		this.next_button = $('<input type="button" value=">"/>').appendTo(this.translate_nav)
            
    		this.prev_button.click(function(evt){
    			if(self._current > 0){
    				self._translate(self._current - 1)
    			}
    		})
    		this.next_button.click(function(evt){
    			//console.log(self.items)
    			if(self._current < self._total_length-1){
    				self._translate(self._current + 1)
    			}
    		})    		
    	},
 		_create: function() {  
			
		},
    	destroy: function(){
    		
    	},
    	_translate : function(i){
    		this._current = parseInt(i)
    		this.translate.attr('transform', 'translate(-'+this.items.eq(this._current).attr('x')+',0)')
    		this.translate_nav.find('.current').removeClass('current')
    		this.translate_nav.find('.page_button').eq(i).addClass('current')
    	},
        _setCTM: function(elmnt, matrix) {
        	var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
        	elmnt.attr("transform", s);
		}
    	
    })
})(jQuery);

