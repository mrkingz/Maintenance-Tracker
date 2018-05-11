$(document).ready(function () {
  $('.user-button').on('click', function (e) {
    title = $('h3');
    id = e.target.id;
    if (id === 'signup') {
      e.preventDefault()
      title.html('Sign up');
      $(this).html('<i class="fa fa-sign-in"></i> Sign in');
      $('#username').prop({ 'placeholder': 'Your username' });
      $('label[for="username"]').html('Username');
      $('.dark').html('Sign up');
      $(this).prop({'id': 'signin'})
      $('.checkbox-recovery, .email').toggle();
    }

    $('input:eq(0)').focus();
  })

  $('.recovery').on('click', function (e) {
    e.preventDefault();
    $('h3').html('Password recovery');
    $('.dark').html('Continue');
    $('.checkbox-recovery').toggle();
    $('.form-group:eq(0), .form-group:eq(1), .form-group:eq(2)').toggle();
    $('.user-button').replaceWith('<button class="user-button link" id="signin"><i class="fa fa-sign-in"></i> Sign in</button>')
  })

  $('.dark').on('click', function(e) {
    e.preventDefault();
    if ($(this).html() === 'Sign in') 
      window.location.href = 'home.html?page=create-request';
  })

  $('.dropdown').hover(function(e) {
      displayDropdown(e)
    },
    function() {
      $('.dropdown-content').css({'display':'none'})
  })


  $('.dropdown-content a').on('click', function(e) {
    let pageRef = $(this).prop('href').split('=')[1];
    if (pageRef) {
      //e.preventDefault();
      $('.dropdown-content').css({'display':'none'});
      $('.content h3').html(pageRef.replace('-', ' ')).css({'text-transform': 'capitalize'})
    }
    else window.location.href = 'index.html';
  })
});

function displayDropdown(e) {
  const dropdown = $(e.target);
  const content = $('.dropdown-content');

  let top = dropdown.position().top;
  let height = parseInt(dropdown.css('height').replace('px',''));
  let width = parseInt(dropdown.css('width').replace('px',''));
  let contWidth = parseInt(content.css('width').replace('px',''));
  content.css({
    'top': (top + height)+ 'px',
    'left': (dropdown.position().left - contWidth + width)+'px',
  });
  $('.dropdown-content').css({'display':'block'});
}

