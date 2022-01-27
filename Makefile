SRC=src
DIST=dist

ENTRYPOINT=cardlock
TS_SOURCES=$(shell find $(SRC) -type f -name '*.ts')
LOCKFILE=pnpm-lock.yaml
TSC=./node_modules/.bin/tsc
ESLINT=./node_modules/.bin/eslint_d
PRETTIER=./node_modules/.bin/prettier

default all: $(TS_SOURCES) Makefile node_modules
	$(TSC)

node_modules: package.json $(LOCKFILE)
	pnpm install

lint: node_modules
	$(PRETTIER) $(TS_SOURCES) || exit 1
	$(ESLINT) $(TS_SOURCES) || exit 1

fix: node_modules
	$(PRETTIER) $(TS_SOURCES) --write
	$(ESLINT) $(TS_SOURCES) --fix

.PHONY: lint fix
