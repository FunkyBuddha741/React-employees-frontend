import { useState } from 'react';

export const useSessionStorage = (keyName, defaultValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = window.sessionStorage.getItem(keyName);
			if (value) {
				return JSON.parse(value);
			} else {
				window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
			}
		} catch (e) {
			return defaultValue;
		}
	});

	const setValue = (newValue) => {
		try {
			window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
		} catch (e) {
			console.log(e);
		}
		setStoredValue(newValue);
	};
	return [storedValue, setValue];
};
