import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { TooltipProvider } from "./components/ui/tooltip";
import { HomePage } from "./pages/home-page";
import { TransactionsPage } from "./pages/transactions-page";
import { Paths } from "./routes";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <TooltipProvider>
      <Routes>
        <Route path={Paths.Home} element={<App />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path={Paths.Transactions} element={<TransactionsPage />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>,
);
