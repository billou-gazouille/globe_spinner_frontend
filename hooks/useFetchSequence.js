import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const DEFAULT_OPTIONS = {
	method: 'GET',
	headers: { 'Content-Type': 'application/json' },
};

// To manage several fetches where the URL of the next fetch
// depends on the data received by the current fetch

export default function useFetchSequence({ firstURL, triggerFirstFetch, requestsSequence }) {
    
	const [nextURL, setNextURL] = useState(firstURL);
	
	const n = requestsSequence.length;
	const isScreenFocused = useIsFocused();
	const [requestsProgress, setRequestsProgress] = useState(Array(n).fill({
		data: null,
		error: null,
		isLoadingArray: false,
	}));
	
	const updateLatestRequest = (prevRequests, keyValuePairs) => {
		const requestsCopy = [...prevRequests];
		requestsCopy[requestsCopy.length-1] = { ...requestsCopy.at(-1), keyValuePairs };
		return requestsCopy;
	}
	
	useEffect(() => {
		const request = requestsSequence[requestIndex];
		const { getNextURL, options=DEFAULT_OPTIONS } = request;
		// getNextURL is a callback in the form: (data) => return nextURL;

		const requestController = new AbortController();

		if (!isScreenFocused) return;

		setRequestsProgress(prev => {
			return updateLatestRequest(prev, [
				{ key: error, value: null },
				{ key: isLoading, value: true },
			]);
		});

		fetch(nextURL, { ...options, signal: requestController.signal })
			.then(response => {
				if (!response.ok) return setError(response.statusText);
				else return response.json();
			})
			.then(data => {
				console.log('[DATA]', data);
				setRequestsProgress(prev => {
					return updateLatestRequest(prev, [
						{ key: data, value: data },
						{ key: isLoading, value: false },
					]);
				});
				setNextURL(getNextURL(data));
			})
			.catch(error => {
				setRequestsProgress(prev => {
					return updateLatestRequest(prev, [
						{ key: error, value: error },
						{ key: isLoading, value: false },
					]);
				});
			});

			return () => requestController.abort();
		
		}, [triggerFirstFetch, isScreenFocused, nextURL]);

	return requestsProgress;
}
