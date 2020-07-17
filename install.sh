#! /bin/sh
apt update
apt install -y cec-utils node npm

chmod +x ./start.sh

cp ./service /etc/init.d/HomeAssistantRemoteCEC

chmod 755 /etc/init.d/HomeAssistantRemoteCEC

update-rc.d HomeAssistantRemoteCEC defaults

systemctl daemon-reload

update-rc.d HomeAssistantRemoteCEC enable
