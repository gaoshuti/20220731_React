#!/bin/bash
target=$1;
if [ -z $target ]; then
  echo "usage:";
  echo;
  echo "./start.sh nginx|backend|frontend";
elif [ "$target" == "backend" ]; then
  echo "starting backend";
  cd backside
  nohup python3 ./manage.py runserver 0.0.0.0:8111 > ../../nohup.out
  cd -;
elif [ "$target" == "frontend" ]; then
  echo "building frontend";
  cd my-app;
  npm run build;
  cp -rp build/* /var/www/weather/;
  cd -;
elif [ "$target" == "docker" ]; then
  echo "starting docker";
  docker rm weather-nginx
  docker run --name weather-nginx -v /var/www/weather:/usr/share/nginx/html:ro -v /root/count_on_weather/default.conf:/etc/nginx/conf.d/default.conf  -p 1111:80 -d nginx
fi
