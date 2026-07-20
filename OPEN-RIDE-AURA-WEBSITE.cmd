@echo off
title Ride Aura Self Drive Website
cd /d "%~dp0"
echo Starting Ride Aura Self Drive website server...
echo.
echo IMPORTANT: Keep this black window open while checking the website.
echo.
echo After you see "Ready", open:
echo Website:     http://127.0.0.1:5362/
echo Admin Login: http://127.0.0.1:5362/admin/login
echo.
npm.cmd run dev -- --webpack -p 5362
pause
