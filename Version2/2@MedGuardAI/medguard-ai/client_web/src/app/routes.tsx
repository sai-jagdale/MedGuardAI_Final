import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { AIAssistant } from "./components/AIAssistant";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { About } from "./components/About";
import { Verify } from "./components/Verify";
import { History } from "./components/History";
import { Account } from "./components/Account";
import { NotFound } from "./components/NotFound";
import { TextInput } from "./components/inputs/TextInput";
import { BarcodeInput } from "./components/inputs/BarcodeInput";
import { Footer } from "./components/Footer";
import { HistoryViewer } from "./components/HistoryViewer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "features", Component: Features },
      { path: "how-it-works", Component: HowItWorks },
      { path: "about", Component: About },
      { path: "verify", Component: Verify },
      { path: "history", Component: History },
      { path: "account", Component: Account },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "dashboard", Component: Dashboard },
      { path: "ai-assistant", Component: AIAssistant },
      { path: "*", Component: NotFound },
      { path: "text-input", Component: TextInput },
      { path: "barcode-input", Component: BarcodeInput },
      { path: "footer", Component: Footer },
      { path: "historyviewer" , Component:HistoryViewer }
    ],
  },
]);