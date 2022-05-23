#!/bin/sh

SESSION_SECRET=$(head -c50 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | head -c50)
echo "SESSION_SECRET=$SESSION_SECRET" >> .env

echo "" > .env.tmp

while read line; do
  echo "$line" >> .env.tmp
done < .env
