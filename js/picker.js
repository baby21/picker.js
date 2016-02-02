var Picker = function(options){
		this.data = options.data;
		this.maxFont = options.maxFont || 20;
        this.attrName = options.attrName;
        this.attrs = options.attrs;
        this.ensureCallback = options.ensure || this.noop;
        this.cancelCallback = options.cancel || this.noop;
        this.init();
	}
Picker.prototype = {
    constructor: Picker,
    noop:function(){},
    init:function(){
        this.index = this.data.length;
        this.initDOM();
        this.height = this.items[0].offsetHeight;
        this.events();
        this.goIndex(this.index);
        this.setStyle();
    },
    initDOM: function() {
        this.wrap = document.createElement('div');
        this.wrap.setAttribute('class', 'picker-container');
        var height = window.innerHeight;
        var zoom = height/568;
        this.wrap.style.zoom = zoom;
        var area = document.createElement('div');
        area.setAttribute('class', 'picker-area');
        var view = document.createElement('p');
        view.setAttribute('class', 'picker-view');
        var ensure = document.createElement('a');
        ensure.setAttribute('class', 'picker-ensure');
        ensure.innerText = '确定';
        var cancel = document.createElement('a');
        cancel.setAttribute('class', 'picker-cancel');
        cancel.innerText = '取消';
        this.ensure = ensure;
        this.cancel = cancel;
        this.id = 'picker' + Math.random();
        var dds = '';
        for (var i = 0; i < this.data.length; i++) {
           if(this.attrName){
               dds += '<dd '+this.attrName+'='+this.attrs[i]+'>' + this.data[i] + '</dd>';
           }else{
               dds += '<dd>' + this.data[i] + '</dd>';
           }
        }
        dds += dds += dds;
        var html = '<dl id="' + this.id + '" style="transform:translateY(0px);">' + dds + '</dl>';
        area.innerHTML = html;
        area.appendChild(view);
        this.wrap.appendChild(area);
        this.wrap.appendChild(ensure);
        this.wrap.appendChild(cancel);
        document.body.appendChild(this.wrap);
        this.picker = document.getElementById(this.id);
        this.items = this.picker.getElementsByTagName('dd');
    },
    show: function() {
        this.wrap.style.display = 'block';
    },
    hide: function() {
        this.wrap.style.display = 'none';
    },
    events: function() {
        var picker = this.picker;
        this.wrap.addEventListener('touchstart', this.handleStart.bind(this));
        picker.addEventListener('touchmove', this.handleMove.bind(this));
        picker.addEventListener('touchend', this.handleEnd.bind(this));
        this.ensure.addEventListener('touchstart', function(){
            this.ensureCallback(this.items[this.index],this.index);
        }.bind(this));
        this.cancel.addEventListener('touchstart', this.cancelCallback);
    },
    _transTop: function(trsY) {
        var picker = trsY || this.picker;
        return parseInt(this.picker.style.webkitTransform.match(/-*\d+/)[0]);
    },
    setTransY: function(y) {
        this.picker.style.webkitTransform = 'translateY(' + y + 'px)';
    },
    _setIndex: function() {
        this.index = 2 - Math.round(this._transTop() / this.height);
    },
    goIndex: function(n) {
        this.setTransY((2 - n) * this.height);
        this.index = n;
        this.setStyle();
    },
    setStyle: function() {
        var top = this._transTop();
        var height = this.height;
        var cenTop = 2.5*height;
        var items = this.items;
        var maxFont = this.maxFont || 20;
        var minFont = this.minFont || 15;
        for (var i = 0; i < items.length; i++) {
            if (Math.abs(i - this.index) < 4) {
                items[i].style.fontSize = maxFont - Math.abs((top + height * i + height/2) - cenTop) / minFont+ 'px'; 
                items[i].style.transform = 'rotate(1deg)'
                items[i].style.opacity = 1.1 - Math.abs((top +  height* i + height/2) - cenTop) / (4*this.height);
            }
        }
    },
    handleStart: function(e) {
        e.preventDefault();
        var picker = this.picker;
        this.startTime = Date.now();
        this.startY = e.targetTouches[0].pageY;
        this.disY = e.targetTouches[0].pageY - this._transTop();
        this.picker.style.transition = 'all 0ms';
        this.picker.style.webkitTransition = 'all 0ms';
    },
    handleMove: function(e) {
        this.moveY = e.targetTouches[0].pageY;
        var tranY = this.moveY - this.disY;
        var min = this.height * 2;
        var max = 3 * this.height * (1 - this.data.length);
        if (tranY < min && tranY > max) {
            this.setTransY(tranY);
            this._setIndex();
            this.setStyle();
        }
    },
    handleEnd: function(e) {
        this.endTime = Date.now();
        var endY = this.moveY - this.startY;
        var disTime = this.endTime - this.startTime;
        this.picker.style.transition = 'all 300ms';
        this.picker.style.webkitTransition = 'all 300ms';
        this.goIndex(this.index);
    }
}
