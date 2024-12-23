DOCKER_IMAGE:=chaos

serve_local: #data/classicspells.json data/classicunits.json
	python3 -m http.server --directory src

src/data/classicspells.json:
	curl -o $@ "https://raw.githubusercontent.com/lewster32/archaos/main/assets/data/classicspells.json"

src/data/classicunits.json:
	curl -o $@ "https://raw.githubusercontent.com/lewster32/archaos/main/assets/data/classicunits.json"


channelServer:
	git clone https://github.com/calaldees/channelServer.git
#build: channelServer
#	docker build --tag ${DOCKER_IMAGE} .
run: channelServer
	docker compose up --build nginx
