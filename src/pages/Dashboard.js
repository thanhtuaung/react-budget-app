import React from "react";

// rrd import
import { useActionData, useLoaderData } from "react-router";

//component
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//helper functions import
import {
  createNewBudget,
  createNewExpense,
  deleteItem,
  fetchData,
  waait,
} from "../helpers";
import Intro from "../components/Intro";

//library
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

//loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

//action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  const errors = {};

  if (_action === "createUser") {
    try {
      if (values.userName.length === 0) {
        errors.userName = "username is required";
      }

      // return data if we have errors
      if (Object.keys(errors).length) {
        return errors;
      }

      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcom, ${values.userName}`);
    } catch {
      throw new Error("There was a problem with creating account!");
    }
  }

  if (_action === "createBudget") {
    try {
      // validate the fields
      if (values.newBudget.length === 0) {
        errors.newBudget = "Budget name is required";
      }
      if (values.newBudgetAmount === null || !(values.newBudgetAmount > 0)) {
        errors.newBudgetAmount = "Invalid budget amount";
      }

      // return data if we have errors
      if (Object.keys(errors).length) {
        return errors;
      }

      createNewBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch {
      throw new Error("There was a problem with creating budget!");
    }
  }

  if (_action === "createExpense") {
    try {
      // validate the fields
      if (values.newExpense.length === 0) {
        errors.newExpense = "Expense name is required";
      }
      if (values.newExpenseAmount === null || !(values.newExpenseAmount > 0)) {
        errors.newExpenseAmount = "Invalid expensee amount";
      }

      // return data if we have errors
      if (Object.keys(errors).length) {
        return errors;
      }

      createNewExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.expenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} added!`);
      // return null;
    } catch {
      throw new Error("There was a problem with adding expense!");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({ key: "expenses", id: values.expenseId });
      return toast.success(`Expense is deleted!`);
    } catch {
      throw new Error("There was a problem with deleting expense!");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  const errors = useActionData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 4)}
                    />
                    {expenses.length > 4 && (
                      <Link to="expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
