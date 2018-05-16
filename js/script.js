$(function(){
    $( document ).ready(function() {

        $("#phone").mask("+375 (99) 999-99-99");

        $(".form__input_checkbox").on("change", function(){
            if($(this).prop("checked")) {
                $('.wrapper-check').addClass('opacity');
            }
            else {
                $('.wrapper-check').removeClass('opacity');
            }
        });

        if ($(window).width() < 1199){
            $('.book_prev').hide();
        }

        $(window).on('resize', function(){
            console.log($(window).width())
            if ($(window).width()<= 1199) {
                $('.p').eq(counter).addClass('flip');
                if (counter <= 2){
                    $('.book_prev').hide();
                }
            }
            else{
                $('.p').eq(counter).removeClass('flip');
                $('.book_prev').show();
            }
        });

        $('.use__more').on('click', function(){
            ga('send', 'event', 'download', 'manual');
        });

        $('.logo a').on('click', function(){
            ga('send', 'event', 'nav', 'site-go', 'main');
        });
        
        $('.stories__iframe').on('click', function(){
            //тут нужно айдишники/номера видосов повесить на айфреймы
            //готово
            var videoId = $(this).data('id');
            ga('send', 'event', 'nav', 'vide-click', videoId);
        });
        
        $('.reviews__link').on('click', function(){
            var outGoLink = $(this).data('link');
            //тут нужна ссылка на другой рес по формату
            ga('send', 'event', 'nav', 'out-go', outGoLink );
        });

        //slider

        var countForMob = 0;

        $('.mobile .mobile_pict>img').addClass('non_active_slide_right');
        $('.mobile .mobile_pict>img').eq(countForMob).addClass('active_slide').removeClass('non_active_slide_right');

        $('.mobile .book_next').on('click', function(){
            $('.mobile .mobile_pict>img').eq(countForMob).removeClass('active_slide').addClass('non_active_slide_left');
            countForMob++;
            $('.mobile .mobile_pict>img').eq(countForMob).addClass('active_slide').removeClass('non_active_slide_right');
        });

        $('.mobile .book_prev').on('click', function(){
            $('.mobile .mobile_pict>img').eq(countForMob).removeClass('active_slide').addClass('non_active_slide_right');
            countForMob--;
            $('.mobile .mobile_pict>img').eq(countForMob).addClass('active_slide').removeClass('non_active_slide_left');
        });

        //

        var percentToSend = 0;
        $(document).on('scroll', function(){
            var docHeight = $(document).height();
            var scrollTop = $(window).scrollTop() + $(window).height();
            var percentOfScrolling = scrollTop/docHeight;
            
            if ((percentOfScrolling >= .25)&&(percentToSend == 0)){
                percentToSend = 25;
                ga('send', 'event', 'nav', 'scroll', percentToSend);
                // console.log(percentToSend);
            }
            else if ((percentOfScrolling >= .5)&&(percentToSend == 25)){
                percentToSend = 50;
                ga('send', 'event', 'nav', 'scroll', percentToSend);
            } 
            else if ((percentOfScrolling >= .75)&&(percentToSend == 50)){
                percentToSend = 75;
                ga('send', 'event', 'nav', 'scroll', percentToSend);
                // console.log(percentToSend);
            }
            else if ((percentOfScrolling >= .95)&&(percentToSend == 75)){
                percentToSend = 95;
                ga('send', 'event', 'nav', 'scroll', percentToSend);
            }
        });

        $('.step-list a').on('click', function(){
            return false;
        });

        $('.arrow_down').click(function () {
            $('html,body').animate({
                scrollTop: $( '.manual' ).offset().top
            }, 500);

            return false;
        });

        var page = '';
        if(window.location.href.indexOf("cache") > -1) {
            
            var curPath = window.location.href;
            curPath = curPath.toString();
            page = curPath.match(/cache=(.*)/)[1];
        }
        
        // $('.mobile_pict').slick();
        


        var counter = 1;
        var halfTime = 500;

        if ($(window).width()<= 1199) {
            $('.p').eq(counter).addClass('flip');
            $('.use__article_capt').on('click', function(){
                if ($(this).hasClass('opened')) {
                    // $(this).closest('.use__article_spoil').children("p").hide();
                    $(this).removeClass('opened');
                }
                else{
                    // $(this).closest('.use__article_spoil').children("p").show();
                    $(this).addClass('opened');
                }
            });
        }
        else{
            $('.p').eq(counter).removeClass('flip');
        }


        $('.book_next').click(function(e){

          e.preventDefault();
          //тут нужно повесить на кнопку айди истории(или текущей или следующей/предыдующей), я в душе не ебу, надо уточнить
          var storyId = $(this).data('id');
          console.log(storyId)
          ga('send', 'event', 'nav', 'arrow-click', storyId);
          if ($(window).width() < 1199){
                $('.book_prev').show();
                var numberOfPages = $('.p').length - 4;
                if (counter == numberOfPages) {
                    $('.book_next').hide();
                }
            }
          // if (counter>=3) counter = 3;
          $('.p').eq(counter+1).addClass('flip');
          if ($(window).width() > 1199){
            setTimeout(function() {
                var counterMinusOne = counter - 1;
                $('.p').eq(counterMinusOne).addClass('fliped');
            }, halfTime);
          }
          else{
            $('.p').eq(counter).addClass('fliped');
          }
          // setTimeout(function() {
          //       var counterMinusOne = counter - 1;
          //       $('.p').eq(counterMinusOne).addClass('fliped');
          // }, halfTime);
          $('.p').eq(counter-1).css('transform', 'rotateY(-176deg)');
          $('.p').eq(counter).css('transform', 'rotateY(-175deg)');
          $('.p').eq(counter+1).css('transform', 'rotateY(-2deg)');
          $('.p6').css('transform', 'rotateY(0deg)');
          counter++;
        });

        $('.book_prev').click(function(e){
            e.preventDefault();
            // и тут
            var storyId = $(this).data('id');
            console.log(storyId)
            ga('send', 'event', 'nav', 'arrow-click', storyId);
            if (($(window).width() < 1199)&&(counter <= 2)){
                $('.book_prev').hide();
            }
            if ($(window).width() < 1199) {
                $('.book_next').show();
            }
            // counter--;  
            // if (counter<=1) counter = 1;
            $('.p').eq(counter).removeClass('flip');

            if ($(window).width() > 1199){
                setTimeout(function() {
                    $('.p').eq(counter).removeClass('fliped');
                }, halfTime); 
            }
            else{
                var counterMinusOne = counter - 1;
                $('.p').eq(counterMinusOne).removeClass('fliped');
            }
            counter--; 
            
            // $('.p').eq(counter-1).css('z-index', 10);
            // $('.p').eq(counter-2).css('z-index', 0);
            // $('.p').eq(counter).css('z-index', 10);
            // $('.p').eq(counter+1).css('z-index', 0);
            // $('.p1').css('z-index', 2);
            $('.p').eq(counter-1).css('transform', 'rotateY(-175deg)');
            $('.p').eq(counter).css('transform', 'rotateY(-2deg)');
            $('.p').eq(counter+1).css('transform', 'rotateY(-1deg)');
            $('.p1').css('transform', 'rotateY(-176deg)');
        });

        var pageNumber = $('.p h2').length;
        $('.p h2').each(function(index){
            var zIndex = pageNumber - index;
            $(this).closest('.p').attr('data-index', index);
            $('.alphabet').append("<a class='alphabet-list__item' style='z-index:"+zIndex+"' data-index = " + index + " href=''>" + $(this).text().charAt(0) + "</a>");
            // $(this).closest('.alphabet-list__item').css('z-index','1');
        });

        $(document).on('click', '.alphabet a', function(e){
            var firstLetter = $(this).text().charAt(0);
            ga('send', 'event', 'nav', 'letter-click', firstLetter);
            e.preventDefault();
            var dataIndex = $(this).data('index');
            var dataIndexMinusOne = dataIndex - 1;
            counter = dataIndex;
            console.log(counter)
            $('.p').removeClass('flip').css('transform', 'rotateY(-1deg)');
            $('.p1').css('transform', 'rotateY(-176deg)');

            for (var i = 0; i<dataIndex; i++){
                $('.p[data-index="' + i + '"]').addClass('flip').css('transform', 'rotateY(-176deg)');
            }

            setTimeout(function() {
                $('.p').removeClass('fliped');
                $('.p1').addClass('fliped').addClass('flip');
                for (var i = 0; i<dataIndex; i++){
                    $('.p[data-index="' + i + '"]').addClass('fliped');
                }
            }, halfTime); 

            $('.p[data-index="' + dataIndex + '"]').css('transform', 'rotateY(-2deg)');
            $('.p[data-index="' + dataIndexMinusOne + '"]').css('transform', 'rotateY(-175deg)');
            // $('.p[data-index="' + counter + '"]').css('z-index', 0);
            counter++;
        });

        $('.rules').click(function(){
            ga('send', 'event', 'download', 'rules', 'пытались скачать правила');
        })

        var cc = 'true';
        $(window).on('scroll', function(e){
            if($('.manual').length){
                var offTop = $('.manual').offset().top - $(window).height()/2;
                var offTopPlusHeight = offTop + $('.manual').height() + $(window).height()/4;
                
                // console.log(offTop,offTopPlusHeight)
                if (($(window).scrollTop()>=offTop)&&($(window).scrollTop()<=offTopPlusHeight)) {
                    $('.manual').addClass('an');
                    
                    // console.log('lol')
                    if (cc=='true') {
                        var tween,
                        opacity = false,
                        motionPath = MorphSVGPlugin.pathDataToBezier("#motionPath", {align:"#balloon"});

                        TweenLite.set("#balloon", {xPercent:-20, yPercent:-20});
                      
                        tween = TweenLite.to("#balloon", 2, {bezier:{values:motionPath, type:"cubic"}});
                        cc = 'false';
                    }
                }
                else{
                    $('.manual').removeClass('an');
                    cc='true';
                }
                return cc;
            }
        });
            // $('.manual').addClass('an');


        if (page.length>1){
            var dataIndex = $('.p[data-page="'+ page +'"').data('index');
            console.log(dataIndex)
            var dataIndexMinusOne = dataIndex - 1;
            counter = dataIndex;
            console.log(counter)
            $('.p').removeClass('flip').css('transform', 'rotateY(-1deg)');
            $('.p1').css('transform', 'rotateY(-176deg)');

            for (var i = 0; i<dataIndex; i++){
                $('.p[data-index="' + i + '"]').addClass('flip').css('transform', 'rotateY(-176deg)');
            }

            setTimeout(function() {
                $('.p').removeClass('fliped');
                $('.p1').addClass('fliped').addClass('flip');
                for (var i = 0; i<dataIndex; i++){
                    $('.p[data-index="' + i + '"]').addClass('fliped');
                }
            }, halfTime); 

            $('.p[data-index="' + dataIndex + '"]').css('transform', 'rotateY(-2deg)');
            $('.p[data-index="' + dataIndexMinusOne + '"]').css('transform', 'rotateY(-175deg)');
            counter = dataIndex + 1;
        }


        var Modules = (function(self){
            
            return self; 
        }(Modules || {}));
// ---------------------------------------  PubSub  -------------------------------------------
        Modules.PubSub = (function(self, $){
            var _events = {};

            self.subscribe = function(eventName, fn){
                _events[eventName] = _events[eventName] || [];
                _events[eventName].push(fn);

                return self;
            }

            self.unsubscribe = function(eventName, fn) {
                if (_events[eventName]) {
                    for (var i = 0; i < _events[eventName].length; i++) {
                        if (_events[eventName][i] === fn) {
                            _events[eventName].splice(i, 1);
                            break;
                        }
                    }
                }

                return self;
            }

            self.publish = function(eventName, data){
                if (_events[eventName]) {
                    _events[eventName].forEach(function(fn) {
                        fn(data);
                    });
                }

                return self;
            }

            return {
                subscribe: function(eventName, fn){
                    return self.subscribe(eventName, fn);
                },
                unsubscribe: function(eventName, fn){
                    return self.unsubscribe(eventName, fn);
                },
                publish: function(eventName, data){
                    return self.publish(eventName, data);
                }
            }
        }(Modules.PubSub || {}, jQuery));

Modules.Preloader = (function(self, $){

    var _settings = {
        sectionItemClass: '',
        logoItemId: '',
        logoItemActiveClass: '',
        bodyItemActiveClass: ''
    },
    _data = {
        $sectionItem: '',
        $body: '',
        $logoItem: ''
    };
    // Module constructor
    self._construct = function(params){
        $.extend(_settings, params);
        _data.$body = $('body');
        _data.$sectionItem = $( _settings.sectionItemClass );
        _data.$logoItem = $( _settings.logoItemId );

        self._startAnimation();

        return self;
    }

    self._startAnimation = function(){
        $('html').css({});
        _data.$logoItem.attr('class', _settings.logoItemActiveClass);

        setTimeout(function() {
            _data.$sectionItem.fadeOut(700, function() {
                _data.$sectionItem.remove();
                // Modules.PubSub.publish('preloaderEnd', 0);
            });

            _data.$body.removeClass(_settings.bodyItemActiveClass);
            var hash = window.location.hash;
            console.log(hash)
            if ( hash != "#reviews" ) {
               $('html, body').scrollTop(0); 
            }
            else{
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                },500);
            }

            if($(window).width() <= 1199){
                $('.page-template-main-page footer').css('margin-top', $('.footer .disclaimer').height() + 10);
            }

            $(window).on('resize', function(){
                if($(window).width() <= 1199){
                    $('.page-template-main-page footer').css('margin-top', $('.footer .disclaimer').height() + 10);
                }else{
                     // $('footer').css('margin-top', 'auto');   
                }
            })
            
            // if ($(window).width()<=1366) {
            //     $('.stories, .fp_foo').css('margin-left', '0');
            //     $('.stories, .fp_foo').css('width', '100%');
            //     $('.fp_foo .footer').css('margin-left', '0');
            // }
            // else{
            //     $('.stories, .fp_foo').css('width', $(window).width() + 'px');
            //     $('.stories, .fp_foo').css('margin-left', -$('body').offset().left);
            //     $('.fp_foo .footer').css('margin-left', $('body').offset().left);
            // }

            wow = new WOW(
              {
                animateClass: 'animated',
                offset:       0,
                callback:     function(box) {
                  console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
                }
              }
            );
            wow.init();
        }, 1600);


        return self;
    }

    return {
        init: function(params){
            self._construct(params);

            return self;
        }
    }
}(Modules.Preloader || {}, jQuery));

// ----------------------------------------  PopUp  ----------------------------------------------------
            function PopUp(_className){

                // this.domElement = $('.' + _className);

                this.show = function(){
                    this.domElement = $('.' + _className);

                    this.domElement.addClass('leftMore');
                    this.domElement.on('animationed webkitAnimationEnd oAnimationEnd', function () {
                        $(this).removeClass('leftMore');
                        $(this).removeClass('left-less');
                        $(this).addClass('left-more');
                    });
                }

                this.hide = function() {
                    this.domElement = $('.' + _className);

                    this.domElement.addClass('leftLess');
                    this.domElement.on('animationed webkitAnimationEnd oAnimationEnd', function () {
                        $(this).removeClass('leftLess');
                        $(this).removeClass('left-more');
                        $(this).addClass('left-less');
                    });
                }

            };
// --------------------------------  PopUp_participation  -----------------------------------------------
            function PopUp_participation(_className) {

                PopUp.apply(this, arguments);

                var popUp_participation = {};

                popUp_participation.__proto__ = PopUp();

                this.clickConfirm = function clickConfirm() {
                    this.hide();
                    Modules.PubSub.publish('clickOnConfirm');
                }

                return this
            };
// ------------------------------------  PopUp_social  ------------------------------------------------
            function PopUp_social(className) {

                PopUp.apply(this, arguments);

                var popUp_social = {};

                popUp_social.__proto__ = PopUp();

                this.subscribe = function subscribe(){
                    Modules.PubSub.subscribe('clickOnConfirm', this.show);
                }

                this.clickSocial = function clickSocial(){
                    this.hide();
                    Modules.PubSub.publish('clickOnSocial');
                }

                return this
            };
// --------------------------------  PopUp_congratulation  -----------------------------------------------
            function PopUp_congratulation(className) {

                PopUp.apply(this, arguments);

                var popUp_congratulation = {};

                popUp_congratulation.__proto__ = PopUp();

                this.subscribe = function subscribe() {
                    Modules.PubSub.subscribe('clickOnSocial', this.show);
                }

                this.clickCongratulation = function clickCongratulation() {
                    this.hide();
                    closePopUp();
                }

                return this
            };

        var participation = new PopUp_participation('pop-up-participation');
        var social = new PopUp_social('pop-up-social');
        social.subscribe();
        var congratulation = new PopUp_congratulation('pop-up-congratulation');
        congratulation.subscribe();


        $('.competition').click(function(e){
            e.preventDefault();
            openPopUp();
            participation.show();
        });

        var flag = true;
        var url2 = '';
        var title2 = '';
        var img2 = '';
        var desc2 = '';
        var id2 = '';

        $('.green-button').click(function(e){
            e.preventDefault();
            openPopUp();
            ga('send', 'event', 'nav', 'contest-0');
            flag = false;
            participation.show();

            url2 = $(this).data('url');
            id2 = $(this).data('id');
            title2 = $(this).data('title');
            desc2 = $(this).data('description');
            img2 = $(this).data('img');
            // return url2;
        });
        // console.log(url2)
        // function second_passed() {
        //   console.log(url2)
        // }
        // setTimeout(second_passed, 10000)


        

        // $(window).on('resize', function(){
        //     if ($(window).width()<=1366) {
        //         $('.stories, .fp_foo').css('margin-left', '0');
        //         $('.stories, .fp_foo').css('width', '100%');
        //         $('.fp_foo .footer').css('margin-left', '0');
        //     }
        //     else{
        //         $('.stories, .fp_foo').css('width', $(window).width() + 'px');
        //         $('.stories, .fp_foo').css('margin-left', -$('body').offset().left);
        //         $('.fp_foo .footer').css('margin-left', $('body').offset().left);
        //     }
        // });


        // $('img').on('mouseover', function(){
        //     $(this).addClass('hovered')
        // })

        $('.list-of-places__item a').on('click', function(e){
            // e.preventDefault();
            var pathToBuy = $(this).data('path');
            //тут нужно ссылкам на магазы добавить дата путь в формате что бы подходил ниже на одну строку 'http://' +
            //готово
            ga('send', 'event', 'nav', 'buy-go', pathToBuy);
        })
        $('.pop-up__cross').click(function(e){
            e.preventDefault();
            $('.pop-up').removeClass('left-more');
            $('.pop-up').addClass('left-less');
            closePopUp();
        });
        $('.transparency').click(function(){
            $('.pop-up').removeClass('left-more');
            $('.pop-up').addClass('left-less');
            closePopUp();
        });
        $('.form__button').click(function(e){
            e.preventDefault();
            // console.log(url2, id2)
            ga('send', 'event', 'nav', 'contest-1-submit', 'TRY');
            if(checkFormClick()){
                participation.clickConfirm();
            }
            else {
                $('.pop-up__paragraph').css({'opacity' : '1'});
            }
            var tel_number = $('.form__input_text').val();
            
            // var url_ajax = '';
            // if(window.location.pathname != '/')
            // {
            //     url_ajax = '../wp-admin/ajax-competition.php'
            // }
            // else{
            //     url_ajax = 'wp-admin/ajax-competition.php'
            // }

            if (tel_number.length == 19) {
                $.ajax({
                 url: document.location.origin+'/wp-admin/ajax-competition.php',
                 data: {
                    phone: tel_number,
                    url: url2,
                    id: id2
                },
                 type: 'POST'
                }).done(function(data){
                 console.log(data);
                 ga('send', 'event', 'nav', 'contest-1-submit', 'OK');
                }).fail(function(){
                 console.log('error');
                });
            }
            
        });

        $('.reviews__all-reviews').on('click', function(){
            ga('send', 'event', 'nav', 'site-go', 'review');
        });

        $('.owl-prev, .owl-next').on('click', function(){
            ga('send', 'event', 'nav', 'arrow-click', 'review');
            //тут ничего не написано про истории, но уточни на всякий, нужно ли тут через дата атрибут что-нибудь забирать из истории
        })

        $('.pop-up-list__item a').click(function(e) {
            social.clickSocial();
            e.preventDefault();
            var socId = $(this).data('id');
            //тут тоже социальки большими должны быть
            ga('send', 'event', 'social', 'contest-2-share', socId);
        });

        $('.pop-up__link-back').click(function() {
            congratulation.clickCongratulation();
        })

        function openPopUp() {
            $('body').addClass('overflow');
            $('.transparency').addClass('display');
        }

        function closePopUp(){
            $('body').removeClass('overflow');
            $('.transparency').removeClass('display');
            
            $('.pop-up__paragraph').css({'opacity' : '0'});
            $('.form__input_checkbox').prop("checked", false);
            $('.form__input_text').val("");
            $('.wrapper-check').removeClass('opacity');
        }

        function checkFormClick() {
            if($('.form__input_checkbox').is(":checked")) {
                if(isValidPhone($('.form__input_text').val())) {
                    return true                   
                }
                return false
            }
            return false            
        }        


        function isValidPhone(myPhone) { 
           // return /^(\+375) \((29|25|44|33|17)\) (\d{3})-(\d{2})-(\d{2})$/.test(myPhone);
            if(myPhone.length){
                return true; 
                $('.popup_input__wrap').removeClass('wrong_number');
                $('.pop-up__paragraph').css({'visibility' : 'visible'});
            }
            else{
                $('.popup_input__wrap').addClass('wrong_number');
                $('.pop-up__paragraph').css({'visibility' : 'hidden'});
                return false;
            }
        }
// ----------------------------------------------------------------------------------------------------------------


var cubeShare = {
        width: 600,
        height: 400,

        init: function() {

            var url = $('[property="og:url"]').attr('content');
            var title = $('[property="og:title"]').attr('content');
            var desc = $('[property="og:description"]').attr('content');
            var img = $('[property="og:image"]').attr('content');
            var share = document.querySelectorAll('.share-btn');
            
            for(var i = 0, l = share.length; i < l; i++) {
                var el = share[i].querySelectorAll('a');
                for(var a = 0, al = el.length; a < al; a++) {
                    var id = el[a].getAttribute('data-id');
                    if(id)
                        this.addEventListener(el[a], 'click', {id: id, url: url, title: title, desc: desc, img:img});
                }
            }
        },

        addEventListener: function(el, eventName, opt) {            
            var _this = this, handler = function(e) {
                e.preventDefault();
                // console.log(id)
                
                $('.pop-up').removeClass('left-more');
                $('.pop-up').addClass('left-less');
                closePopUp();
                _this.share(opt.id, opt.url, opt.title, opt.desc, opt.img);
            };

            if(el.addEventListener) {
                el.addEventListener(eventName, handler);
            } else {
                el.attachEvent('on' + eventName, function() {
                    handler.call(el);
                });
            }
        },

        share: function(id, url, title, desc, img) {
            url = encodeURIComponent(url);
            desc = encodeURIComponent(desc);
            title = encodeURIComponent(title);
            img = encodeURIComponent(img);
            // тут нужно айди большими буквами (FB/VK), сейчас маленькими
            ga('send', 'event', 'social', 'footer-share', id);

            if (!flag){
                url = encodeURIComponent(url2);
                desc = encodeURIComponent(desc2);
                title = encodeURIComponent(title2);
                img = encodeURIComponent(img2); 
            }

            // console.log(title, img, url);

            switch(id) {
                case 'fb':
                    this.popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + url, title, this.width, this.height);
                    break;

                case 'vk':
                    this.popupCenter('https://vk.com/share.php?url=' + url + '&title=' + title + '&description=' + desc + '&image=' + img, title, this.width, this.height);
                    break;

                case 'tw':
                    this.popupCenter('https://twitter.com/share?url=' + url + '&title=' + title + '&description=' + desc + '&image=' + img, title, this.width, this.height);
                    break;

                case 'ok':
                    this.popupCenter('http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1?&st._surl=' + url + '&st.comments=' + title + '. ' + desc, title, this.width, this.height);
                    break;

                default:
                    break;
            };
        },

        newTab: function(url) {
            var win = window.open(url, '_blank');
            win.focus();        
        },

        popupCenter: function(url, title, w, h) {
            var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
            var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

            var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
            
            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
            var top = ((height / 3) - (h / 3)) + dualScreenTop;

            var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            if (window.focus) {
                newWindow.focus();
            }
        }
    };

    cubeShare.init();


// ----------------------------------------------------------------------------------------------------------------
        var needHeight = $('.top').css('height').slice(0, -2);
        var needWidth = $('.top').css('width').slice(0, -2);

        $( window ).resize(function() {

            // window.setTimeout('location.reload()', 100);

            needHeight = $('.top').css('height').slice(0, -2);
            needWidth = $('.top').css('width').slice(0, -2);

            // $('#magazine').turn({
            //     height: needHeight/100*80,
            //     width: needWidth/100*90,
            //     page: 2
            // });

            if(screen.width < 1200){
                $('.pages.shadows').removeAttr('id');
            }
        });

        var owlSlider = $('.owl-carousel.list-of-reviews').owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            touchDrag: false,
            mouseDrag: false,
            smartSpeed: 250
        });

        var preloader = new Modules.Preloader.init({
            sectionItemClass: '.section--first',
            logoItemId: '#defender',
            logoItemActiveClass: 'pt-page-bounceIn',
            bodyItemActiveClass: 'body_noscroll'
        });

        if(screen.width < 1200){
            $('.pages.shadows').removeAttr('id');
        }

        // $('#magazine').turn({
        //     height: needHeight/100*80,
        //     width: needWidth/100*90,
        //     page: 2
        // });

        // $("#magazine").bind("turning", function(event, page, view) {
        //   if (page==1) {
        //     event.preventDefault(); //will not happen at page 1
        //   }
        // });

        // $('.book_prev').click(function(){
        //     event.preventDefault();
        //     $('#magazine').turn('previous');
        // });

        // $('.book_next').click(function(){
        //     event.preventDefault();
        //     $('#magazine').turn('next');
        // });


    });
});