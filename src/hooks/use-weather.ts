import  type {Coordinates} from "@/api/types"
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query"
import type { Search } from "lucide-react";

export const WEATHER_KEYS={
    weather:(coordinates: Coordinates) =>["weather", coordinates] as const,
    forecast:(coordinates: Coordinates) =>["forecast", coordinates] as const,
    location:(coordinates: Coordinates) =>["location", coordinates] as const,
    search:(query: string) =>["location-search", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
                    queryKey: WEATHER_KEYS.weather(coordinates ?? {lat: 0, lon: 0}),

                    queryFn: () => 
                        coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
                    enabled: !!coordinates,
    });
}

export function useForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
                    queryKey: WEATHER_KEYS.forecast(coordinates ?? {lat: 0, lon: 0}),

                    queryFn:()=> 
                        coordinates ? weatherAPI.getForecast(coordinates) : null,
                    enabled: !!coordinates,
    });
}

export function useReverseGeocastQuery(coordinates: Coordinates | null) {
    return useQuery({
                    queryKey: WEATHER_KEYS.location(coordinates ?? {lat: 0, lon: 0}),

                    queryFn:()=> 
                        coordinates?weatherAPI.reverseGeo(coordinates) : null,
                    enabled: !!coordinates,
    });
}

export function useLocationSearch(query: string) {
    return useQuery({
                    queryKey: WEATHER_KEYS.search(query),

                    queryFn:()=> weatherAPI.searchLocations(query),
                    enabled: query.length >3,
    });
}