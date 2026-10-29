$(function(){
    new WOW().init(); 
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
      if (current_progress >= 90)
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