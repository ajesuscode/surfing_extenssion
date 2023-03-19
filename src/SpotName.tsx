import React, { useState } from "react";
import { surfSpots } from "./data/spots";
import { Link, useLoaderData } from "react-router-dom";

export async function spotsLoader() {
    const spots: Array<{
        name: string;
        lat: number;
        log: number;
    }> = surfSpots;
    return spots;
}
function SpotName() {
    const spots = useLoaderData() as Array<{
        name: string;
        lat: number;
        log: number;
        id: string;
    }>;
    const [activeSpot, setActiveSpot] = useState<null | {
        name: string;
        lat: number;
        log: number;
        id: string;
    }>(null);

    return (
        <div className="w-24 m-1 rounded-lg bg-indigo-800 flex flex-col gap-2 p-1 max-h-screen overscroll-none justify-between">
            {spots.map((spot) => (
                <Link
                    to={spot.id}
                    key={spot.id}
                    onClick={() => setActiveSpot(spot)} // Set the activeSpot state to the clicked spot
                >
                    <div
                        className={`rounded-md px-2 py-1 ${
                            activeSpot?.id === spot.id
                                ? "text-indigo-200 bg-indigo-600"
                                : "text-indigo-100 bg-indigo-900"
                        }`}
                    >
                        <div className="text-xs">{spot.name}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default SpotName;
