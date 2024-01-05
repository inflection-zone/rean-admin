#!/bin/bash

#prod
aws s3 cp s3://$S3_CONFIG_BUCKET/$S3_CONFIG_PATH/rean-admin-portal/.env ./.env
aws s3 cp s3://$S3_CONFIG_BUCKET/$S3_CONFIG_PATH/rean-admin-portal/constants.ts /app/src/lib

#aha-prod
aws s3 cp s3://$S3_CONFIG_BUCKET/$S3_CONFIG_PATH/rean-admin-portal/.env ./.env
aws s3 cp s3://$S3_CONFIG_BUCKET/$S3_CONFIG_PATH/rean-admin-portal/constants.ts /app/src/lib

cd /app
# Add any other scripts here...
# Start the service
# npm run start
node index.js