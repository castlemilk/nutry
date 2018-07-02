#!/usr/bin/env bash
domain=$1
commonname=$domain

#Change to your company details
country=AU
state=Victoria
locality=Melbourne
organization=Kueb
organizationalunit=IT
email=administrator@benebsworth.com
if [ -z "$domain" ]
then
    echo "Argument not present."
    echo "Useage $0 [common name]"

    exit 99
fi

# #Generate a key
if [ -f /etc/nginx/cert/fullchain.pem ] || [ -f /etc/nginx/cert/privkey.pem ]; then
    exit 0
else
    #Create the request
    openssl req -x509 -days 365 -nodes -newkey rsa:2048 -keyout privkey.pem -out cert.pem \
    -subj "/C=$country/ST=$state/L=$locality/O=$organization/OU=$organizationalunit/CN=$commonname/emailAddress=$email"
    cat ./cert.pem > /etc/nginx/cert/cert.pem
    cat ./privkey.pem > /etc/nginx/cert/privkey.pem
fi



