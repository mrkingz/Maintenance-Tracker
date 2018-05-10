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
});
