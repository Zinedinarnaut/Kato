const setCookie = (c_name: string, value: string, exdays: any) => {
	let exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	let c_value = escape(value) + (exdays == null ? '' : '; expires=' + exdate.toUTCString());
	document.cookie = c_name + '=' + c_value;
};

const getCookie = (c_name: string) => {
	let c_value: string | null = document.cookie;
	let c_start = c_value.indexOf(' ' + c_name + '=');
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + '=');
	}
	if (c_start == -1) {
		c_value = null;
	} else {
		c_start = c_value.indexOf('=', c_start) + 1;
		let c_end = c_value.indexOf(';', c_start);
		if (c_end == -1) {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start, c_end));
	}
	return c_value;
};

const checkSession = () => {
	let c = getCookie('visited');
	if (c === 'yes') {
		return true;
	}
	setCookie('visited', 'yes', 365); // expire in 1 year; or use null to never expire
	return false;
};

export { checkSession };
