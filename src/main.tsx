import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { HomePage } from "./pages/home-page";
import { Paths } from "./routes";
import { TransactionsPage } from "./pages/transactions-page";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path={Paths.Home} element={<App />}>
        <Route index element={<HomePage />} />
      </Route>
      
      <Route path={Paths.Transactions} element={<TransactionsPage />}/>
      
    </Routes>
  </BrowserRouter>,
);
