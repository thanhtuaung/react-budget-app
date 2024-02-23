import React from "react";

// rrd imports
import { Form, Link } from "react-router-dom";

// library
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

// helpers
import { formatCurrency, formatPercentage, totalSpent } from "../helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;

  const spent = totalSpent(id);

  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      <div className="flex-sm">
        {showDelete ? (
          <Form
            method="post"
            action="delete"
            onSubmit={(e) => {
              if (!window.confirm("Are you sure to delete this budget?")) {
                e.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              Delete Budget <TrashIcon width={20} />
            </button>
          </Form>
        ) : (
          <Link to={`budget/${id}`} className="btn">
            View Details
            <BanknotesIcon width={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default BudgetItem;
