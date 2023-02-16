import React from "react";
import SpotName from "./SpotName";
import { Outlet } from "react-router-dom";

function App() {
    //const currentDate = new Date();
    //const start = currentDate.toISOString().split("T")[0];
    //const endDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    //const end = endDate.toISOString().split("T")[0];

    return (
        <div className="flex flex-row gap-1 justify-between w-px-600 h-px-400 bg-indigo-900">
            <SpotName />
            <Outlet />
        </div>
    );
}

export default App;
