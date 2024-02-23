// rrd imports
import { redirect } from "react-router";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

export function logoutAction() {
  //remove data
  deleteItem({ key: "userName" });
  deleteItem({ key: "budgets" });
  deleteItem({ key: "expenses" });
  // toast.success("You've deleted account!");
  //redirect
  return redirect("/");
}
