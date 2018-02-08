var Carousel = /** @class */ (function () {
    function Carousel(options) {
        this.interval = options.interval || 5000;
        this.items = $('.item');
        this.activeItem = $('.active');
        this.prev = $('.prev');
        this.next = $('.next');
        this.control = $('.video-control');
        this.videoElem = document.getElementById('movie');
        this.restart = null;
        this.playing = false;
        this.seeking = false;
        this.bindEvent();
        this.start();
    }
    Carousel.prototype.bindEvent = function () {
        var self = this;
        this.prev.on('click', function () {
            self.playing = false;
            self.stop();
            var prev = self.activeItem.prev();
            if (!prev.length) {
                prev = self.items.last();
            }
            self.activeItem.addClass('fade').removeClass('active');
            prev.removeClass('fade').addClass('active');
            self.activeItem = prev;
        });
        this.next.on('click', function () {
            self.playing = false;
            self.stop();
            var next = self.activeItem.next();
            if (!next.length) {
                next = self.items.first();
            }
            self.activeItem.addClass('fade').removeClass('active');
            next.removeClass('fade').addClass('active');
            self.activeItem = next;
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
            var next = self.activeItem.next();
            if (!next.length) {
                next = self.items.first();
            }
            self.activeItem.addClass('fade').removeClass('active');
            next.removeClass('fade').addClass('active');
            self.activeItem = next;
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
    return Carousel;
}());
