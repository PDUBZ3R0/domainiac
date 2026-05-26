
// Geographic gTLDs (not ccTLDs) → ISO-2 of associated country.
// Source: hand-curated from ICANN delegation records + Wikipedia geoTLD list.
// Add to this manually; it doesn't change often (~once per new-gTLD round).
export const gTLDs = {
  "ac": "sh",           // Historically Ascension Island (used as academic)
  "cat": "es",          // Catalan language community
  "gal": "es",          // Galician language
  "bzh": "fr",          // Breton (Brittany)
  "kiwi": "nz",         // sometimes geo-restricted, sometimes not
  "irish": "ie",
  "scot": "gb",         // Scotland
  "wales": "gb",
  "cymru": "gb",        // Wales (Welsh)
  "london": "gb",
  "uk": "gb",
  "berlin": "de",
  "hamburg": "de",
  "koeln": "de",        // Cologne
  "cologne": "de",
  "saarland": "de",
  "bayern": "de",       // Bavaria
  "nrw": "de",          // North Rhine-Westphalia
  "ruhr": "de",
  "paris": "fr",
  "alsace": "fr",
  "corsica": "fr",
  "amsterdam": "nl",
  "frl": "nl",          // Friesland
  "brussels": "be",
  "vlaanderen": "be",   // Flanders
  "gent": "be",
  "wien": "at",         // Vienna
  "tirol": "at",
  "zuerich": "ch",      // Zurich
  "swiss": "ch",
  "barcelona": "es",
  "madrid": "es",
  "rio": "br",
  "tokyo": "jp",
  "nagoya": "jp",
  "osaka": "jp",
  "yokohama": "jp",
  "kyoto": "jp",
  "okinawa": "jp",
  "ryukyu": "jp",
  "moscow": "ru",
  "tatar": "ru",
  "москва": "ru",
  "istanbul": "tr",
  "ist": "tr",
  "nyc": "us",
  "vegas": "us",
  "miami": "us",
  "boston": "us",
  "quebec": "ca",
  "sydney": "au",
  "melbourne": "au",
  "durban": "za",
  "joburg": "za",
  "capetown": "za",
  "dubai": "ae",
  "abudhabi": "ae",
  "doha": "qa",
  "taipei": "tw",
  "helsinki": "fi",
  "stockholm": "se",
  "budapest": "hu",
  "warszawa": "pl",
};

// Region TLDs that represent more than one country.
export const rTLDs = {
  "asia": "Asia",
  "africa": "Africa",
  "eu": "Europe",           
  "lat": "Americas",        
  "arab": "Asia",         // Arab League (Asia and Africa)
  "eus": "Europe"         // Basque language (France and Spain)
};