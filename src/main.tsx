import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { TooltipProvider } from "./components/ui/tooltip";
import { HomePage } from "./pages/home-page";
import { TransactionsPage } from "./pages/transactions-page";
import { Paths } from "./routes";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const root = document.getElementById("root");

const queryClient = new QueryClient();

ReactDOM.createRoot(root!).render(
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);
