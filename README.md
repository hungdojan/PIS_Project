# PIS_Project

## Makefile commands
- Init/update project: `make build`
- Start project: `make up`
- Stop project: `make stop`
- Uninstall project: `make prune`
- Shell into container: `make shell_<container>`
- Display container logs: `make logs_<container>`
- Update database:
    1. Turn off app: `make down`
    2. Update database: `make clear_db && make build`
    3. Turn on app: `make up`
- Open CLI database: `make db_cli`
