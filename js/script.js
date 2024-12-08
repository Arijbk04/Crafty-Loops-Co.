// Form and Button References
const loginIcon = document.getElementById('loginIcon');
const signupIcon = document.getElementById('signupIcon');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');

// Show Login Form
loginIcon.addEventListener('click', () => {
    loginForm.style.display = 'flex';
});

// Show Signup Form
signupIcon.addEventListener('click', () => {
    signupForm.style.display = 'flex';
});

// Close Login Form
closeLogin.addEventListener('click', () => {
    loginForm.style.display = 'none';
});

// Close Signup Form
closeSignup.addEventListener('click', () => {
    signupForm.style.display = 'none';
});

// Validation and Welcome Message
function validateForm(form) {
    let isValid = true;
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');

    // Clear previous errors
    const errors = form.querySelectorAll('.error');
    errors.forEach(error => error.remove());

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email.value)) {
        const error = document.createElement('span');
        error.classList.add('error');
        error.textContent = 'Email invalide.';
        email.parentElement.appendChild(error);
        isValid = false;
    }

    // Password validation
    if (password.value.length < 6) {
        const error = document.createElement('span');
        error.classList.add('error');
        error.textContent = 'Mot de passe doit contenir au moins 6 caractères.';
        password.parentElement.appendChild(error);
        isValid = false;
    }

    return isValid;
}

// Handle Form Submission
function handleFormSubmission(form, e) {
    e.preventDefault();
    if (!validateForm(form)) return;

    const firstName = form.querySelector('#firstName');
    const email = form.querySelector('input[type="email"]');
    const userName = firstName ? firstName.value : email.value.split('@')[0];

    localStorage.setItem('userName', userName);
    window.location.href = 'homepage.html';
}

// Add Event Listeners
document.querySelector('#loginForm form').addEventListener('submit', (e) => handleFormSubmission(loginForm, e));
document.querySelector('#signupForm form').addEventListener('submit', (e) => handleFormSubmission(signupForm, e));

// Display Welcome Message on Homepage
if (window.location.pathname.includes('homepage.html')) {
    const userName = localStorage.getItem('userName') || 'Cher utilisateur';
    const welcomeMessage = document.createElement('div');
    welcomeMessage.classList.add('welcome-message');
    welcomeMessage.innerHTML = `<h1>Bienvenue, ${userName}!</h1><p>Nous sommes ravis de vous revoir 🌸</p>`;
    document.body.prepend(welcomeMessage);

    setTimeout(() => {
        welcomeMessage.style.opacity = '1';
        welcomeMessage.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        welcomeMessage.style.opacity = '0';
        setTimeout(() => welcomeMessage.remove(), 500);
    }, 5000);
}
