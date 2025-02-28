#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR;
pwd;
git pull origin master
npm run build
cp .htaccess.example dist/.htaccess

