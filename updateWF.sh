#!/bin/bash
scp -r {dist/,node_modules/,public/,src/,static/,.git/,*.*} newberry@newberry.webfactional.com:webapps/tuck/lauder/
scp -r dist/* newberry@newberry.webfactional.com:webapps/tuck/
