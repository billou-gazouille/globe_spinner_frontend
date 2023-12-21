import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const DEFAULT_OPTIONS = {
	method: 'GET',
	headers: { 'Content-Type': 'application/json' },
};

// To manage several fetches where the URL of the next fetch
// depends on the progress info (including data) of all the fetches until now

export default function useFetchSequence({ generateRouteURL, triggerFirstFetch }) {
    
	//const [nextURL, setNextURL] = useState(firstURL);
	const [generatedTrips, setGeneratedTrips] = useState(null);
	const [isLoadingGenerate, setIsLoadingGenerate] = useState(false);
    const [errorGenerate, setErrorGenerate] = useState(null);

    const [place1, setPlace1] = useState(null);
	const [isLoadingPlace1, setIsLoadingPlace1] = useState(false);
    const [errorPlace1, setErrorPlace1] = useState(null);

    const [place2, setPlace2] = useState(null);
	const [isLoadingPlace2, setIsLoadingPlace2] = useState(false);
    const [errorPlace2, setErrorPlace2] = useState(null);

    
	useEffect(() => {
        const fetchGenerate = async () => {
            let place1URL, place2URL;

            const filters = {
                lat: 49,
                lon: 2,
                budget: 10000,
                nbrOfTravelers: 1,
                departureMinOutbound: "2023-12-18",
                departureMaxOutbound: "2023-12-22",
                departureMinInbound: "2023-12-25",
                departureMaxInbound: "2023-12-29",
                types: ["Airplane", "Coach", "Train"],
            };

            const fetchGenerateRouteOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filters),
            };
    
            const requestController = new AbortController();
    
            if (!isScreenFocused) return;
    
            setIsLoadingGenerate(true);
    
            await fetch(generateRouteURL, { 
                options: fetchGenerateRouteOptions, 
                signal: requestController.signal 
            })
                .then(response => {
                    if (!response.ok) {
                        setErrorGenerate(response.statusText);
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    //console.log('[DATA]', data);
                    setGeneratedTrips(data);
                    setIsLoadingGenerate(false);
                    place1URL = `${imagesAPIprefix}${data[0].destination.name}+aerial`;
                    place2URL = `${imagesAPIprefix}${data[1].destination.name}+aerial`;
                })
                .catch(error => {
                    setErrorGenerate(error);
                });
            
            fetch(place1URL, { 
                options: DEFAULT_OPTIONS, 
                signal: requestController.signal 
            })
                .then(response => {
                    if (!response.ok) {
                        setErrorPlace1(response.statusText);
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    //console.log('[DATA]', data);
                    setPlace1(data);
                    setIsLoadingPlace1(false);
                })
                .catch(error => {
                    setErrorPlace1(error);
                });
            
            fetch(place2URL, { 
                    options: DEFAULT_OPTIONS, 
                    signal: requestController.signal 
                })
                .then(response => {
                    if (!response.ok) {
                        setErrorPlace2(response.statusText);
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    //console.log('[DATA]', data);
                    setPlace2(data);
                    setIsLoadingPlace2(false);
                })
                .catch(error => {
                    setErrorPlace2(error);
                });
    
            return () => requestController.abort();
        };
		
        fetchGenerate();
		
		}, [triggerFirstFetch, isScreenFocused, nextURL]);

	return { 
        generatedTrips, isLoadingGenerate, errorGenerate,
        place1, isLoadingPlace1, errorPlace1,
        place2, isLoadingPlace2, errorPlace2
    };
}
