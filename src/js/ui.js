$(document).ready(function () {
  /**
   * Add animations to the help button when you mouse over it
   */
  $("#toggle").mouseenter(function () {
    $(".help").toggleClass("help-hidden")
  });

  $("#toggle").mouseleave(function () {
    $(".help").toggleClass("help-hidden")
  });

  /**
   * Hook up the help button so it displays the labels onclick
   */
   $("#toggle").click(function () {
     $(".label").toggleClass("label-hidden");
   });
});
