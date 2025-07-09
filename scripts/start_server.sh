#!/bin/bash
cd /var/www/admin-portal-next
npm install
npm run build
pm2 start "npm start" --name "rica___admin"
