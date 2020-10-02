[![License](https://img.shields.io/github/license/JonathanTreffler/Home-Assistant-remote-cec?style=flat-square)](https://github.com/JonathanTreffler/Home-Assistant-remote-cec/blob/master/LICENSE)
![GitHub CodeQL Workflow Status](https://img.shields.io/github/workflow/status/JonathanTreffler/Home-Assistant-remote-cec/CodeQL?label=CodeQL&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/JonathanTreffler/Home-Assistant-remote-cec?style=flat-square)

With this Integration you can control a cec device (like a tv), that is not directly connected to your server with a raspberry, that acts as a cec "proxy"

## Supported Server Devices:
- Raspberry Pi 2 (not tested)
- __Raspberry Pi 3__
- Raspberry Pi 4 (not tested)
- __Raspberry Pi Zero__
- *probably many more*

## Supported Server Operating Systems:
- __Raspberry Pi OS__
- every Debian based Distribution (not tested) 

## Server Installation:
1. Connect via SSH or open a Terminal
2. Run:
```
$ cd /
$ sudo git clone https://github.com/JonathanTreffler/Home-Assistant-remote-cec.git
$ cd Home-Assistant-remote-cec
$ sudo chmod +x ./install.sh
$ sudo ./install.sh
```
3. Connect the Raspberry Pi to your cec compatible device via HDMI
4. Assign a static local IP Adress to your Raspberry (in most cases via the web interface of your router)
5. Run:
```
sudo service HomeAssistantRemoteCEC start
```

The server will get started automatically after a reboot


You can test if the server is started by running:
```
sudo netstat -tulpn | grep 8080
```
You can see the logs by running:
```
sudo systemctl status HomeAssistantRemoteCEC
```

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
  - Make sure the server is running
  - Make sure the server uses the right cecDeviceId (can be changed in the app.js file)(the cecDeviceId is in most cases 0)
  - Try a different HDMI Cable, not all cables or adapters (needed for the Pi Zero) are compatible with CEC
- The server doesn't start because something else is running on port 8080:
  - You can change the port of the web server in the app.js file (remember to also update the home assistant configuration)

## Compatible Devices:
Many brands call CEC differently, but they should all be compatible:

- T-Link (ITT)
- EasyLink (Philips)
- EZ-Sync (JVC)
- Simplink (LG)
- Digital Link HD (Loewe)
- NetCommand for HDMI (Mitsubishi)
- RIHD (Remote Interactivity over HDMI) (Onkyo)
- Viera Link (Panasonic)
- Kuro Link (Pioneer)
- Anynet+ (Samsung)
- Aquos Link (Sharp)
- BRAVIA Sync (Sony)
- Regza-Link (Toshiba)
- TechniLink (Technisat)
- CSTLink (Coolstream)
- FUN-Link (Funai Electric)
- Digi-Link (Grundig)

## How does CEC work ?
The raspberry communicates with a cec compatible device like a TV or DVD Player over HDMI.

All Devices in this CEC "network" can communicate even if they are not directly connected via HDMI (e.g Raspberry sends a signal to the TV via HDMI, wich forwards it to the DVD Player).

For more information just read the [wikipedia article](https://en.wikipedia.org/wiki/Consumer_Electronics_Control) :)
