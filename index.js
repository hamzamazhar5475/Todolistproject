import React from "react";
import { createRoot } from "react-dom/client";
import KeeperBook from "./src/components/KeeperBook";
import "./../public/styles.css";

const root = createRoot(document.getElementById("root"));
root.render(<KeeperBook />);