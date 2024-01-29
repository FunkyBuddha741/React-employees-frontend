import { toast, Slide, ToastOptions } from 'react-toastify';

export function showToast(message = '', type = '') {
	function toastType(type) {
		switch (type) {
			case 'dark':
				return toast.type;
			case 'error':
				return toast.type;
			case 'info':
				return toast.type;
			case 'success':
				return toast.type;
			case 'warning':
				return toast.type;
			default:
				return toast.type;
		}
	}

	toast(message, {
		position: 'top-right',
		icon: true,
		hideProgressBar: false,
		pauseOnHover: true,
		closeOnClick: true,
		pauseOnFocusLoss: false,
		transition: Slide,
		type: toastType(type),
		autoClose: 3000,
	});
}
