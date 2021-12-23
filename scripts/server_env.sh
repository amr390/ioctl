#!/bin/bash

if [[ -f '../server/env' ]]; then
  source ../server/env/bin/activate
else
  virtualenv ../server/env
  source ../server/env/bin/activate
  cd ../server/ioctl/
  poetry update
fi
