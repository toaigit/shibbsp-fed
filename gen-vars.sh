#!/bin/bash
. ./vars.env

export CURRDIR=$PWD

cd files/shibb
# not to gen the sp key if it is already exist.
if [ ! -f sp-cert.pem ] ; then
   ./keygen.sh
fi

./genmeta.sh

cd $CURRDIR
cat startup.templ | gomplate > startup
cat build.templ | gomplate > build.sh
chmod 755 build.sh startup

cat docker-compose.templ | gomplate > docker-compose.yml

cd files/shibb

cat shibboleth2.templ | gomplate > shibboleth2.xml

cat sp-metadata.templ | gomplate > sp-metadata.xml

cd $CURRDIR/files/apache
cat 000-default.templ | gomplate > 000-default.conf

cat default-ssl.templ | gomplate > default-ssl.conf

mkdir -p $DATADIR $DATADIR/log $DATADIR/html $DATADIR/cgi-bin $DATADIR/certs
