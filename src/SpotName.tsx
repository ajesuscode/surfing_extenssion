import React from "react";
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
    return (
        <div className="w-24 m-1 rounded-lg bg-indigo-800 flex flex-col gap-2 p-1 max-h-screen overscroll-none">
            {spots.map((spot) => (
                <Link to={spot.id} key={spot.id}>
                    <div className="bg-indigo-900 rounded-md p-1">
                        <div className="text-indigo-100 text-xs">
                            {spot.name}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default SpotName;
