
serve: classicspells.json classicunits.json
	python3 -m http.server

data/classicspells.json:
	curl -O "https://raw.githubusercontent.com/lewster32/archaos/main/assets/data/classicspells.json"

data/classicunits.json:
	curl -O "https://raw.githubusercontent.com/lewster32/archaos/main/assets/data/classicunits.json"
