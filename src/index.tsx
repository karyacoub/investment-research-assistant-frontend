import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Router } from "./components/Router"
import "./styles/index.scss"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
