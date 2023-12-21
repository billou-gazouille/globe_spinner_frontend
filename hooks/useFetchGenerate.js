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
        if (isLoadingGenerate)
		const request = requestsSequence[requestIndex];
		const { options=DEFAULT_OPTIONS, getNextURL } = request;
		// getNextURL is a callback in the form: (requestsProgress) => return nextURL;

		const requestController = new AbortController();

		if (!isScreenFocused) return;

		setRequestsProgress(prev => {
			return updatedRequests(prev, { error: null, isLoading: true });
		});

		console.log('nextURL: ', nextURL);

		fetch(nextURL, { ...options, signal: requestController.signal })
			.then(response => {
				if (!response.ok) {
					setRequestsProgress(prev => {
						return updatedRequests(prev, { error: response.statusText });
					});
					return;
				}
				return response.json();
			})
			.then(data => {
				//setNextURL(getNextURL(data));
				setNextURL(getNextURL(updatedRequests(requestsProgress, { data: data, isLoading: false })));
				//console.log('[DATA]', data);
				setRequestsProgress(prev => {
					return updatedRequests(prev, { data: data, isLoading: false });
				});
				setRequestIndex(prev => prev+1);
			})
			.catch(error => {
				setRequestsProgress(prev => {
					return updatedRequests(prev, { error: error, isLoading: false });
				});
			});

			return () => requestController.abort();
		
		}, [triggerFirstFetch, isScreenFocused, nextURL]);

	return requestsProgress;
}
