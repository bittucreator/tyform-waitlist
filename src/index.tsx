import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Tyform } from "./screens/Tyform";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Tyform />
  </StrictMode>,
);
