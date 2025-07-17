import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandSeparator } from "@/components/ui/command";
import { Button } from "./ui/button";
import { CommandEmpty, CommandList } from "./ui/command";
import { useState } from "react";
import { Loader, Loader2, Search } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";


const CitySearch = () => {

    const [open , setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const {data: locations, isLoading} =  useLocationSearch(query);

    const handleSelect = () =>{};

    return (
    <>
        <Button
            variant="outline"
            onClick={() => setOpen(true)}
            className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 ">
            <Search className="mr-2 h-4 w-4"/> 
            Search Cities ...
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput 
                placeholder="Search Cities ... "
                value={query}
                onValueChange={setQuery}
            />
            <CommandList>
                {query.length > 2 && !isLoading && (<CommandEmpty>No Cities Found.</CommandEmpty>)}
                <CommandGroup heading ="Favorites">
                    <CommandItem>Calender</CommandItem>
                </CommandGroup>

                <CommandSeparator/>

                 <CommandGroup heading ="Recent Searches">
                    <CommandItem>Calender</CommandItem>
                </CommandGroup>

                
                <CommandSeparator/>
                {locations && locations.length > 0 && (
                 <CommandGroup heading ="Suggestions">
                    {isLoading &&(
                        <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin"/>
                        </div>
                    )}
                    {locations.map((location) =>{
                        return ( 
                        <CommandItem 
                            key={`${location.lat}-${location.lon}`}
                            value={`${location.lat}|l${location.lon}|${location.name}|${location.country}`}
                            onSelect={handleSelect}
                        >
                            <Search className="mr-2 h-4 w-4"/>
                            <span>{location.name}</span>
                            {location.state &&(
                                <span className="text-sm text-muted-foreground">
                                    , {location.state}
                                </span>
                            )}
                            <span className="text-sm text-muted-foreground">
                                , {location.country}
                            </span>
                        </CommandItem>
                        );
                    })}
                   
                </CommandGroup>)}
            </CommandList>
        </CommandDialog>
    </>
    );
}


export default CitySearch;