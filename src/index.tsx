import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createMemoryRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { spotsLoader } from "./SpotName";
import SurfCard, { spotDetailsLoader } from "./SurfCard";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createMemoryRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<App />} loader={spotsLoader}>
                <Route
                    path=":id"
                    element={<SurfCard />}
                    loader={spotDetailsLoader}
                />
            </Route>
        </Route>
    )
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
