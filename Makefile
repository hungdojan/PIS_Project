ENGINE=podman
# ENGINE=docker

# aka compose.yaml `name` value
PREFIX=pis-project

.PHONY: build up down prune clear_db clear_net

# build/update local images
build: compose.yaml
	$(ENGINE)-compose build

# start containers
up: compose.yaml update_fe
	$(ENGINE)-compose up

# stop containers
down: compose.yaml
	$(ENGINE)-compose down

# remove all images, networks and volumes related to this project
prune: down clear_db clear_net
	@echo -n "Do you want to remove installed data? [y/N]"; \
	read -n 1 -r; \
	echo ""; \
	if [[ "$$REPLY" =~ ^[Yy]$$ ]]; then \
		for i in $$($(ENGINE) images --format 'table {{.Repository}}' | grep $(PREFIX);); do \
			$(ENGINE) rmi $$i --force; \
		done; \
		$(ENGINE) rmi nginx node maven mariadb --force; \
	fi
	$(ENGINE) image prune -f

# remove created volumes
clear_db:
	$(ENGINE) volume rm $$($(ENGINE) volume ls --format 'table {{.Name}}' | grep $(PREFIX))

# remove created networks
clear_net:
	$(ENGINE) network rm $$($(ENGINE) network ls --format 'table {{.Name}}' | grep $(PREFIX))

# =====================
# shell into the selected container
.PHONY: shell_be shell_fe shell_db shell_nginx

shell_fe:
	$(ENGINE) exec -it $(PREFIX)_frontend_1 bash

shell_be:
	$(ENGINE) exec -it $(PREFIX)_backend_1 bash

shell_db:
	$(ENGINE) exec -it $(PREFIX)_database_1 bash

shell_nginx:
	$(ENGINE) exec -it $(PREFIX)_nginx_proxy_1 sh

# ======================
# display logs of the selected container
.PHONY: logs_be logs_fe logs_db logs_nginx

logs_fe:
	@$(ENGINE) logs $(PREFIX)_frontend_1

logs_be:
	@$(ENGINE) logs $(PREFIX)_backend_1

logs_db:
	@$(ENGINE) logs $(PREFIX)_database_1

logs_nginx:
	@$(ENGINE) logs $(PREFIX)_nginx_proxy_1

# ======================
.PHONY: status

# display status of running containers
status:
	$(ENGINE) ps -a | grep $(PREFIX)

# ======================
# utility commands
.PHONY: db_cli gen_mvnw update_fe

db_cli:
	$(ENGINE) exec -it $(PREFIX)_database_1 mariadb pis-db -uroot -p

db_preload:
	$(ENGINE) exec -it $(PREFIX)_database_1 bash -c "mariadb pis-db -uroot -p < /initial-data.sql"

# generate maven-wrapper to run backend locally without maven
get_mvnw:
	$(ENGINE) run -v ./pis-backend/:/tmp/data/:z docker.io/library/maven:3.8.4-openjdk-17 \
		bash -c "cd /tmp/data && mvn -N wrapper:wrapper"

# update frontend
update_fe:
	$(ENGINE) run -it --rm -v ./pis-frontend/:/opt/pis-frontend:z localhost/pis-project_frontend npm install
