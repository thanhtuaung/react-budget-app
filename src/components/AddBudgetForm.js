import React, { useEffect, useRef } from "react";

// rrd imports
import { Form, useActionData, useFetcher } from "react-router-dom";

// library
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const errors = fetcher.data;
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      if (!errors) {
        formRef.current.reset();
        nameRef.current.focus();
      }
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">New Budget</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g, Geogries"
            required
            ref={nameRef}
          />
          {errors?.newBudget && (
            <span className="text-danger">{errors?.newBudget}</span>
          )}
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step={0.01}
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g, $200"
            required
          />
          {errors?.newBudgetAmount && (
            <span className="text-danger">{errors?.newBudgetAmount}</span>
          )}
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
