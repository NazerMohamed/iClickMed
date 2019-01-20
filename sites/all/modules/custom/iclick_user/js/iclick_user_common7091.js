(function($){
    jQuery(document).ajaxSuccess(function(e) {
           jQuery('#covercarousel').flexslider({
               animation: "slide",
               directionNav: false,
               slideshow: false
           });

           
           var $filter = $('#block-views-testimonial-about-us-page-block .view-header');
           $filter.unbind('click').on('click', function() {
               $(this).children('p').html('Cancel');
               $(this).next('.view-filters').slideToggle();
               $('#block-views-testimonial-about-us-page-block .view-content').slideToggle();
           });

       });
})(jQuery);
    