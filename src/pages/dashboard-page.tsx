import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import { AlertCircle, AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import React from "react";

const DashboardPage = () =>
{
    const {
        coordinates, 
        error: locationError, 
        getLocation, 
        isLoading: locationLoading,
    } = useGeolocation();
    
    const handleRefresh= () => {
        getLocation()
        if(coordinates){

        }
    };

    if(locationLoading)
    {
        return <WeatherSkeleton/>
    }

    if(locationError){
        return(<Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle> Location Error </AlertTitle>
            <AlertDescription>
                <p>{locationError}</p>
                <Button onClick={getLocation} variant={"outline"} className="w-fit">
                    <MapPin className="mr-2 h-4 w-4"/>
                    Enable Location
                </Button>
            </AlertDescription>
        </Alert>
        );
    }

    return (
    <div className="space-y-4">
        {/** Favorite Cities */}
        <div className="flex items-center justify-between">
           <h1 className="text-x1 font-bold tracking-tight"> My Location </h1>
           <Button variant={'outline'}
           size={"icon"}
           onClick={handleRefresh}
           //disabled={}
           >
                <RefreshCw className="h-4 w-4"/>
           </Button>
        </div>
    </div>
    );
};

export default DashboardPage;