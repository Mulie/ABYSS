// LIYU.ca Inventory Management

// Mock inventory data (in production, fetched from API)
let inventoryData = [
    {
        sku: 'WH-001',
        product: 'Wireless Bluetooth Headphones',
        category: 'electronics',
        location: 'Warehouse 1',
        on_hand: 145,
        reserved: 12,
        reorder_point: 20
    },
    {
        sku: 'FW-002',
        product: 'Smart Fitness Watch',
        category: 'electronics',
        location: 'Warehouse 1',
        on_hand: 8,
        reserved: 3,
        reorder_point: 15
    },
    {
        sku: 'DJ-003',
        product: 'Casual Denim Jacket',
        category: 'fashion',
        location: 'Store - Montreal',
        on_hand: 0,
        reserved: 0,
        reorder_point: 10
    }
];

// Adjust inventory
window.adjustInventory = function(sku) {
    const item = inventoryData.find(i => i.sku === sku);
    if (!item) return;

    // Populate modal
    document.getElementById('adjust-sku').value = sku;
    document.getElementById('adjust-product').value = item.product;
    document.getElementById('current-quantity').value = item.on_hand;

    openModal('adjust-modal');

    // Handle form submission
    const form = document.getElementById('adjust-form');
    form.onsubmit = async function(e) {
        e.preventDefault();

        const type = document.getElementById('adjustment-type').value;
        const quantity = parseInt(document.getElementById('adjust-quantity').value);
        const reason = document.getElementById('adjust-reason').value;
        const notes = document.getElementById('adjust-notes').value;

        // Calculate new quantity
        let newQuantity = item.on_hand;
        if (type === 'add') newQuantity += quantity;
        else if (type === 'remove') newQuantity -= quantity;
        else if (type === 'set') newQuantity = quantity;

        // Log activity
        await logActivity('inventory_adjust', {
            sku: sku,
            old_quantity: item.on_hand,
            new_quantity: newQuantity,
            reason: reason,
            notes: notes
        });

        // Update inventory
        item.on_hand = newQuantity;

        showNotification(`Inventory updated for ${sku}`, 'success');
        closeModal('adjust-modal');

        // Refresh display
        loadInventoryTable();
    };
};

// View history
window.viewHistory = function(sku) {
    showNotification('Inventory history feature coming soon', 'info');
};

// Bulk import
window.showBulkImport = function() {
    openModal('bulk-import-modal');
};

// Download template
window.downloadTemplate = function() {
    const template = [
        ['SKU', 'Location', 'Adjustment', 'Reason'],
        ['WH-001', 'Warehouse 1', '+50', 'Stock received'],
        ['FW-002', 'Warehouse 1', '-10', 'Damaged goods']
    ];

    exportToCSV(template.map(row => Object.fromEntries(row.map((v, i) => [i, v]))), 'inventory_template');
};

// Export inventory
window.exportInventory = function() {
    exportToCSV(inventoryData, 'inventory_export');
};

// Load inventory table
function loadInventoryTable() {
    const tbody = document.getElementById('inventory-table-body');
    if (!tbody) return;

    tbody.innerHTML = inventoryData.map(item => {
        const available = item.on_hand - item.reserved;
        const status = item.on_hand === 0 ? 'out' : available <= item.reorder_point ? 'low' : 'ok';

        return `
            <tr>
                <td><input type="checkbox" class="row-select"></td>
                <td><strong>${item.sku}</strong></td>
                <td>${item.product}</td>
                <td>${item.category}</td>
                <td>${item.location}</td>
                <td>${item.on_hand}</td>
                <td>${item.reserved}</td>
                <td class="stock-${status}">${available}</td>
                <td>${item.reorder_point}</td>
                <td><span class="status-badge ${status === 'ok' ? 'success' : status === 'low' ? 'warning' : 'danger'}">
                    ${status === 'ok' ? 'In Stock' : status === 'low' ? 'Low Stock' : 'Out of Stock'}
                </span></td>
                <td>
                    <button class="btn-icon" onclick="adjustInventory('${item.sku}')" title="Adjust">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="viewHistory('${item.sku}')" title="History">
                        <i class="fas fa-history"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadInventoryTable();
});
