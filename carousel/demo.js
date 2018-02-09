var Carousel = /** @class */ (function () {
    function Carousel(options) {
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
    Carousel.prototype.bindEvent = function () {
        var self = this;
        this.prev.on('click', function () {
            self.playing = false;
            self.stop();
            self.showPrev();
        });
        this.next.on('click', function () {
            self.playing = false;
            self.stop();
            self.showNext();
        });
        this.thumbs.on('click', function () {
            var thumb = $(this);
            self.playing = false;
            self.stop();
            self.currentThumb.removeClass('current');
            thumb.addClass('current');
            self.currentThumb = thumb;
            var index = thumb.index();
            var item = self.items.eq(index);
            self.activeItem.addClass('fade').removeClass('active');
            item.removeClass('fade').addClass('active');
            self.activeItem = item;
        });
        this.control.on('click', function () {
            self.playing = true;
            self.videoElem.play();
            self.control.addClass('fade');
            self.stop();
        });
        $(this.videoElem).on('play', function () {
            console.log('play');
            self.playing = true;
            self.control.addClass('fade');
            self.stop();
        });
        $(this.videoElem).on('ended', function () {
            console.log('ended');
            self.resume();
        });
        $(this.videoElem).on('pause', function () {
            setTimeout(function () {
                if (self.seeking) {
                    self.seeking = false;
                    return;
                }
                console.log('pause');
                self.resume();
            }, 0);
        });
        $(this.videoElem).on('seeked', function () {
            console.log('seeked');
        });
        $(this.videoElem).on('seeking', function () {
            console.log('seeking');
            self.seeking = true;
        });
    };
    Carousel.prototype.start = function () {
        var self = this;
        this.timer = setInterval(function () {
            self.showNext();
        }, this.interval);
    };
    Carousel.prototype.stop = function () {
        var self = this;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.restart) {
            console.log(typeof this.restart);
            clearTimeout(this.restart);
            this.restart = null;
        }
        this.restart = setTimeout(function () {
            if (!self.timer && !self.playing) {
                self.start();
            }
        }, this.interval);
    };
    Carousel.prototype.resume = function () {
        this.playing = false;
        this.control.removeClass('fade');
        if (!this.timer) {
            this.start();
        }
    };
    Carousel.prototype.showNext = function () {
        var isEnd = false;
        var next = this.activeItem.next();
        var nextThumb = this.currentThumb.next();
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
        var index = this.currentThumb.index() + 1;
        if (isEnd) {
            this.thumbWrapper[0].style.transition = '-webkit-transform 500ms ease';
            this.thumbWrapper[0].style.webkitTransform = 'translate(0px,0px)';
            this.pageNum = 1;
        }
        else if (index % this.pageSize === 0) {
            var dis = this.pageNum * this.pageSize * this.width;
            this.thumbWrapper[0].style.transition = '-webkit-transform 500ms ease';
            this.thumbWrapper[0].style.webkitTransform = 'translate(' + -dis + 'px,0px)';
            this.pageNum++;
        }
        this.currentThumb.removeClass('current');
        nextThumb.addClass('current');
        this.currentThumb = nextThumb;
    };
    Carousel.prototype.showPrev = function () {
        var isFist = false;
        var prev = this.activeItem.prev();
        var prevThumb = this.currentThumb.prev();
        if (!prev.length) {
            prev = this.items.last();
            prevThumb = this.thumbs.last();
            isFist = true;
        }
        this.activeItem.addClass('fade').removeClass('active');
        prev.removeClass('fade').addClass('active');
        this.activeItem = prev;
        // 缩略图
        var index = this.currentThumb.index();
        if (isFist) {
            this.pageNum = Math.ceil(this.thumbs.length / this.pageSize);
            var dis = (this.pageNum - 1) * this.pageSize * this.width;
            this.thumbWrapper[0].style.transition = '-webkit-transform 500ms ease';
            this.thumbWrapper[0].style.webkitTransform = 'translate(' + -dis + 'px,0px)';
        }
        else if (index % this.pageSize === 0) {
            var dis = (this.pageNum - 2) * this.pageSize * this.width;
            this.thumbWrapper[0].style.transition = '-webkit-transform 500ms ease';
            this.thumbWrapper[0].style.webkitTransform = 'translate(' + -dis + 'px,0px)';
            this.pageNum--;
        }
        console.log(this.pageNum);
        this.currentThumb.removeClass('current');
        prevThumb.addClass('current');
        this.currentThumb = prevThumb;
    };
    return Carousel;
}());
