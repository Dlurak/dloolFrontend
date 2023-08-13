export function isLoggedIn() {
	const tokenExpires = localStorage.getItem('tokenExpires');

	const tokenExpiresTimestamp = tokenExpires ? parseInt(tokenExpires, 10) : 0;

	return tokenExpiresTimestamp > Date.now();
}
