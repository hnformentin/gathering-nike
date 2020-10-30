#!/bin/bash

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment
echo "window._env_ = {" >>./env-config.js

# For all the environment variables we want to have at
# runtime (one to one with Radixconfig)

value=$(printf '%s\n' "${CLIENT_ID}")
echo "  CLIENT_ID: \"$value\"," >>./env-config.js

value=$(printf '%s\n' "${JSV_ADMIN_API_URL}")
echo "  JSV_ADMIN_API_URL: \"$value\"," >>./env-config.js



echo "}" >>./env-config.js
