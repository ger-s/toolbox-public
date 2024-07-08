import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./pages/Home"
import List from "./pages/List"
import File from "./pages/File"
import CustomNavbar from "./components/CustomNavbar"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <StrictMode>
    <BrowserRouter>
      <CustomNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/files" component={List} />
        <Route exact path="/files/:file" component={File} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </StrictMode>
)

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount())
}
