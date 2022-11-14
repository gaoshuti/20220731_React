#!/bin/bash
docker rm weather-nginx
docker run --name weather-nginx -v /var/www/weather:/usr/share/nginx/html:ro -v /root/count_on_weather/default.conf:/etc/nginx/conf.d/default.conf  -p 1111:80 -d nginx
