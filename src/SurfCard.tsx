import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import {
    XAxis,
    YAxis,
    Bar,
    BarChart,
    AreaChart,
    Area,
    Cell,
    Tooltip,
} from "recharts";
import { surfSpots } from "./data/spots";
import {
    convertToTidesArray,
    surfQualityPrediction,
    addMinMaxSwellHeight,
    convertToTides,
} from "./helpers/transformData";

export async function spotDetailsLoader(params: { [key: string]: any }) {
    const surfSpot = surfSpots.find((x) => x.id === params.params.id);
    return surfSpot;
}

function SurfCard() {
    const spot = useLoaderData() as any;
    const [hourlySurfData, setHourlySurfData] = useState<
        { [key: string]: any }[]
    >([]);
    const [dailySurfData, setDailySurfData] = useState<
        { [key: string]: any }[]
    >([]);
    const [tide, setTide] = useState<{ [key: string]: any }[]>([]);

    useEffect(() => {
        getSurfDataApiCall();
    }, [spot]);

    // spot constants
    const surfApi = process.env.REACT_APP_SURF_API;
    const lat = spot.lat;
    const lon = spot.log;
    // free url to get surf forecast
    //const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${log}&hourly=wave_height,wave_direction,wave_period&daily=wave_height_max,wave_direction_dominant,wave_period_max&timezone=Europe%2FBerlin`;
    // Surf forecast call
    const url = `https://api.worldweatheronline.com/premium/v1/marine.ashx?key=${surfApi}&q=${lat},${lon}&format=json&tide=yes&tp=1`;

    const getSurfDataApiCall = async () => {
        const res = await axios.get(url);
        const surfData = res.data.data.weather;
        const dailySurf = res.data.data.weather;
        console.log(surfData);
        setHourlySurfData(surfQualityPrediction(surfData[0].hourly));
        setTide(convertToTidesArray(surfData));
        setDailySurfData(addMinMaxSwellHeight(dailySurf));
    };

    const handleClick = (data: any) => {
        setHourlySurfData(surfQualityPrediction(data.hourly));
        setTide(convertToTides(data));
    };

    //const getSurfDataApiCall = async () => {
    //const resData = await axios.get(url);
    //setHourlySurfData((prevData) =>
    //transformHourlyData(resData.data.hourly)
    //);
    //setDailySurfData((prevData) => transformDailyData(resData.data.daily));
    // };

    const CurrentConditions = () => {
        const date = new Date();
        let hour: string = date.getHours().toString();
        hour = hour.length === 1 ? `0${hour}` : hour;
        if (hourlySurfData.length > 0) {
            const conditionsData = hourlySurfData.find(
                (obj) => obj.time === hour
            );
            if (conditionsData) {
                return (
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col m-1 bg-indigo-900/50 rounded-md items-center">
                            <div className="text-3xs text-indigo-200 font-thin">
                                Water
                            </div>
                            <div className="text-2xs text-indigo-200 font-bold">
                                {conditionsData.waterTemp_C}
                            </div>
                        </div>
                        <div className="flex flex-col m-1 bg-indigo-900/50 rounded-md items-center">
                            <div className="text-3xs text-indigo-200 font-thin">
                                Air
                            </div>
                            <div className="text-2xs text-indigo-200 font-bold">
                                {conditionsData.tempC}
                            </div>
                        </div>
                        <div className="flex flex-col m-1 bg-indigo-900/50 rounded-md items-center">
                            <div className="text-3xs text-indigo-200 font-thin">
                                Swell
                            </div>
                            <div className="text-2xs text-indigo-200 font-bold">
                                {conditionsData.swellDir16Point}
                            </div>
                        </div>
                        <div className="flex flex-col m-1 bg-indigo-900/50 rounded-md items-center">
                            <div className="text-3xs text-indigo-200 font-thin">
                                Period
                            </div>
                            <div className="text-2xs text-indigo-200 font-bold">
                                {conditionsData.swellPeriod_secs}
                            </div>
                        </div>
                        <div className="flex flex-col m-1 bg-indigo-900/50 rounded-md items-center">
                            <div className="text-3xs text-indigo-200 font-thin">
                                Wind
                            </div>
                            <div className="text-2xs text-indigo-200 font-bold">
                                {conditionsData.winddir16Point}
                            </div>
                        </div>
                        <div className="flex flex-col m-1 bg-indigo-900/50 rounded-md items-center">
                            <div className="text-3xs text-indigo-200 font-thin">
                                Speed
                            </div>
                            <div className="text-2xs text-indigo-200 font-bold">
                                {conditionsData.windspeedKmph}
                            </div>
                        </div>
                        <div className="col-span-2 m-1 bg-indigo-900/50 rounded-md content-center">
                            <div className="text-2xs text-indigo-200 font-medium m-2">
                                {conditionsData.weatherDesc[0].value}
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <div>No data available</div>
                    </div>
                );
            }
        } else {
            return <div>Loading...</div>;
        }
    };

    const HourlyTooltip = (data: any) => {
        if (data.active === true) {
            return (
                <div className="flex flex-col bg-indigo-900 opacity-90 rounded-md w-20 h-28 p-2">
                    <div className="text-indigo-100 pt-1 text-3xs ">
                        {data.payload[0].payload.weatherDesc[0].value}
                    </div>
                    <div className="text-indigo-100 pt-1 text-3xs ">
                        {`Swell: ${data.payload[0].payload.swellHeight_m} m`}
                    </div>
                    <div className="text-indigo-100 pt-1 text-3xs ">
                        {`Period: ${data.payload[0].payload.swellPeriod_secs} s`}
                    </div>
                    <div className="text-indigo-100 pt-1 text-3xs ">
                        {`Swell Dir: ${data.payload[0].payload.swellDir16Point}`}
                    </div>
                    <div className="text-indigo-100 pt-1 text-3xs ">
                        {`Wind: ${data.payload[0].payload.windspeedKmph} km/h`}
                    </div>
                    <div className="text-indigo-100 pt-1 text-3xs ">
                        {`Wind: ${data.payload[0].payload.winddir16Point}`}
                    </div>
                </div>
            );
        } else return null;
    };

    console.log(tide);
    console.log(dailySurfData);
    console.log(hourlySurfData);

    return (
        <>
            <div className="flex flex-row gap-1 flex-auto">
                {hourlySurfData && dailySurfData && tide && (
                    <div className="bg-indigo-800 rounded-lg my-1">
                        <div className="px-10 py-1 text-2xs text-indigo-200/50">
                            Hourly forecast
                        </div>
                        <BarChart
                            barGap={10}
                            maxBarSize={10}
                            width={350}
                            height={130}
                            data={hourlySurfData.slice(0, 25)}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <XAxis
                                dataKey={"time"}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    strokeWidth: 1,
                                    fontSize: 6,
                                    fill: "#eef2ff",
                                }}
                            />
                            <YAxis
                                axisLine={false}
                                domain={[0, "dataMax"]}
                                tickCount={10}
                                tick={{
                                    strokeWidth: 1,
                                    fontSize: 8,
                                    fontWeight: "bold",
                                    fill: "#eef2ff",
                                }}
                                padding={{ top: 10 }}
                            />
                            <Bar
                                dataKey="swellHeight_m"
                                fill="#84cc16"
                                barSize={8}
                            >
                                {hourlySurfData.map((i, index) => (
                                    // У fill треба прописати номер кольора, який кастомно записати в масив в залежності від серф кондішинів
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={i.quality}
                                        strokeWidth={i.tempC}
                                    />
                                ))}
                            </Bar>
                            <Tooltip
                                content={
                                    <HourlyTooltip data={hourlySurfData} />
                                }
                            />
                        </BarChart>
                        <div className="px-10 py-1 text-2xs text-indigo-200/50">
                            Tide
                        </div>
                        <AreaChart
                            width={350}
                            height={60}
                            data={tide.slice(0, 5)}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <XAxis
                                dataKey="tideTime"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    strokeWidth: 1,
                                    fontSize: 8,
                                    fill: "#eef2ff",
                                }}
                            />
                            <YAxis
                                dataKey="tideHeight"
                                axisLine={false}
                                tickLine={false}
                                tick={false}
                                type="number"
                            />
                            <Area
                                type="monotone"
                                dataKey="tideHeight"
                                stroke="#8884d8"
                                fill="#fca5a5"
                            />
                        </AreaChart>
                        <div className="px-10 py-1 text-2xs text-indigo-200/50">
                            Daily forecast
                        </div>
                        <BarChart
                            barCategoryGap={15}
                            maxBarSize={15}
                            width={350}
                            height={80}
                            data={dailySurfData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <XAxis
                                dataKey={"day"}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    strokeWidth: 1,
                                    fontSize: 8,
                                    fill: "#eef2ff",
                                }}
                            />
                            <YAxis
                                axisLine={false}
                                domain={[0, "dataMax"]}
                                tickCount={12}
                                tick={false}
                                padding={{ top: 10 }}
                            />
                            <Bar
                                dataKey="maxSwellHeight"
                                label={{
                                    position: "top",
                                    fontSize: 8,
                                    fill: "#eef2ff",
                                }}
                                fill="#4338ca"
                                barSize={10}
                                onClick={handleClick}
                            />
                            <Bar
                                dataKey="minSwellHeight"
                                label={{
                                    position: "top",
                                    fontSize: 8,
                                    fill: "#eef2ff",
                                }}
                                fill="#4338ca"
                                barSize={10}
                            />
                        </BarChart>
                    </div>
                )}
                <div className=" bg-indigo-800 my-1 rounded-lg w-24 flex flex-col gap-1 max-h-screen">
                    <div className="text-3xs text-indigo-300 font-medium p-1 self-center">
                        Current Conditions
                    </div>
                    <CurrentConditions />
                </div>
            </div>
        </>
    );
}

export default SurfCard;
