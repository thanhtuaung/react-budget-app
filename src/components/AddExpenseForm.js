import React, { useEffect, useRef } from "react";

//library
import { PlusCircleIcon } from "@heroicons/react/24/solid";

//rrd imports
import { useFetcher } from "react-router-dom";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const errors = fetcher.data;
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const expenseRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      expenseRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        {budgets && budgets.length === 1 && (
          <span className="accent">{budgets.map((budget) => budget.name)}</span>
        )}{" "}
        Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">New Expense</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              required
              ref={expenseRef}
            />
            {errors?.newExpense && (
              <span className="text-danger">{errors?.newExpense}</span>
            )}
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step={0.01}
              name="newExpenseAmount"
              id="newExpenseAmount"
              inputMode="decimal"
              required
              placeholder="e.g., 2.45"
            />
            {errors?.newExpenseAmount && (
              <span className="text-danger">{errors?.newExpenseAmount}</span>
            )}
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="budget">Budgets</label>
          <select name="expenseBudget" id="budget">
            {budgets.map((budget) => {
              return (
                <option value={budget.id} key={budget.id}>
                  {budget.name}
                </option>
              );
            })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />

        <button className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
