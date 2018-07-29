(function($){'use strict';$('.preloader-wrapper').on('click',function(){$(this).fadeOut(700)});$('.preloader-wrap-for-page').on('click',function(){$(this).fadeOut(700)});$(window).on('load',function(){if($('.preloader-wrapper').length){setTimeout(function(){$('.preloader-wrapper').fadeOut(500);textAnimation();textAnimationBottom()},2000)}else{setTimeout(function(){$('.preloader-wrap-for-page').fadeOut(500);textAnimation();textAnimationBottom()},500)}
if($('.grid').length){var $masonry=$('.grid').masonry({horizontalOrder:!0,})}
function textAnimation(){var waypoints=$('.animation-item').waypoint({handler:function(){$(this.element).removeClass("left-animation");$(this.element).removeClass("right-animation")},offset:'90%'})}
function textAnimationBottom(){var waypoints=$('.animation-item-bottom').waypoint({handler:function(){$(this.element).removeClass("left-animation");$(this.element).removeClass("right-animation")},offset:'bottom-in-view'})}});$(document).ready(function(){var servicessTabHash=window.location.hash;$('.services-tabs .nav-link[href="'+servicessTabHash+'"]').tab('show');$(document).on("click",".page-redirect",function(e){e.preventDefault();$("body").fadeOut(500);var self=this;setTimeout(function(){window.location.href=$(self).attr("href")},500)});$(window).on('scroll',function(){if($(this).scrollTop()>0){$('.header-container').addClass('filled');$('.header-container').addClass("small");$(".btn-arrow-fixed").addClass('btn-visible')}else{if(!$(".navbar-collapse").hasClass("show")){$('.header-container').removeClass('filled')}
$('.header-container').removeClass("small");$(".btn-arrow-fixed").removeClass('btn-visible')}})
var topLineHeight=$('.header').outerHeight();$(".header-home .navbar .nav-item").on("click","a",function(event){event.preventDefault();var id=$(this).attr('href'),top=$(id).offset().top-topLineHeight;$('body,html').animate({scrollTop:top},1000)});$('.btn-arrow-fixed').on('click',function(){$('body,html').animate({scrollTop:0},1000);return!1});var widthScroll;function getScrollBarWidth(){var $outer=$('<div>').css({visibility:'hidden',width:100,overflow:'scroll'}).appendTo('body'),widthWithScroll=$('<div>').css({width:'100%'}).appendTo($outer).outerWidth();$outer.remove();widthScroll=100-widthWithScroll;return 100-widthWithScroll};getScrollBarWidth();$('.gallery-items-wrap').slickLightbox({itemSelector:'.gallery-photo',navigateByKeyboard:!0,background:"rgba(255,255,255,.9)",}).on({'show.slickLightbox':function(){$('body').addClass('no-scroll');$('body, .header, .bg-grid').css("padding-right",widthScroll)},'hide.slickLightbox':function(){$('body').removeClass('no-scroll');$('body, .header, .bg-grid').css("padding-right",0)}});$('input:not([type="submit"]) , textarea').on('blur',function(){if(!$(this).val()){$(this).removeClass('active')}else{$(this).addClass('active')}});$(".textarea-triangle > textarea").on('focus',function(){$(".textarea-triangle").addClass('triangle-fill')});$(".textarea-triangle > textarea").on('focusout',function(){$(".textarea-triangle").removeClass('triangle-fill')});$('#main_navbar').on('show.bs.collapse',function(){$('.navbar-toggler').addClass("open-menu");$('.header-container').addClass("filled")})
$('#main_navbar').on('hide.bs.collapse',function(){$('.navbar-toggler').removeClass("open-menu");if(!$(".header-container").hasClass("small")){$('.header-container').removeClass("filled")}})
$(".main").on('click',function(){$('#main_navbar').collapse('hide')});var stopFunction=!1;function barsAnimation(){if(stopFunction==!1){var barsDuration=3500;stopFunction=!0;$('.skills-bars .skills-bars-item').each(function(){var $percent=$(this).find(".bar-strip-fill").attr('data-percentage');$(this).find('.bar-strip-fill').animate({width:$percent+"%"},barsDuration);var $numberItem=$(this).find(".percent");$({Counter:0}).animate({Counter:$percent},{duration:barsDuration,easing:'swing',step:function(){$numberItem.text(Math.ceil(this.Counter))}})})}}
var waypoints=$('.skills-bars').waypoint({handler:function(){barsAnimation()},offset:'80%'})
$.each($('.js-count-up-number'),function(){var options={useEasing:!0,useGrouping:!0,separator:'',decimal:'.',};var count=$(this).data('count'),numAnim=new CountUp(this,0,count,0,5,options);var waypoints=$('.achievements-item').waypoint({handler:function(direction){numAnim.start()},offset:'80%'})});var map;function initMap(){function CustomMarker(latlng,map,args){this.latlng=latlng;this.args=args;this.setMap(map)}
CustomMarker.prototype=new google.maps.OverlayView();CustomMarker.prototype.draw=function(){var self=this;var div=this.div;if(!div){div=this.div=document.createElement('div');div.className='html-marker';div.style.position='absolute';div.style.cursor='pointer';div.style.width='12px';div.style.height='12px';div.style.background='#E80000';if(typeof(self.args.marker_id)!=='undefined'){div.dataset.marker_id=self.args.marker_id}
google.maps.event.addDomListener(div,"click",function(event){google.maps.event.trigger(self,"click")});var panes=this.getPanes();panes.overlayImage.appendChild(div)}
var point=this.getProjection().fromLatLngToDivPixel(this.latlng);if(point){div.style.left=(point.x-6)+'px';div.style.top=(point.y-12)+'px'}};CustomMarker.prototype.remove=function(){if(this.div){this.div.parentNode.removeChild(this.div);this.div=null}};CustomMarker.prototype.getPosition=function(){return this.latlng};var mapMarkerPosition=new google.maps.LatLng(37.779287,-122.429109);map=new google.maps.Map(document.getElementById('map'),{center:mapMarkerPosition,zoom:15,disableDefaultUI:!0,zoomControl:!1,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_CENTER},styles:[{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]});var center=map.getCenter();google.maps.event.addDomListener(window,"resize",function(){google.maps.event.trigger(map,"resize");map.setCenter(center)});var overlay=new CustomMarker(mapMarkerPosition,map,{marker_id:'123'})}
if($('#map').length){initMap()}})}(jQuery))