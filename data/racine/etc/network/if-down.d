#!/bin/bash

if [ "$IFACE" = "eth0" ]; then
    echo "$(date): Arrêt du VPN sur $IFACE" >> /var/log/network.log
    /usr/local/bin/vpn-stop
fi
