// app.js — small jQuery interactions used by the assignment
$(function(){
  // insert current year
  $('#year,#year2,#year3').text(new Date().getFullYear());

  // smooth scroll for anchor links (if any)
  $('a[href^="#"]').on('click', function(e){
    var href = $(this).attr('href');
    if(href && href.startsWith('#')) {
      e.preventDefault();
      var target = $(href);
      if(target.length) {
        $('html,body').stop().animate({scrollTop: target.offset().top - 30}, 500);
      }
    }
  });

  // print button
  $('#printBtn').on('click', function(){
    window.print();
  });

  // simple contact validation (if you add a contact form later)
  $(document).on('submit','form', function(e){
    var valid = true;
    $(this).find('[required]').each(function(){
      if(!$(this).val().trim()) valid = false;
    });
    if(!valid){
      e.preventDefault();
      alert('Please fill required fields before submitting.');
    }
  });
});
