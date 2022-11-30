#!/bin/bash

if [[ -d '../server/ioctl/.venv' ]]; then
  source ../server/ioctl/.venv/bin/activate
else
  virtualenv ../server/ioctl/.venv
  source ../server/ioctl/.venv/bin/activate
  cd ../server/ioctl/
  poetry update
fi
