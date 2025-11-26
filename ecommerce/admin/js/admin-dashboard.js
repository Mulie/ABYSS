// LIYU.ca Admin Dashboard

// Dashboard initialization
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    updatePerformanceMetrics();
    loadRecentPriceChanges();
});

// Load dashboard data
async function loadDashboardData() {
    // In production, fetch from API
    const data = {
        revenue_today: 45231,
        orders_today: 247,
        total_skus: 1234,
        active_customers: 8543,
        low_stock_count: 3,
        pending_orders: 12
    };

    // Update KPIs
    updateKPIs(data);
}

function updateKPIs(data) {
    // Revenue
    const revenueCard = document.querySelector('.kpi-card h3');
    if (revenueCard) {
        revenueCard.textContent = formatCurrency(data.revenue_today);
    }
}

// Update performance metrics
function updatePerformanceMetrics() {
    // Simulate real-time performance monitoring
    const metrics = {
        lcp: 1.8,
        inp: 144,
        cls: 0.045
    };

    // LCP
    updateMetricBar('lcp', metrics.lcp, 2.5);
    // INP
    updateMetricBar('inp', metrics.inp, 200);
    // CLS
    updateMetricBar('cls', metrics.cls, 0.1);
}

function updateMetricBar(metric, value, target) {
    const percentage = (value / target) * 100;
    const isGood = value <= target;

    // Find and update the metric bar
    // This is a simplified version
    console.log(`${metric}: ${value} (${percentage}% of target)`);
}

// Load recent price changes
function loadRecentPriceChanges() {
    const recentChanges = [
        {
            sku: 'WH-001',
            product: 'Wireless Headphones',
            old_price: 89.99,
            new_price: 79.99,
            changed_by: 'admin@liyu.ca',
            time: '10 min ago'
        },
        {
            sku: 'FW-003',
            product: 'Smart Fitness Watch',
            old_price: 179.99,
            new_price: 199.99,
            changed_by: 'merchandiser@liyu.ca',
            time: '1 hour ago'
        }
    ];

    const tbody = document.getElementById('recent-price-changes');
    if (tbody) {
        tbody.innerHTML = recentChanges.map(change => `
            <tr>
                <td>${change.sku}</td>
                <td>${change.product}</td>
                <td>$${change.old_price.toFixed(2)}</td>
                <td class="${change.new_price < change.old_price ? 'price-down' : 'price-up'}">
                    $${change.new_price.toFixed(2)}
                </td>
                <td>${change.changed_by}</td>
                <td>${change.time}</td>
            </tr>
        `).join('');
    }
}

// Refresh dashboard
window.refreshDashboard = function() {
    showNotification('Refreshing dashboard...', 'info');
    loadDashboardData();
    updatePerformanceMetrics();
    loadRecentPriceChanges();
};
