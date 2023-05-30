const currentPage = window.location.href;
const labelErrorInvalid = document.getElementById('label-error-invalid');
const labelErrorEmail = document.getElementById('label-error-email');
const labelErrorPassword = document.getElementById('label-error-password');
const newPage = currentPage.replace("/views/login.html", "/index.html");

let random = Math.floor(Math.random() * 4);

const homeElement = document.getElementById('home');

homeElement.style.backgroundImage = 'url(../img/background-'+random+'.jpg)';

// check the session
let isLogged = localStorage.getItem('isLogged');

if (isLogged === 'true') {
    window.location.replace(newPage);
}

// When the document is ready
jQuery('document').ready(function() {
    showForm();
});

const showForm = () => {
    setTimeout(() => {
        jQuery('#login-form').fadeIn();
    }, 2000);
}

// Loginss
jQuery('#login').click(() => {
    const email = jQuery("#email").val();
    const password = jQuery('#password').val();
    let validated = true;

    if (email === '') {
        labelErrorEmail.style.display = 'block';
        validated = false;
    }

    if (password === '') {
        labelErrorPassword.style.display = 'block';
        validated = false;
    }

    if (validated) {
        fetch('http://localhost:80/users/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(result => {
            return result.json();
        })
        .then(res => {
            switch(res.message) {
                case 'success':
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('isLogged',true);
                    
                    window.location.replace(newPage);
                    return true;
                case 'User Deleted':
                    jQuery("#label-error-deleted").show();
                    break;
                case 'Invalid Password':
                    jQuery("#label-error-invalid").show();
                    break;
            }
            return false;
        })
        .catch(err => {
            console.log(err);
        });
    }
});

// Signup page
jQuery('#signup').click(() => {
    const newPage = currentPage.replace("/login.html", "/signup.html");
    window.location.replace(newPage);
});

// show and hide modules
const hideModules = () => {
    jQuery("#login-form").hide();
    jQuery("#contact-us-info").hide();
    jQuery("#frequent-questions-info").hide();
    jQuery("#second-part").html('');
};

jQuery('#frequent-questions').on('click', () => {
    hideModules();
    jQuery("#frequent-questions-info").show();
    jQuery("#second-part").html(' > Preguntas Frecuentes');
});

jQuery("#contact-us").on('click', () => {
    hideModules();
    jQuery("#contact-us-info").show();
    jQuery("#second-part").html(' > Contactenos');
});

jQuery("#principal").on('click', () => {
    hideModules();
    jQuery("#login-form").show();
});