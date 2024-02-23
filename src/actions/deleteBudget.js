// rrd imports
import { redirect } from "react-router";

// helper
import { deleteItem, getAllRelatedItems } from "../helpers";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const expenses = getAllRelatedItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    expenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    return redirect("/");
  } catch (e) {
    throw new Error("There was a problem with deleting budget!");
  }
}
