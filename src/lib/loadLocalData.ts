/**
 * A function to load locale JSON data as a Object from the static/data directory
 * @param name {String} The name of the file without the abbreveation and without the path, it must be a JSON file inside of the static/data directory
 */
export function loadLocaleJSONData(name: string) {
	return window
		.fetch(`/data/${name}.json`, {})
		.then((res) => {
			return res.json();
		})
		.then((j) => {
			return j;
		})
		.catch(() => {
			return {};
		});
}
