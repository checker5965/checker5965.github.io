$(window).scroll( function(){
  
      /* Check the location of each desired element */
      $("p").each( function(i){
          
          var bottom_of_object = $(this).offset().top + $(this).outerHeight();
          var bottom_of_window = $(window).scrollTop() + $(window).height();
          
          /* If the object is completely visible in the window, fade it it */
          if( bottom_of_window > bottom_of_object ){
              
              $(this).animate({'opacity':'1'},2000);       
          }
      }); 
});
$(window).scroll( function(){
  
  /* Check the location of each desired element */
  $(".fade").each( function(i){
      
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      /* If the object is completely visible in the window, fade it it */
      if( bottom_of_window > bottom_of_object ){
          
          $(this).animate({'opacity':'1'},2000);
              
      }
      
  }); 

});
$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
      current_progress += 1;
      $("#myBarhtml")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      if (current_progress >= 80)
          clearInterval(interval);
  }, 2);
});
$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
      current_progress += 1;
      $("#myBarcss")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      if (current_progress >= 70)
          clearInterval(interval);
  }, 2);
});
$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
      current_progress += 1;
      $("#myBarjava")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      if (current_progress >= 90)
          clearInterval(interval);
  }, 2);
});
$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
      current_progress += 1;
      $("#myBarpython")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      if (current_progress >= 80)
          clearInterval(interval);
  }, 2);
});
$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
      current_progress += 1;
      $("#myBarjq")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      if (current_progress >= 50)
          clearInterval(interval);
  }, 2);
});
$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
      current_progress += 1;
      $("#myBarjs")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      if (current_progress >= 70)
          clearInterval(interval);
  }, 2);
});
$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
      current_progress += 1;
      $("#myBarc")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      if (current_progress >= 80)
          clearInterval(interval);
  }, 2);
});
$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
      current_progress += 1;
      $("#myBargit")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      if (current_progress >= 80)
          clearInterval(interval);
  }, 2);
});
$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
      current_progress += 1;
      $("#myBarwp")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      if (current_progress >= 60)
          clearInterval(interval);
  }, 2);
});