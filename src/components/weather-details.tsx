import type { WeatherData } from "@/api/types";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";


interface WeatherDetailsProps {
    data: WeatherData;
}

export const WeatherDetails = ({data}:WeatherDetailsProps) => {
    
    const {wind, main, sys, timezone} = data;

    const getWindDirection = (degree:number ) =>{
        const directions = ["N", "NE", "E", "SE","S", "SW","W", "NW"];
        const index = Math.round(((degree%=360) < 0 ? degree + 360 : degree)/45) % 8;

        return directions[index];
    }

    // const formatTime = (timestamp : number) => {
    //     return format(new Date(timestamp * 1000),"h:mm a");
    // }

    function formatLocalTime(utcSeconds: number, timezoneOffsetSeconds: number): string {
       
        const utcMillis = utcSeconds * 1000;

        const localMillis = utcMillis + timezoneOffsetSeconds * 1000;

        const localDate = new Date(localMillis);
     
        let hours = localDate.getUTCHours();
        const minutes = localDate.getUTCMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;

        const minutesStr = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutesStr} ${ampm}`;
        }

        

    const details = [
        {
            title: "Sunrise",
            value: formatLocalTime(sys.sunrise, timezone),
            icon: Sunrise,
            color: "text-orange-500",
        },
        {
            title: "Sunset",
            value: formatLocalTime(sys.sunset, timezone),
            icon: Sunset,
            color: "text-blue-500",
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
            icon: Compass,
            color: "text-green-500",
        },

         {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-500",
        },
    ];


    
    return (

            <Card>
                <CardHeader>
                    <CardTitle> Weather Details</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {details.map((detail) =>{
                            return (
                                <div key={detail.title} className="flex items-center gap-3 rounded-lg border p-4">
                                    <detail.icon className={`h-5 w-5 ${detail.color}`} />
                                    <div>
                                        <p className="text-sm font-medium leading-none">{detail.title}</p>
                                        <p className="text-sm text-muted-foreground">{detail.value}</p>
                                    </div>    
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
    );
}

