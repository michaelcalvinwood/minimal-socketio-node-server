#!/bin/bash
rsync -a --exclude="node_modules" . root@echo.instantchatbot.net:/home/echo/
