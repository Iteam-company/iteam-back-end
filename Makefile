# app name should be overridden.
# ex) production-stage: make build APP_NAME=<APP_NAME>
# ex) development-stage: make build-dev APP_NAME=<APP_NAME>

APP_NAME = iteam-back-end
APP_NAME := $(APP_NAME)

.PHONY: build
# Build the container image - Dvelopment
build-dev:
	docker build -t ${APP_NAME}\
		--target development-build-stage\
		-f Dockerfile .

# Build the container image - Production
build:
	docker build -t ${APP_NAME}\
		--target production-build-stage\
		-f Dockerfile .

# Clean the container image
clean:
	docker rmi -f ${APP_NAME}

# Run the container image
run:
	docker run -it --rm -p 3000:1337 ${APP_NAME}

run-dev:
	docker run -v "C:/projects/iteam-back-end/src:/app/src" -v /app/node_modules --rm -it -p 3000:1488 ${APP_NAME}

all: build