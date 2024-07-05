
serve: data/classicspells.json data/classicunits.json
	python3 -m http.server

data/classicspells.json:
	curl -o $@ "https://raw.githubusercontent.com/lewster32/archaos/main/assets/data/classicspells.json"

data/classicunits.json:
	curl -o $@ "https://raw.githubusercontent.com/lewster32/archaos/main/assets/data/classicunits.json"
