import { useState } from 'react';

export const useLocalStorage = (keyName, defaultValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = window.localStorage.getItem(keyName);
			if (value) {
				return JSON.parse(value);
			} else {
				window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
			}
		} catch (e) {
			return defaultValue;
		}
	});

	const setValue = (newValue) => {
		try {
			window.localStorage.setItem(keyName, JSON.stringify(newValue));
		} catch (e) {
			console.log(e);
		}
		setStoredValue(newValue);
	};
	return [storedValue, setValue];
};
