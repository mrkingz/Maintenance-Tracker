$(document).ready(function() {
    $('.user-button').on('click', function(e) {
        title =  $('h3');
        if (title.html() === 'Sign in') {
            e.preventDefault()
            title.html('Sign up');
            $(this).html('<i class="fa fa-user"></i> Sign in');
           $('#username').prop({'placeholder': 'Your username'});
           $('label[for="username"]').html('Username');
           $('.dark').html('Sign up');
            $('.checkbox-recovery, .email').toggle();
        } 

        $('input:eq(0)').focus();
    })
});
