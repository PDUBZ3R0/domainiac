
import { get } from 'toltha'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import JSON5 from 'json5'

const __dirname = import.meta.dirname;
const ISO_URL = "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/refs/heads/master/all/all.json";
const ISO_PREFIX = "// ISO alpha-2 country codes to name/region lookup table\n// Extrapolated from: " + ISO_URL + "\n// on " + 
	new Date().toString() + "\n\n" + "export default ";

function sha(secret){
	return createHash('sha256').update(secret).digest('hex');
}

const isoHash = (()=>{
	const filename = join(__dirname, "../META/iso.hash")
	return {
		load() {
			if (existsSync(filename)) {
				return readFileSync(filename, 'utf-8');
			}
		},
		save(hash) {
			writeFileSync(filename, hash, 'utf-8');
		}
	}
})()

function updatePackage() {
	const PACKAGE_JSON = join(import.meta.dirname, "../package.json");
	const package_json = JSON.parse(readFileSync(PACKAGE_JSON, "utf-8"));
	const today = new Date();
	const year = today.getFullYear().toString();
	const month = (today.getMonth()+1).toString();
	const version = `${year.substr(0,2)}.${year.substr(2)}.${month.length < 2 ? "0":""}${month}`
	package_json.version = version;
	writeFileSync(PACKAGE_JSON, JSON.stringify(package_json, null, 2));
}

function updateISO(){
	get(ISO_URL).then(response=>{
		let output = {};
		if (response.ok) {
			let text = response.text();
			let hash = sha(text);
			if (hash !== isoHash.load()){
				console.log("ISO data: OK -Detected changes to ISO data.\nNew data ready for check-in.");
				isoHash.save(hash);
				let data = JSON.parse(text);
				for (let country of data) {
					output[country["alpha-2"].toLowerCase()] = {
						country: country.name,
						region: country.region
					}
				}
				writeFileSync(join(__dirname, "../META/iso.js"), ISO_PREFIX + JSON5.stringify(output, null, 2));
				updatePackage();
			} else {
				console.log("ISO data: OK - no changes.");
				process.exit(1);
			}
		} else {
			console.log("ISO data: FAIL - retrieval failed.");
			process.exit(666);
		}
	})
}

updateISO();