document.addEventListener('DOMContentLoaded', function() {
    // Login form password visibility toggle
    const loginPasswordInput = document.getElementById('login-pass');
    const loginEyeIcon = document.getElementById('login-eye');

    loginPasswordInput.type = 'password'; // Start with password hidden
    loginEyeIcon.classList.add('ri-eye-off-line'); // Eye closed
    loginEyeIcon.classList.remove('ri-eye-line'); // Remove eye open icon

    loginEyeIcon.addEventListener('click', function() {
        if (loginPasswordInput.type === 'password') {
            loginPasswordInput.type = 'text'; // Show password
            loginEyeIcon.classList.remove('ri-eye-off-line'); // Remove eye closed icon
            loginEyeIcon.classList.add('ri-eye-line'); // Add eye open icon
        } else {
            loginPasswordInput.type = 'password'; // Hide password
            loginEyeIcon.classList.remove('ri-eye-line'); // Remove eye open icon
            loginEyeIcon.classList.add('ri-eye-off-line'); // Add eye closed icon
        }
    });

    // Sign up form password visibility toggle
    const signupPasswordInput = document.getElementById('signup-pass');
    const signupEyeIcon = document.getElementById('signup-eye');

    signupPasswordInput.type = 'password'; // Start with password hidden
    signupEyeIcon.classList.add('ri-eye-off-line'); // Eye closed
    signupEyeIcon.classList.remove('ri-eye-line'); // Remove eye open icon

    signupEyeIcon.addEventListener('click', function() {
        if (signupPasswordInput.type === 'password') {
            signupPasswordInput.type = 'text'; // Show password
            signupEyeIcon.classList.remove('ri-eye-off-line'); // Remove eye closed icon
            signupEyeIcon.classList.add('ri-eye-line'); // Add eye open icon
        } else {
            signupPasswordInput.type = 'password'; // Hide password
            signupEyeIcon.classList.remove('ri-eye-line'); // Remove eye open icon
            signupEyeIcon.classList.add('ri-eye-off-line'); // Add eye closed icon
        }
    });
});

//***************************************************************************************//
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login__form--login');
    const signupForm = document.querySelector('.login__form--signup');
    const registerLink = document.querySelector('.login__register a');
    const loginLink = document.getElementById('showLogin');

    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.classList.add('move-left-right');
        document.body.classList.add('no-scroll');

        setTimeout(function() {
            loginForm.style.display = 'none';
            signupForm.classList.remove('move-left-right');
            signupForm.classList.add('slide-from-top');
            signupForm.style.display = 'block'; // Ensure it is visible
            signupForm.classList.remove('slide-from-top');
            document.body.classList.remove('no-scroll');
        }, 4000); // Match with CSS animation duration
    });

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        signupForm.classList.add('move-left-right');
        document.body.classList.add('no-scroll');

        setTimeout(function() {
            signupForm.style.display = 'none';
            loginForm.classList.remove('move-left-right');
            loginForm.classList.add('slide-down');
            loginForm.style.display = 'block'; // Ensure it is visible
            loginForm.classList.remove('slide-down');
            document.body.classList.remove('no-scroll');
        }, 4000); // Match with CSS animation duration
    });
});
//********************************************************************************************//
// Switch between login and signup forms
document.getElementById('showSignup').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
    syncCheckboxStates();
});

document.getElementById('showLogin').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
    syncCheckboxStates();
});

// Music toggle
var loginCheckbox = document.getElementById('login-check');
var signupCheckbox = document.getElementById('signup-check');
var audio = document.getElementById('myAudio');

// Function to synchronize the checkbox state between the forms
function syncCheckboxStates() {
    if (loginCheckbox.checked) {
        signupCheckbox.checked = true;
    } else {
        signupCheckbox.checked = false;
    }
}

loginCheckbox.addEventListener('change', function() {
    if (loginCheckbox.checked) {
        audio.play();
        signupCheckbox.checked = true; // Keep the checkbox in sync
    } else {
        audio.pause();
        signupCheckbox.checked = false; // Keep the checkbox in sync
    }
});

signupCheckbox.addEventListener('change', function() {
    if (signupCheckbox.checked) {
        loginCheckbox.checked = true; // Keep the checkbox in sync
        audio.play();
    } else {
        loginCheckbox.checked = false; // Keep the checkbox in sync
        audio.pause();
    }
});
/******************************************************************** */
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // الدالة للتحقق من ملء جميع الحقول
    function areFieldsFilled(form) {
        const inputs = form.querySelectorAll('input[required]');
        return Array.from(inputs).every(input => input.value.trim() !== '');
    }

    // التحقق عند تقديم نموذج تسجيل الدخول
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الإرسال التلقائي للنموذج
        if (areFieldsFilled(loginForm)) {
            window.location.href = 'home.html'; // إعادة التوجيه إلى صفحة home
        } else {
            alert('Please fill in all fields.');
        }
    });

    // التحقق عند تقديم نموذج التسجيل
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الإرسال التلقائي للنموذج
        if (areFieldsFilled(signupForm)) {
            window.location.href = 'home.html'; // إعادة التوجيه إلى صفحة home
        } else {
            alert('Please fill in all fields.');
        }
    });

    // عرض نموذج التسجيل وإخفاء نموذج تسجيل الدخول
    document.getElementById('showSignup').addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    });

    // عرض نموذج تسجيل الدخول وإخفاء نموذج التسجيل
    document.getElementById('showLogin').addEventListener('click', function(event) {
        event.preventDefault();
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    });
});
