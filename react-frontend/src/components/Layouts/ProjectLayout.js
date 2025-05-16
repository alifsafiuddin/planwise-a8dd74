import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import IncomesPage from "../IncomesPage/IncomesPage";
import ExpensesPage from "../ExpensesPage/ExpensesPage";
import SavingsGoalPage from "../SavingsGoalPage/SavingsGoalPage";
import DebtsPage from "../DebtsPage/DebtsPage";
import AlertsPage from "../AlertsPage/AlertsPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "incomes":
                return <IncomesPage />;
case "expenses":
                return <ExpensesPage />;
case "savingsGoal":
                return <SavingsGoalPage />;
case "debts":
                return <DebtsPage />;
case "alerts":
                return <AlertsPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
