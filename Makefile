run:
	docker run -d -p 8888:8888 -v publicData:/public --rm --name iteam iteamcompany/iteam
run-dev:
	docker run -d -p 8888:8888 -v /Users/YevhenSemenuk/Work/iteam-back-end:/server -v /server/node_modules -v publicData:/public --rm --name iteam iteamcompany/iteam
stop:
	docker stop iteam