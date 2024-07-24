let totalAmount = 0;

function formatAmount(amount) {
    // Chỉ thêm đuôi 'đ' mà không thêm dấu phân cách ngàn
    return amount.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + 'đ';
}

function addTransaction() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (name === '' || date === '' || description === '' || isNaN(amount) || amount === 0) {
        alert('Vui lòng nhập đầy đủ thông tin.');
        return;
    }

    const transaction = {
        name,
        date,
        description,
        amount
    };

    saveTransaction(transaction);
    renderTransactions();
    updateTotalAmount();

    // Clear the input fields
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

function saveTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function renderTransactions() {
    const tableBody = document.querySelector('#transactions-table tbody');
    tableBody.innerHTML = '';

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    totalAmount = 0;

    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.name}</td>
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${formatAmount(transaction.amount)}</td>
            <td><button onclick="removeTransaction(${index}, ${transaction.amount})">Xóa</button></td>
        `;
        tableBody.appendChild(row);
        totalAmount += transaction.amount;
    });
}

function removeTransaction(index, amount) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
    updateTotalAmount();
}

function updateTotalAmount() {
    document.getElementById('total-amount').textContent = formatAmount(totalAmount);
}

// Initial render
renderTransactions();
