(function($){  
    $.widget("ui.svgeditor_update", {
    	options:{ 
    	},
    	_init: function(){
    		this.state
    		this.action = Boolean()
    		this.stateTarget
    		this.stateTf = this.element.get(0).getCTM().inverse()
    		this.stateOrigin
			this.scale = 1
			
			var self = this;
			
    		this.element
			.bind('mousedown.'+this.widgetName, function(evt) {
				return self._mouseDown(evt);
			})
			.bind('dragstart.'+this.widgetName, function(evt) {
				return self._dragStart(evt);
			})
			.bind('dblclick.'+this.widgetName, function(evt) {
				return self._dblClick(evt);
			})
			.bind('mousemove.'+this.widgetName, function(evt) {
				return self._mouseMove(evt);
			})
			.bind('mouseup.'+this.widgetName, function(evt) {
				return self._mouseUp(evt);
			})
	
    		
    		
    		this.element.find('.shape').each(function(i){
    			//self._create_anchor($(this))
    			
    			$(this).bind('mousedown', function(evt){
    				self.state = 'move'
    				self.stateTarget = this
					self.stateOrigin = self._getEventPoint(evt).matrixTransform(self.stateTf);
					self.action = Boolean(1)
				})
    		})
    	},
    	_create: function() {  
			
		},
    	destroy: function(){
			//this.element.find('.anchor').remove()
			this.element.find('.shape').unbind('.'+this.widgetName);
    	},
    	/*
    	_create_anchor: function(tg) {
    		var bbox_shape = tg.get(0).getBBox()
    		var anchor1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    		$(anchor1).attr({'width':6, 'height':6, fill:'black', class:'anchor', x:bbox_shape.x-3, y:bbox_shape.y-3})
    		var anchor2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    		$(anchor2).attr({'width':6, 'height':6, fill:'blakc', class:'anchor', x:bbox_shape.x+bbox_shape.width-3, y:bbox_shape.y+bbox_shape.height-3})
    		tg.parent().append(anchor1)
    		tg.parent().append(anchor2)
    		var self = this
    		$(anchor1, anchor2).bind('mousedown', function(evt){
    			self.state = 'transform'
    			self.stateTarget = this
    		})
    	},
    	*/
    	_getEventPoint: function(evt){
        	var p = this.element.get(0).createSVGPoint();
       		p.x = evt.clientX;
  			p.y = evt.clientY;   
  			return p 		
    	},
    	_mouseDown: function(evt){
    		//this.action = Boolean(1)
    		
    	},
    	_mouseMove: function(evt){
    		if(this.action == Boolean(1)){
    			var p = this._getEventPoint(evt).matrixTransform(this.stateTf);
    			this.scale = $(this.element).closest('.scale').get(0).getCTM().inverse().a
    			this._setCTM(this.stateTarget, this.element.get(0).createSVGMatrix().translate((p.x - this.stateOrigin.x)*this.scale, (p.y - this.stateOrigin.y)*this.scale).multiply(this.stateTf).multiply(this.stateTarget.getCTM()));
                this.stateOrigin = p;
    		}
    	},
    	_mouseUp: function(evt){
    		this.action = Boolean()
    		this._trigger('.update_shape', evt, {'shape':this.stateTarget})
    	}, 
    	_dragStart: function(evt){
    		return false;	
    	}, 
        _setCTM: function(elmnt, matrix) {
        	var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
        	elmnt.setAttribute("transform", s);
		}

    })
})(jQuery); 