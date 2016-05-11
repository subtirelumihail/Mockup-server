#!/bin/bash
cd /home/dazzzz2007/server
pm2 delete App
pm2 start server.sh --name App
