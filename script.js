var expenseForm = document.getElementById('expense-form');
var expenseList = document.getElementById('expense-list');
var totalAmount = document.getElementById('total-amount');
var expenses = [];
var editExpenseForm = document.getElementById('edit-expense-form');
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var expenseName = document.getElementById('expense-name').value;
    var expenseAmount = document.getElementById('expense-amount').value;
    var expenseCategory = document.getElementById('expense-category').value;
    var expenseDate = document.getElementById('expense-date').value;

    var expense = {
        id: new Date().getTime(),
        name: expenseName,
        amount: parseFloat(expenseAmount),
        category: expenseCategory,
        date: expenseDate
    };

    expenses.push(expense);
    displayExpenses();
    calculateTotal();
    expenseForm.reset();
});


expenseList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        var expenseId = event.target.dataset.id;
        deleteExpense(expenseId);
    } else if (event.target.classList.contains('edit-btn')) {
        var expenseId = event.target.dataset.id;
        editExpense(expenseId);
    }
});


function deleteExpense(id) {
    expenses = expenses.filter(function(expense) {
        return expense.id != id;
    });
    displayExpenses();
    calculateTotal();
}


function editExpense(id) {
    var expense = expenses.find(function(exp) {
        return exp.id == id;
    });

    document.getElementById('edit-expense-form').style.display = 'block';
    document.getElementById('edit-expense-form').dataset.id = id;
    document.getElementById('edit-expense-name').value = expense.name;
    document.getElementById('edit-expense-amount').value = expense.amount;
    document.getElementById('edit-expense-category').value = expense.category;
    document.getElementById('edit-expense-date').value = expense.date;
}


document.getElementById('save-edit-btn').addEventListener('click', function() {
    var expenseId = document.getElementById('edit-expense-form').dataset.id;
    var updatedExpense = {
        id: expenseId,
        name: document.getElementById('edit-expense-name').value,
        amount: parseFloat(document.getElementById('edit-expense-amount').value),
        category: document.getElementById('edit-expense-category').value,
        date: document.getElementById('edit-expense-date').value
    };

    expenses = expenses.map(function(exp) {
        return exp.id == expenseId ? updatedExpense : exp;
    });

    displayExpenses();
    calculateTotal();
    document.getElementById('edit-expense-form').style.display = 'none';
});


function displayExpenses() {
    expenseList.innerHTML = ''; 
    expenses.forEach(function(expense) {
        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${expense.name}</td>
            <td>${expense.amount}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td><button class="delete-btn" data-id="${expense.id}">Delete</button>
            <button class="edit-btn" data-id="${expense.id}">Edit</button></td>
        `;
        expenseList.appendChild(tr);
    });
}

function calculateTotal() {
    var total = expenses.reduce(function(sum, expense) {
        return sum + expense.amount;
    }, 0);

    totalAmount.textContent = total.toFixed(2);
}

