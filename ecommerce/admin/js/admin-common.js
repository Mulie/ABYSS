// LIYU.ca Admin Portal - Common Functionality

// Session Management
class SessionManager {
    constructor() {
        this.sessionDuration = 30 * 60 * 1000; // 30 minutes
        this.warningTime = 5 * 60 * 1000; // 5 minutes before expiry
        this.lastActivity = Date.now();
        this.init();
    }

    init() {
        this.startTimer();
        this.setupActivityListeners();
        this.checkAuthentication();
    }

    setupActivityListeners() {
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, () => this.updateActivity());
        });
    }

    updateActivity() {
        this.lastActivity = Date.now();
    }

    startTimer() {
        setInterval(() => {
            const elapsed = Date.now() - this.lastActivity;
            const remaining = this.sessionDuration - elapsed;

            // Update timer display
            const timerElement = document.getElementById('session-timer');
            if (timerElement) {
                const minutes = Math.floor(remaining / 60000);
                const seconds = Math.floor((remaining % 60000) / 1000);
                timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }

            // Show warning
            if (remaining <= this.warningTime && remaining > 0) {
                this.showSessionWarning();
            }

            // Logout
            if (remaining <= 0) {
                this.expireSession();
            }
        }, 1000);
    }

    showSessionWarning() {
        // Show warning notification
        console.log('Session expiring soon');
    }

    expireSession() {
        logout();
    }

    checkAuthentication() {
        const authToken = localStorage.getItem('admin_auth_token');
        const currentPath = window.location.pathname;

        if (!authToken && !currentPath.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Initialize session manager on admin pages
if (document.body.classList.contains('admin-page')) {
    const sessionManager = new SessionManager();
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Logout function
function logout() {
    // Log activity
    logActivity('logout', { user: getCurrentUser() });

    // Clear authentication
    localStorage.removeItem('admin_auth_token');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_role');

    // Redirect to login
    window.location.href = 'login.html';
}

// Get current user
function getCurrentUser() {
    return localStorage.getItem('admin_user') || 'unknown';
}

// Get current role
function getCurrentRole() {
    return localStorage.getItem('admin_role') || 'Read-Only';
}

// Check permission
function hasPermission(action) {
    const role = getCurrentRole();
    const permissions = {
        'Super Admin': ['*'],
        'Admin': ['inventory', 'pricing', 'promotion', 'order', 'product'],
        'Merchandiser': ['inventory', 'product', 'promotion'],
        'Marketing': ['promotion'],
        'Fulfillment': ['order'],
        'Read-Only': []
    };

    const userPermissions = permissions[role] || [];
    return userPermissions.includes('*') || userPermissions.includes(action);
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
}

// Close modal on outside click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// API Request Wrapper
async function apiRequest(endpoint, method = 'GET', data = null) {
    const baseURL = '/api/v1';
    const token = localStorage.getItem('admin_auth_token');

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${baseURL}${endpoint}`, options);

        if (response.status === 401) {
            logout();
            return null;
        }

        const result = await response.json();

        // Track API latency (for monitoring)
        console.log(`API ${method} ${endpoint}: ${response.status}`);

        return result;
    } catch (error) {
        console.error('API Error:', error);
        showNotification('API request failed', 'error');
        return null;
    }
}

// Activity Logging
async function logActivity(action, details) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        user: getCurrentUser(),
        role: getCurrentRole(),
        action: action,
        details: details,
        ip_address: 'client-side', // Would be captured server-side
        user_agent: navigator.userAgent
    };

    // In production, send to server
    console.log('Activity Log:', logEntry);

    // Store locally for demo
    const logs = JSON.parse(localStorage.getItem('activity_logs') || '[]');
    logs.unshift(logEntry);
    logs.splice(100); // Keep last 100
    localStorage.setItem('activity_logs', JSON.stringify(logs));

    return logEntry;
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e5e7eb';
        }
    });

    return isValid;
}

// Export to CSV
function exportToCSV(data, filename) {
    if (!data || data.length === 0) {
        showNotification('No data to export', 'warning');
        return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
    }).format(amount);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltips = document.querySelectorAll('[title]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title');
            tooltip.style.cssText = `
                position: absolute;
                background: #1f2937;
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.85rem;
                z-index: 10000;
                pointer-events: none;
            `;
            this.appendChild(tooltip);
        });

        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
});
