"use strict";


class ScrollSpy {
    constructor() {
        this.dataName = {
            navParent: 'affix-parent',
            navLink: 'nav-link',
            navItem: 'nav-item',
        }
        this.navParrent = document.querySelector(`data-${this.dataName.navParent}`)
        this.init()
    }

    init(){
        this.addEvent()
        $('body').scrollspy({ target: '[data-affix-parent]', offset: 150 })

        let navLink = $(`[data-${this.dataName.navLink}]`),
            navItem = $(`[data-${this.dataName.navItem}]`)


        navLink.bind('cssClassChanged' , function(e) {
            navItem.each( function() {
                if( $(this).hasClass("active") === true ) {
                    $(this).removeClass("active");
                }
            });

            $(this).removeClass("active").parent().addClass("active");
        });


        navLink.click(function(){
            let divId = $(this).attr('href')
            $('html, body').animate({
                scrollTop: $(divId).offset().top - 100
            }, 100)
        })
    }

    // Новое событие для отслеживания смены активного класса
    addEvent(){
        let originalAddClassMethod = jQuery.fn.addClass
        jQuery.fn.addClass = function(){
            let result = originalAddClassMethod.apply( this, arguments )
            jQuery(this).trigger('cssClassChanged')
            return result
        }
    }
}

export default ScrollSpy;

