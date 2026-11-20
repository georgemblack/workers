import { render } from "preact";
import { App } from "./components/App";
import { ImportPage } from "./components/ImportPage";

const page = location.pathname === "/admin/import" ? <ImportPage /> : <App />;
render(page, document.getElementById("app")!);
