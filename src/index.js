import React from "react";
import { createRoot } from "react-dom/client";
import KeeperBook from "./components/KeeperBook";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(<KeeperBook />);
