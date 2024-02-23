import React from "react";

// rrd imports
import { useLoaderData } from "react-router";

// library
import { toast } from "react-toastify";

// components
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

// helpers
import { createNewExpense, deleteItem, getAllRelatedItems } from "../helpers";

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllRelatedItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllRelatedItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });
  return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createNewExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.expenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} added!`);
    } catch {
      throw new Error("There was a problem with adding expense!");
    }
  }

  if (_action === "deleteExpense") {
    try {
      await deleteItem({ key: "expenses", id: values.expenseId });
      return toast.success(`Expense is deleted!`);
    } catch {
      throw new Error("There was a problem with deleting expense!");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>

      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h1 className="h2">
            <span className="accent">{budget.name}</span> Expenses
          </h1>
          <Table
            expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)}
            showBudget={false}
          />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
