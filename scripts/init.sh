#!/usr/bin/bash 

echo "Installing initial schema from alembic"
alembic upgrade head

echo "Installing initial model"
python initial_data.py
