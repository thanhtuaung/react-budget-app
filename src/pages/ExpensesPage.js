import React from "react";

// rrd imports
import { useLoaderData } from "react-router";

//components
import Table from "../components/Table";

//libaray
import { toast } from "react-toastify";

//helpers
import { deleteItem, fetchData } from "../helpers";

//loader
export function expensesLoader() {
  const expenses = fetchData("expenses") ?? [];
  return { expenses };
}

//action
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      await deleteItem({ key: "expenses", id: values.expenseId });
      return toast.success(`Expense is deleted!`);
    } catch {
      throw new Error("There was a problem with deleting expense!");
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h2>All Expenses</h2>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h3>
            Recent Expenses <small>(total {expenses.length})</small>
          </h3>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
