/**
 * A synchronous function to check if the user is logged in. It needs to run on the client, on the server a error will be thrown
 * @returns A boolean if the user is logged in
 */
export function isLoggedIn() {
	const tokenExpires = localStorage.getItem('tokenExpires');

	const tokenExpiresTimestamp = tokenExpires ? parseInt(tokenExpires, 10) : 0;

	return tokenExpiresTimestamp > Date.now();
}
