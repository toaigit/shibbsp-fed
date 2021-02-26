#!/usr/bin/env bash

export USERUID=47933
echo "Setting USERID to $USERUID"
echo "You need to change when you deploy on a different server"
sleep 2
docker network create feddemoNET

docker image build --network feddemoNET --build-arg USERUID=$USERUID -t feddemo .

echo " "
echo "Don't forget to copy files/DocRoot to your Apache Home Directory."
echo "  cd files/DocRoot; cp -pr /home/toaivo/data/feddemo/html"
