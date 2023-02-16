// Convert tides to more simple array
export function convertToTidesArray(array: any[]) {
    let tidesArray: {
        date: any;
        tideTime: any;
        tide_type: any;
        tideHeight: any;
    }[] = [];

    array.forEach((obj: { tides: any[]; date: any }) => {
        obj.tides.forEach((tideData: { tide_data: any }) => {
            tideData.tide_data.forEach(
                (tide: {
                    tide_type: any;
                    tideTime: any;
                    tideHeight_mt: any;
                }) => {
                    tidesArray.push({
                        date: obj.date,
                        tideTime: tide.tideTime,
                        tide_type: tide.tide_type,
                        tideHeight: tide.tideHeight_mt,
                    });
                }
            );
        });
    });

    return tidesArray;
}

// Surf Conditions Prediction
export function surfQualityPrediction(array: any[]) {
    let newArray: any[] = [];
    array.forEach(
        (obj: {
            swellHeight_m: string;
            windspeedKmph: string;
            winddirDegree: string;
            swellPeriod_secs: string;
            swellDir: string;
        }) => {
            let colorHex;
            let swellHeight = parseFloat(obj.swellHeight_m);
            let swellPeriod = parseFloat(obj.swellPeriod_secs);
            let windSpeed = parseFloat(obj.windspeedKmph);
            let swellDir = parseFloat(obj.swellDir);
            let windDir = parseFloat(obj.winddirDegree);
            // Determine the color hex string based on the values of multiple keys in the original object
            if (
                swellHeight < 0.6 &&
                windSpeed > 28 &&
                swellPeriod < 7 &&
                !(swellDir <= 355 && swellDir >= 240) &&
                !(windDir >= 45 && windDir <= 170)
            ) {
                colorHex = "#93c5fd"; // blue for poor surf conditions
            } else if (
                swellHeight >= 0.7 &&
                swellHeight < 1.2 &&
                windSpeed >= 20 &&
                windSpeed <= 27 &&
                swellPeriod >= 8 &&
                swellPeriod <= 12
            ) {
                colorHex = "#eab308"; // dark-yellow for moderate surf conditions
            } else if (
                swellHeight >= 1.2 &&
                swellHeight < 2 &&
                windSpeed >= 10 &&
                windSpeed <= 20 &&
                swellPeriod >= 10 &&
                swellPeriod <= 15
            ) {
                colorHex = "#fde047"; // yellow for moderate surf conditions
            } else {
                colorHex = "#bef264"; // lime for good surf conditions
            }

            newArray.push({ ...obj, quality: colorHex });
        }
    );

    return convertTimeFormat(newArray);
}

//Convert Time Key
function convertTimeFormat(array: any[]) {
    return array.map((obj: { time: string }) => {
        let time = obj.time;
        if (time.length < 4) {
            time = "0" + time.slice(0, 1);
        }
        obj.time = time.slice(0, 2);
        return obj;
    });
}

// transforming Surf data for recharts
function transformHourlyData(data: {
    [key: string]: any[];
}): { [key: string]: any }[] {
    const keys = Object.keys(data);
    return data[keys[0]]!.map((_, i) => {
        return keys.reduce((acc, key) => {
            if (key === "time") {
                const hour = new Date(data[key][i]).getHours();
                acc["hour"] = hour.toString();
            } else {
                acc[key] = data[key][i];
            }
            return acc;
        }, {} as { [key: string]: any });
    });
}

// transforming for recharts
function transformDailyData(data: {
    [key: string]: any[];
}): { [key: string]: any }[] {
    const keys = Object.keys(data);
    return data[keys[0]].map((_, i) => {
        return keys.reduce<{ [key: string]: any }>((acc, key) => {
            switch (key) {
                case "time":
                    const time = new Date(data[key][i]);
                    const day = time.toLocaleString("default", {
                        weekday: "short",
                    });
                    return { ...acc, [key]: day };
                default:
                    return { ...acc, [key]: data[key][i] };
            }
        }, {});
    });
}
