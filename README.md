With this Integration you can control a cec device (like a tv), that is not directly connected to your server with a raspberry, that acts as a cec "proxy"

## Supported Server Devices:
- Raspberry Pi 2 (not tested)
- __Raspberry Pi 3__
- Raspberry Pi 4 (not tested)
- Raspberry Pi Zero (not tested)
- *probably many more*

## Supported Server Operating Systems:
- __Raspberry Pi OS__
- every Debian based Distribution (not tested) 

## Server Installation:
1. Connect via SSH or open a Terminal
2. Run:
```
cd /
```
3. Run:
```
sudo git clone https://github.com/TessyPowder/Home-Assistant-remote-cec.git
```
4. Run:
```
cd Home-Assistant-remote-cec
```
5. Run:
```
sudo chmod +x ./install.sh
```
6. Run:
```
sudo ./install.sh
```
7. Connect the Raspberry Pi to your cec compatible device via HDMI
8. Assign a static local IP Adress to your Raspberry (in most cases via the web interface of your router)
9. Run:
```
sudo service HomeAssistantRemoteCEC start
```

The server will get started automatically after a reboot

## Home Assistant Configuration
Add the following to your HomeAssistant configuration.yaml and customize it to fit your setup:

```
rest_command:
  device_on:
    url: 'http://IP:8080/poweron'
  device_off:
    url: 'http://IP:8080/shutdown'
```

## Troubleshooting
- If nothing happens if you try to send a command:
  1. Make sure the server is running
  2. Make sure the server uses the right cecDeviceId (can be changed in the app.js file)(the cecDeviceId is in most cases 0)
- The server doesn't start because something else is running on port 8080:
  - You can change the port of the web server in the app.js file (remember to also update the home assistant configuration)
