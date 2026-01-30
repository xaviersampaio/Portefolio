#!/bin/bash
# Journaliser la coupure complète de l'interface

echo "$(date): Interface $IFACE DOWN (post)" >> /var/log/network.log


if [ "$IFACE" = "eth0" ]; then
    echo "$(date): Nettoyage du VPN sur $IFACE" >> /var/log/network.log
    /usr/local/bin/vpn-cleanup
fi