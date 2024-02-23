import React from "react";

//rrd import
import { Link, useFetcher } from "react-router-dom";

// library
import { TrashIcon } from "@heroicons/react/24/solid";

//helpers
import {
  formatCurrency,
  formatDateToLocalString,
  getAllRelatedItems,
} from "../helpers";

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();

  const budget = getAllRelatedItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  return (
    <>
      {budget && (
        <>
          <td>{expense.name}</td>
          <td>{formatCurrency(expense.amount)}</td>
          <td>{formatDateToLocalString(expense.createdAt)}</td>
          {showBudget && (
            <td>
              <Link
                to={`/budget/${budget.id}`}
                style={{
                  "--accent": budget.color,
                }}
              >
                {budget.name}
              </Link>
            </td>
          )}
          <td>
            <fetcher.Form method="post">
              <input type="hidden" name="_action" value="deleteExpense" />
              <input type="hidden" name="expenseId" value={expense.id} />
              <button className="btn btn--warning">
                <TrashIcon width={20} />
              </button>
            </fetcher.Form>
          </td>
        </>
      )}
    </>
  );
};

export default ExpenseItem;
