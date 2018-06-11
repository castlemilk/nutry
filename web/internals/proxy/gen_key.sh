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
# openssl genrsa -des3 -passout pass:$password -out privkey.pem 2048 -noout
#
# #Remove passphrase from the key. Comment the line out to keep the passphrase
# openssl rsa -in privkey.pem -passin pass:$password -out privkey.pem

#Create the request
openssl req -x509 -days 365 -nodes -newkey rsa:2048 -keyout privkey.pem -out cert.pem \
    -subj "/C=$country/ST=$state/L=$locality/O=$organization/OU=$organizationalunit/CN=$commonname/emailAddress=$email"

cat /etc/nginx/cert/cert.pem
cat /etc/nginx/cert/privkey.pem

# cat ./$domain.csr > /etc/nginx/cert/cert.pem
# cat ./$domain.key > /etc/nginx/cert/privkey.pem
