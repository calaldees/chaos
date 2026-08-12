.PHONY: help
.DEFAULT_GOAL:=help
help:	## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-8s\033[0m %s\n", $$1, $$2 } END{print ""}' $(MAKEFILE_LIST)

run:  ## build and run whole stack with docker/nginx/nanomq
	docker compose up --build

serve_files_for_local:  ##  serve static files on localhost:8000
	python3 -m http.server
#serve_channelServer_for_local: channelServer  ##  channelServer on port localhost:9800
#	docker compose run --rm --service-ports channel-server

src/data/classicspells.json:
	curl -o $@ "https://raw.githubusercontent.com/lewster32/archaos/main/assets/data/classicspells.json"
src/data/classicunits.json:
	curl -o $@ "https://raw.githubusercontent.com/lewster32/archaos/main/assets/data/classicunits.json"

#channelServer:
#	git clone https://github.com/calaldees/channelServer.git

shell_debug_minify:
	docker build --tag debug_minify --target build .
	docker run --rm -it debug_minify /bin/sh

src/u8-mqtt.js:
	curl --url https://cdn.jsdelivr.net/npm/u8-mqtt/esm/web/index.js --output src/u8-mqtt.js

cloc:  ## cloc - lines of code count
	cloc --vcs=git --exclude-dir=data
