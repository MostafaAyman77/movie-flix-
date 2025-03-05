// Check if the user is already logged in
function checkLoginStatus() {
    let user = localStorage.getItem('user');
    if (user) {
      window.location.href = 'home.html'; // Redirect to the home or homepage
    }
}

  // Switch to Login Page
function switchToLogin() {
    document.getElementById('authTitle').innerText = 'Log In';
    document.getElementById('authForm').querySelector('button').innerText = 'Log In';
    document.getElementById('switchLink').innerHTML = `Don't have an account? <a href="javascript:void(0);" onclick="switchToSignUp()">Sign Up</a>`;
    document.getElementById('authForm').removeEventListener('submit', handleSignUp);
    document.getElementById('authForm').addEventListener('submit', handleLogin);
}

  // Switch to Sign Up Page
function switchToSignUp() {
    document.getElementById('authTitle').innerText = 'Sign Up';
    document.getElementById('authForm').querySelector('button').innerText = 'Sign Up';
    document.getElementById('switchLink').innerHTML = `Already have an account? <a href="javascript:void(0);" onclick="switchToLogin()">Log In</a>`;
    document.getElementById('authForm').removeEventListener('submit', handleLogin);
    document.getElementById('authForm').addEventListener('submit', handleSignUp);
}

  // Handle User Sign Up
function handleSignUp(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username already exists
    if (users.some(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }
    // Create new user
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign Up Successful! Please log in.');
    switchToLogin(); // Switch to login form
}

  // Handle User Login
function handleLogin(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'home.html'; // Redirect to the home or homepage
    } else {
        alert('Invalid username or password!');
    }
}

  // Initialize the page to check login status
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/index.html') {
      document.getElementById('authForm').addEventListener('submit', handleSignUp); // Default to sign up
    }
});
