(function ($) {
    "use strict";

    // Toggle visibility of the Sign In and Logout buttons based on authentication status
    function toggleSignInOutButtons() {
        var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (isLoggedIn) {
            $("#modal_trigger").attr('style', 'display: none !important');
            $("#logout_trigger").attr('style', 'display: block !important');
        } else {
            $("#modal_trigger").attr('style', 'display: block !important');
            $("#logout_trigger").attr('style', 'display: none !important');
        }
    }

    // Redirect to the home page
    function redirectToIndex() {
        var indexUrl = $('#login_btn').data('index-url');
        window.location.href = indexUrl;
    }

    // Initialize UI components like carousel and modal
    function initializeUIComponents() {
        $(".loop").owlCarousel({
            center: true,
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            margin: 0,
            responsive: {
                1200: { items: 5 },
                992: { items: 3 },
                760: { items: 2 }
            }
        });

        $("#modal_trigger").leanModal({
            top: 100,
            overlay: 0.6,
            closeButton: ".modal_close"
        });
    }

    // Setup event handlers for forms and interactions
    function setupEventHandlers() {
        $("#login_form").click(function () {
            $(".social_login").hide();
            $(".user_login").show();
            $(".user_forgotpassword").hide();
            return false;
        });

        $("#register_form").click(function () {
            $(".social_login").hide();
            $(".user_register").show();
            $(".header_title").text("Sign Up");
            $(".user_forgotpassword").hide();
            return false;
        });

        $("#forgot_password").click(function () {
            $(".user_login").hide();
            $(".user_forgotpassword").show();
            $(".header_title").text("Forgot Password");
            return false;
        });

        $(".back_btn").click(function () {
            $(".user_login, .user_register, .user_forgotpassword").hide();
            $(".social_login").show();
            $(".header_title").text("Login");
            $(this).closest('form').find("input[type='text'], input[type='password'], input[type='email']").val('');
            return false;
        });

        // Handle form submissions
        $('#loginForm').on('submit', function (e) {
            e.preventDefault();
            var formData = {
                email: $('#email').val(),
                password: $('#log_password').val(),
                rememberMe: $('#remember').is(':checked')
            };

            $.ajax({
                type: 'POST',
                url: 'https://localhost:44304/api/LoginApi/login',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function (response) {
                    localStorage.setItem('isLoggedIn', 'true');
                    toggleSignInOutButtons();
                    redirectToIndex();
                },
                error: function (xhr, status, error) {
                    console.error('Error during login', xhr.responseText);
                    alert('Login failed: ' + xhr.responseText);
                }
            });
        });
        $("#registrationForm").on("submit", function (e) {
            e.preventDefault();

            var formData = {
                username: $(this).find('input[name="fullName"]').val(),
                email: $(this).find('input[name="email"]').val(),
                password: $(this).find('input[name="password"]').val(),
            };

            $.ajax({
                type: "POST",
                url: "https://localhost:44304/api/Accounts",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function (response) {
                    console.log("Account created successfully", response);
                    alert("Registration successful!");
                },
                error: function (response) {
                    console.error("Error during registration", response);
                    alert("Registration failed: " + response.responseText);
                },
            });
        });
        $('#logout_trigger').click(function (e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            toggleSignInOutButtons();
            redirectToIndex();
        });

        // Password visibility toggle
        $('.toggle-password').click(function () {
            $(this).toggleClass('fa-eye fa-eye-slash');
            var input = $(this).prev('input');
            input.attr('type', input.attr('type') === 'password' ? 'text' : 'password');
        });
    }

    // Initialize everything on document ready
    $(document).ready(function () {
        initializeUIComponents();
        setupEventHandlers();
        toggleSignInOutButtons();
    });

})(jQuery);
