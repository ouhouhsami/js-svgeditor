(function($){  
    $.widget("ui.svgeditor_create", {  
		options: {
			shape:'rect', 
			fill:'black', 
			stroke:'red', 
			'stroke-opacity':'1',
			'stroke-width':'1', 
			opacity:'0.5'
		},
		_init: function(){
				var self = this;
				this.element
				.bind('mousedown.'+this.widgetName, function(evt) {
					console.log('mousedown')
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
				this.scale = 1
				this.drawing = Boolean()
				this.x_enter
				this.y_enter
				this.x_leave
				this.y_leave
				this.path
				this.attr

				this.sketchpad = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				$(this.sketchpad).attr({'width':'100%', 'height':'100%', 'x':0, 'y':0, 'stroke':'#000', 'stroke-width':0, 'fill':'#aaa', 'fill-opacity':0.2})
				$(this.element).prepend(this.sketchpad)
		},
		destroy: function(){
			this.element.unbind('.'+this.widgetName);
			$(this.sketchpad).remove()
			// TODO: remove sketchpad 
		},
		_create: function() {  
			
		},
		_dragStart: function(evt) {
			return false;	
		},
		_mouseDown: function(evt) {

			this.scale = $(this.element).closest('.scale').get(0).getCTM().inverse().a
			this.x_enter = (evt.pageX - $(this.element).offset().left)*this.scale;
			this.y_enter = (evt.pageY - $(this.element).offset().top)*this.scale;
			if(this.drawing == Boolean()){
				this.drawing = Boolean(1);
				this.shape = document.createElementNS('http://www.w3.org/2000/svg', this.options.shape);					
			}
			switch (this.options.shape) {
				case "rect":
					this.attr = {x: this.x_enter,y: this.y_enter};
					break;
				case "circle":
					this.attr = {'cx': this.x_enter, 'cy': this.y_enter};
					break;
				case "ellipse":
					this.attr = {'cx': this.x_enter, 'cy': this.y_enter};
					break;
				case "path":
					this.attr = {'d': "M"+this.x_enter+' '+this.y_enter};
					break;
				case "text":
					this.attr = {'x': this.x_enter, 'y': this.y_enter};
					break;
				case "polygon":
				    var points = $(this.shape).attr('points');
					path = ''
					for(var i=0; i<points.numberOfItems; i++){
						path += ' '+points.getItem(i).x+', '+points.getItem(i).y+' '
					}
					var new_point = this.x_enter+','+this.y_enter+' ';
					path += new_point;
					$(this.shape).attr('points', path);	
				    this.attr = {'points': path };
				    break;
				default:
					break;
			}

			this.attr = $.extend(this.attr, this.options, {'class':'shape'});
			delete this.attr.shape
			$(this.shape).attr(this.attr)
			if(this.options.shape == 'text'){
				$(this.shape).append($('#text_value').val())					
			}
			//$(evt.target).parent().append(this.shape)
			$(this.sketchpad).parent().append(this.shape)
		}, 
		_mouseMove: function(evt) {
			if(this.drawing == Boolean(1)){

				this.scale = $(this.element).closest('.scale').get(0).getCTM().inverse().a
				this.x_leave = (evt.pageX - $(this.element).offset().left)*this.scale;
				this.y_leave = (evt.pageY - $(this.element).offset().top)*this.scale;
				switch (this.options.shape) {
					case "rect":
						this.attr = {'x': Math.min(this.x_leave,this.x_enter), 'y': Math.min(this.y_leave,this.y_enter), 'width': Math.abs(this.x_leave-this.x_enter), 'height': Math.abs(this.y_leave-this.y_enter)}
						break;
					case "circle":
						this.attr = {'r': Math.sqrt(Math.pow(Math.abs(this.x_leave-this.x_enter), 2)+Math.pow(Math.abs(this.y_leave-this.y_enter), 2)),};
						break;
					case "ellipse":
						this.attr = {'rx': Math.sqrt(Math.pow(Math.abs(this.x_leave-this.x_enter), 2)), 'ry': Math.sqrt(Math.pow(Math.abs(this.y_leave-this.y_enter), 2)),};
						break;
					case "path":
						this.attr = {'d': $(this.shape).attr('d')+'L'+this.x_leave+' '+this.y_leave,};
						break;
					case "polygon":
					    var points = $(this.shape).attr('points');
						path = ''
						if(points.numberOfItems > 0){
							for(var i=0; i<points.numberOfItems-1; i++){
								path += ' '+points.getItem(i).x+', '+points.getItem(i).y+' '
							}
							var new_point = this.x_leave+','+this.y_leave+' ';
							path += new_point;
							$(this.shape).attr('points', path);	
						    attr = {'points': path};
					    }
					    break;
					default:
						break;
				}		
				$(this.shape).attr(this.attr)			
			}
		},
		_mouseUp: function(evt){
			if(this.options.shape != 'polygon'){
				switch (this.options.shape) {
					case "path":
						this.attr = {'d': $(this.shape).attr('d')+'Z',};
						$(this.shape).attr(this.attr)
						break;
					default:
						break;					
				}
				this.drawing = Boolean();
				//global_events.trigger('create_shape', $(shape))		
			}	
		},
		_dblClick: function(evt) {
				if(this.options.shape == 'polygon'){
					this.drawing = Boolean();
					//global_events.trigger('create_shape', $(shape))	
				}
		}
    });  
})(jQuery);  