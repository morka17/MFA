# Makefile

# Variables
MIGRATION_NAME ?= init

# Default target
all: migrate

# Migration targets
migrate:
	npx prisma migrate dev --name $(MIGRATION_NAME)

migrate-down:
	npx prisma migrate reset --force --skip-seed

ts-init: 
	

# Clean target (optional, for cleaning generated files if needed)
clean:
	rm -rf prisma/migrations/*

.PHONY: all migrate migrate-down clean
