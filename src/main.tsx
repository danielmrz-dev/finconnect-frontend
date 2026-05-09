import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { TooltipProvider } from "./components/ui/tooltip";
import { HomePage } from "./pages/home-page";
import { TransactionsPage } from "./pages/transactions-page";
import { Paths } from "./routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionsContextProvider } from "./contexts/transactions-provider";
import { Navbar } from "./components/navbar";
import { ProfessionalsPage } from "./pages/professionals-page";
import { NotFoundPage } from "./pages/not-found-page";

const root = document.getElementById("root");

export const queryClient = new QueryClient();

ReactDOM.createRoot(root!).render(
  <QueryClientProvider client={queryClient}>
    <TransactionsContextProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path={Paths.Home} element={<App />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path={Paths.Transactions} element={<TransactionsPage />} />
            <Route path={Paths.Professionals} element={<ProfessionalsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Navbar/>
        </TooltipProvider>
      </BrowserRouter>
    </TransactionsContextProvider>
  </QueryClientProvider>,
);
