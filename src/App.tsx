import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import MenuIndex from "./pages/MenuIndex.tsx";
import MacroPage from "./pages/menu/MacroPage.tsx";
import Favorites from "./pages/Favorites.tsx";
import InfoPage from "./pages/InfoPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import { LocaleProvider } from "./i18n/LocaleContext.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocaleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<MenuIndex />} />
            <Route path="/menu/:macro" element={<MacroPage />} />
            <Route path="/cerca" element={<SearchPage />} />
            <Route path="/preferiti" element={<Favorites />} />
            <Route path="/info" element={<InfoPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LocaleProvider>
  </QueryClientProvider>
);

export default App;
