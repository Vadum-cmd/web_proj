echo "Starting server 1"
cd /d C:\Users\vadum\Downloads\schoolwork\js_final
start cmd /k npm run start-server1
pause

echo "Starting server 1"
start cmd /k npm run start-server2

echo "Reload nginx"
cd /d C:\nginx
start "Starting nginx" nginx -s reload
pause
