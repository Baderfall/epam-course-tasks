(function(){
    $(document).ready(() => {
    
        let emailIsValid = false;
        let passwordIsValid = false;
    
        $('.email-block #email').keyup(function() {
            if (this.validity.valid) {
                $('.email-block').addClass('valid');
                emailIsValid = true;
            }
            else {
                $('.email-block').removeClass('valid');
                emailIsValid = false;
            }
            activateButtons();
        });
    
        $('.password-block #password').keyup(function() {
            if (this.validity.valid) {
                $('.password-block').addClass('valid');
                passwordIsValid = true;
            }
            else {
                $('.password-block').removeClass('valid');
                passwordIsValid = false;
            }
            activateButtons();
        });
    
        function activateButtons() {
            if (emailIsValid && passwordIsValid) {
                $('.login-block button').prop('disabled', false);
                $('.login-block button').addClass('active');
            }
            else {
                $('.login-block button').prop('disabled', true);
                $('.login-block button').removeClass('active');
                $('.signup-button .tooltip').hide();
                $('.signin-button .tooltip').hide();
            }
        }
    
        $('.login-block .signup-button').click(() => {
            $('.signup-button .tooltip').toggle();
        });
    
        $('.login-block .signin-button').click(() => {
            $('.signin-button .tooltip').toggle();
        });
    
    });    
}());