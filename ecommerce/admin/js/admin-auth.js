// LIYU.ca Admin Authentication

// Demo users (in production, this would be server-side)
const DEMO_USERS = [
    {
        email: 'admin@liyu.ca',
        password: 'admin123',
        role: 'Super Admin',
        name: 'Admin User',
        mfa_enabled: true
    },
    {
        email: 'merchandiser@liyu.ca',
        password: 'merch123',
        role: 'Merchandiser',
        name: 'Merchandiser User',
        mfa_enabled: false
    },
    {
        email: 'marketing@liyu.ca',
        password: 'market123',
        role: 'Marketing',
        name: 'Marketing User',
        mfa_enabled: false
    }
];

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const mfaForm = document.getElementById('mfa-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (mfaForm) {
        mfaForm.addEventListener('submit', handleMFA);
    }

    // Toggle password visibility
    window.togglePassword = function(inputId) {
        const input = document.getElementById(inputId);
        const button = event.currentTarget;
        const icon = button.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    };

    // Back to login
    window.backToLogin = function() {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('mfa-form').style.display = 'none';
    };

    // Radio button handler for scheduled dates
    const effectiveRadios = document.querySelectorAll('input[name="effective"]');
    effectiveRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const scheduleDateGroup = document.getElementById('schedule-date-group');
            if (scheduleDateGroup) {
                scheduleDateGroup.style.display =
                    this.value === 'scheduled' ? 'block' : 'none';
            }
        });
    });
});

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verify credentials
    const user = DEMO_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
        showError('Invalid email or password');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        return;
    }

    // Store temporary user data
    sessionStorage.setItem('pending_user', JSON.stringify(user));

    // Check if MFA is required
    if (user.mfa_enabled) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('mfa-form').style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    } else {
        // Complete login
        completeLogin(user);
    }
}

async function handleMFA(event) {
    event.preventDefault();

    const mfaCode = document.getElementById('mfa-code').value;
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, verify with server
    // For demo, accept any 6-digit code
    if (mfaCode.length === 6 && /^\d+$/.test(mfaCode)) {
        const userData = JSON.parse(sessionStorage.getItem('pending_user'));
        completeLogin(userData);
    } else {
        showError('Invalid authentication code');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

function completeLogin(user) {
    // Generate auth token (in production, this comes from server)
    const token = 'demo_token_' + Math.random().toString(36).substr(2);

    // Store authentication data
    localStorage.setItem('admin_auth_token', token);
    localStorage.setItem('admin_user', user.email);
    localStorage.setItem('admin_role', user.role);
    localStorage.setItem('admin_name', user.name);

    // Log login activity
    logLoginActivity(user.email, true);

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

function showError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function logLoginActivity(user, success) {
    const activity = {
        timestamp: new Date().toISOString(),
        type: success ? 'login_success' : 'login_failed',
        user: user,
        ip: 'demo-ip',
        user_agent: navigator.userAgent
    };

    console.log('Login Activity:', activity);

    // Store in local storage for demo
    const logs = JSON.parse(localStorage.getItem('login_logs') || '[]');
    logs.unshift(activity);
    localStorage.setItem('login_logs', JSON.stringify(logs));
}
