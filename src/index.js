
import { rTLDs, gTLDs } from "../META/geo.js";
import { defailt as countryNames } from '../META/iso.js'
import { parse } from 'tldts';

function __geo(tld) {
	if (tld.length == 2 && countryNames[tld]) {
		return {
			iso: tld,
			...countryNames[tld]
		}
	} else if (gTLDs[tld]) {
		return {
			iso: gTLDs[tld],
			...countryNames[gTLDs[tld]]
		}
	} else if (rTLDs[tld]) {
		return { region: rTLDs[tld] };
	} else {
		return {
			iso: "us",
			...countryNames["us"]
		}
	}
}

export function extract(url) {
	if (!hostname) return;

	const parsed = parse(url);
	const tld = url.substr(url.lastIndexOf(".")+1);
	const co = __geo(tld);
	return {
		domain: parsed.domain,
		subdomains: parsed.subdomain.split("."),
		name: parsed.domainWithoutSuffix,
		suffix: parsed.publicSuffix,
		tld: tld,
		...co
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
	const tld = url.substr(url.lastIndexOf(".")+1);
	return __geo(tld);
}

export function	countryNames() {
	return countryNames;
}
