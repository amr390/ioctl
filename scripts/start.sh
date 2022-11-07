#!/bin/zsh

ioctl && cd server/ioctl && uvicorn app.ioctl.main:app --reload
