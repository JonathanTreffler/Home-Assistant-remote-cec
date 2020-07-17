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
1. Clone this repository to your raspberry
2. Navigate to the repository folder in a ternminal (or ssh)
3. Run:
```
sudo chmod +x ./install.sh
```
4. Run:
```
sudo ./install.sh
```
5. Run:
```
sudo chmod +x ./start.sh
```
6. Connect the Raspberry Pi to your cec compatible device via HDMI
7. Assign a static local IP Adress to your Raspberry (in most cases via the web interface of your router)
8. Run:
```
./start.sh
```

The server doesn't get started automatically after the boot.
To start the server after a reboot repeat steps 2 and 8.

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

## Autostart
- Run:
```
sudo nano /etc/init.d/startServer
```
- Paste the following and insert the location of this repository (like "/hacs-remote-cec-client"):
```
#! /bin/sh
cd RepositoryLocation 
bash start.sh
```
- Save with CTL+O and Enter
- Run:
```
sudo chmod 755 /etc/init.d/startServer
```
