import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const DEFAULT_OPTIONS = {
	method: 'GET',
	headers: { 'Content-Type': 'application/json' },
};

export default function useFetch({ URL, options = DEFAULT_OPTIONS, triggerFetch }) {
	const isScreenFocused = useIsFocused();
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// console.log('isLoading?', isLoading);
	// console.log('focused?', isScreenFocused);
	// console.log('Error?', error);

	useEffect(() => {
		const requestController = new AbortController();
		if (!isScreenFocused) return;

		setError(null);
		setIsLoading(true);

		fetch(URL, { ...options, signal: requestController.signal })
			.then(response => {
				// you can throw a custom error to simulate a network or server error
				// throw new Error('Unhandled error');
				if (!response.ok) return setError(response.statusText);
				else return response.json();
			})
			.then(data => {
				console.log('[DATA]', data);
				setData(data);
				setIsLoading(false);
			})
			.catch(error => {
				setError(error);
			})
			//.finally(() => setIsLoading(false));

		return () => requestController.abort();
	}, [triggerFetch, isScreenFocused]);

	return { isLoading, data, error };
}
