class Carousel{
    interval:number;
    items:JQuery;
    activeItem:JQuery;
    thumbs:JQuery;
    currentThumb:JQuery;
    thumbWrapper:JQuery;
    prev:JQuery;
    next:JQuery;
    timer:number;
    restart:number;
    control:JQuery;
    videoElem:any;
    playing:boolean;
    seeking: boolean;
    pageSize:number;
    pageNum:number;
    width:number;
    constructor(options){
        this.interval = options.interval || 5000;
        this.pageSize = options.pageSize || 5;
        this.width = options.width;
        this.items = $('.item');
        this.activeItem = $('.active');
        this.thumbs = $('.thumb');
        this.currentThumb = $('.current');
        this.thumbWrapper = $('.wrapper');
        this.prev = $('.prev');
        this.next = $('.next');
        this.control = $('.video-control');
        this.videoElem = document.getElementById('movie');
        this.restart = null;
        this.playing = false;
        this.seeking = false;
        this.pageNum = 1;
        this.bindEvent();
        this.start();
    }
    bindEvent(){
        let self = this;
        this.prev.on('click',()=>{
            self.playing = false;
            self.stop();
            self.showPrev();
        });
        this.next.on('click', () => {
            self.playing = false;
            self.stop();
            self.showNext();
        });
        this.thumbs.on('click',function(){
            let thumb = $(this);
            self.playing = false;
            self.stop();
            self.currentThumb.removeClass('current');
            thumb.addClass('current');
            self.currentThumb = thumb;
            let index = thumb.index();
            let item = self.items.eq(index);
            self.activeItem.addClass('fade').removeClass('active');
            item.removeClass('fade').addClass('active');
            self.activeItem = item;
        });
        this.control.on('click',function(){
            self.playing = true;
            self.videoElem.play();
            self.control.addClass('fade');
            self.stop();
        });
        $(this.videoElem).on('play', function () {
            console.log('play')
            self.playing = true;
            self.control.addClass('fade');
            self.stop();
        });
        $(this.videoElem).on('ended',function(){
            console.log('ended')
            self.resume();
        });
        $(this.videoElem).on('pause', function () {
            setTimeout(() => {
                if(self.seeking){
                    self.seeking = false;
                    return;
                }
                console.log('pause')
                self.resume();
            }, 0);
            
        });
        $(this.videoElem).on('seeked', function () {
            console.log('seeked')
        });
        $(this.videoElem).on('seeking', function () {
            console.log('seeking')
            self.seeking = true;
        });
    }
    start() {
        let self = this;
        this.timer = setInterval(function(){
            self.showNext();
        },this.interval)
    }
    stop(){
        let self = this;
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
        if(this.restart){
            console.log(typeof this.restart);
            clearTimeout(this.restart);
            this.restart = null;
        }
        this.restart = setTimeout(() => {
            if (!self.timer && !self.playing) {
                self.start();
            }
        }, this.interval);
    }
    resume(){
        this.playing = false;
        this.control.removeClass('fade');
        if (!this.timer) {
            this.start();
        }
    }
    showNext(){
        let isEnd = false;
        let next = this.activeItem.next();
        let nextThumb = this.currentThumb.next();
        if (!next.length) {
            next = this.items.first();
            nextThumb = this.thumbs.first();
            isEnd = true;
        }
        // 轮播图
        this.activeItem.addClass('fade').removeClass('active');
        next.removeClass('fade').addClass('active');
        this.activeItem = next;
        // 缩略图
        let index = this.currentThumb.index() + 1;
        if(isEnd){
            this.thumbWrapper[0].style.transition = '-webkit-transform 500ms ease';
            this.thumbWrapper[0].style.webkitTransform = 'translate(0px,0px)';
            this.pageNum = 1;
        } else if (index % this.pageSize === 0){
            let dis = this.pageNum * this.pageSize * this.width;
            this.thumbWrapper[0].style.transition = '-webkit-transform 500ms ease';
            this.thumbWrapper[0].style.webkitTransform = 'translate(' + -dis + 'px,0px)';
            this.pageNum++;
        }
        this.currentThumb.removeClass('current');
        nextThumb.addClass('current');
        this.currentThumb = nextThumb;
    }
    showPrev(){
        let isFist = false;
        let prev = this.activeItem.prev();
        let prevThumb = this.currentThumb.prev();
        if (!prev.length) {
            prev = this.items.last();
            prevThumb = this.thumbs.last();
            isFist = true;
        }
        this.activeItem.addClass('fade').removeClass('active');
        prev.removeClass('fade').addClass('active');
        this.activeItem = prev;
        // 缩略图
        let index = this.currentThumb.index();
        if (isFist) {
            this.pageNum = Math.ceil(this.thumbs.length / this.pageSize);
            let dis = (this.pageNum - 1) * this.pageSize * this.width;
            this.thumbWrapper[0].style.transition = '-webkit-transform 500ms ease';
            this.thumbWrapper[0].style.webkitTransform = 'translate(' + -dis + 'px,0px)';
        } else if (index % this.pageSize === 0){
            let dis = (this.pageNum - 2) * this.pageSize * this.width;
            this.thumbWrapper[0].style.transition = '-webkit-transform 500ms ease';
            this.thumbWrapper[0].style.webkitTransform = 'translate(' + -dis + 'px,0px)';
            this.pageNum--;
        }
        console.log(this.pageNum)
        this.currentThumb.removeClass('current');
        prevThumb.addClass('current');
        this.currentThumb = prevThumb;
    }
}