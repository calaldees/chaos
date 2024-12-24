run: channelServer
	docker compose up --build

serve_files_for_local:
	python3 -m http.server
serve_channelServer_for_local: channelServer
	docker compose run --service-ports channel-server

src/data/classicspells.json:
	curl -o $@ "https://raw.githubusercontent.com/lewster32/archaos/main/assets/data/classicspells.json"
src/data/classicunits.json:
	curl -o $@ "https://raw.githubusercontent.com/lewster32/archaos/main/assets/data/classicunits.json"

channelServer:
	git clone https://github.com/calaldees/channelServer.git

shell_debug_minify:
	docker build --tag debug_minify --target build .
	docker run --rm -it debug_minify /bin/sh
