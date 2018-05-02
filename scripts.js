$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
      current_progress += 1;
      $("#myBar")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      if (current_progress >= 80)
          clearInterval(interval);
  }, 2);
});