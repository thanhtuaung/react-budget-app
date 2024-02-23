//delay
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

//color
function generateColor() {
  const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetsLength * 34} 60% 35%`;
}

//fetch item
export function fetchData(key) {
  return JSON.parse(localStorage.getItem(key));
}

// delete item
export function deleteItem({ key, id }) {
  if (id) {
    const data = fetchData(key);
    const newData = data.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
}

//get related item
export const getAllRelatedItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

//create budget
export function createNewBudget({ name, amount }) {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
}

//create expense
export function createNewExpense({ name, amount, budgetId }) {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
}

// spent budgete amount
export function totalSpent(budgetId) {
  const expenses = fetchData("expenses") ?? [];
  const totalSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);
  return totalSpent;
}

//FORMATTING

//format date
export const formatDateToLocalString = (dateValue) => {
  return new Date(dateValue).toLocaleDateString();
};

//format percentage
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

//format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};
