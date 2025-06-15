let income = 0;
let expense = 0;

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionList = document.getElementById("transactionList");

document.getElementById("incomeForm").onsubmit = function(e) {
  e.preventDefault();
  const text = document.getElementById("incomeText").value;
  const amount = parseFloat(document.getElementById("incomeAmount").value);
  if (text && amount > 0) {
    income += amount;
    updateBalance();
    addTransaction(text, amount, "income");
    this.reset();
  }
};

document.getElementById("expenseForm").onsubmit = function(e) {
  e.preventDefault();
  const text = document.getElementById("expenseText").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  if (text && amount > 0) {
    expense += amount;
    updateBalance();
    addTransaction(text, amount, "expense");
    this.reset();
  }
};

function updateBalance() {
  const balance = income - expense;
  balanceEl.textContent = balance;
  incomeEl.textContent = income;
  expenseEl.textContent = expense;
}

function addTransaction(text, amount, type) {
  const div = document.createElement("div");
  div.className = "transaction " + type;

  const left = document.createElement("div");
  left.innerHTML = `<span>${text}</span><br><span class="badge">${type === "income" ? "💰 Income" : "💸 Expense"}</span>`;

  const right = document.createElement("div");
  right.style.display = "flex";
  right.style.alignItems = "center";

  const amountEl = document.createElement("div");
  amountEl.className = "amount";
  amountEl.textContent = `₹${amount}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = function () {
    if (type === "income") {
      income -= amount;
    } else {
      expense -= amount;
    }
    updateBalance();
    div.remove();
  };

  right.appendChild(amountEl);
  right.appendChild(deleteBtn);

  div.appendChild(left);
  div.appendChild(right);
  transactionList.prepend(div);
}
