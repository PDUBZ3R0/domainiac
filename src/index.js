
import { countryNames ,secondLevels, zaSchools, geoTlds } from "./metadata.js";

function __tld_country(tld) {
	if ((tld.length == 2 && countryNames[tld]) || geoTlds[tld] !== undefined) {
		let c = tld;
		if (geoTlds[tld]) c = geoTlds[tld];
		return c;
	} else {
		return "us";
	}
}

export function	extract(hostname) {
	if (!hostname) return;

	let parts = hostname.toLowerCase().trim().split(".");
	let tld = parts[parts.length-1];
	let sld = parts[parts.length-2];
	let co = __tld_country(tld);
	let domain, subs, showsld;
	
	let slmatch = secondLevels[tld];
	if (tld === 'za' && zaSchools.includes(sld)){
		sld = `school.${sld}`
		domain = parts[parts.length-4];
		subs = parts.splice(0,parts.length-4)
		showsld = {
			suffix: `${sld}.${tld}`,
			tld,
			sld
		}
	} else if (slmatch && slmatch.includes(sld)){
		domain = parts[parts.length-3];
		subs = parts.splice(0,parts.length-3)
		showsld = {
			suffix: `${sld}.${tld}`,
			tld,
			sld
		}
	} else {
		domain = sld
		subs = parts.splice(0,parts.length-2)
		showsld = {
			suffix: tld,
			tld
		}
	}
	
	return {
		...showsld,

		domain: `${domain}.${showsld.suffix}`,
		name: domain,
		subdomains: subs,
		country: co
	}
}

export function	cookieMatch(url, domain, path="/") {
	let __url = new URL(url);
	return __url.hostname.includes(domain) && (path === "/" || __url.pathname.includes(path));
}

export function	cookieDomain(domain){
	if (domain)	return API.extract(domain.startsWith(".") ? domain.substr(1) : domain).domain;
}

export function	country(hostname){
	let parts = hostname.toLowerCase().trim().split(".");
	let tld = parts[parts.length-1];
	return __tld_country(tld);
}

export function	countryNames() {
	return countryNames;
}
