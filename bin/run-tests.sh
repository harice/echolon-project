#!/usr/bin/env bash

source 'envs/.envvars.test'

function run {
  "$@"
  local status=$?
  if [ $status -ne 0 ]; then
    # cleanupDB
    exit 1
  fi
  return $status
}

if [ "$NODE_ENV" == "test" ]; then
  if psql -lqt | cut -d \| -f 1 | grep -w ${ECHOLON_PROJECT_DB_NAME}; then
    echo "${ECHOLON_PROJECT_DB_NAME} database already exists...moving on"
  else
    echo "${ECHOLON_PROJECT_DB_NAME} database does not exist"
    echo "...create TEST user $ECHOLON_PROJECT_DB_USER with password $ECHOLON_PROJECT_DB_PASS"
    psql -c "create user \"$ECHOLON_PROJECT_DB_USER\" with password '$ECHOLON_PROJECT_DB_PASS'"

    echo "...create TEST database $ECHOLON_PROJECT_DB_NAME with owner $ECHOLON_PROJECT_DB_USER encoding='utf8' template template0"
    psql -c "create database \"$ECHOLON_PROJECT_DB_NAME\" with owner \"$ECHOLON_PROJECT_DB_USER\" encoding='utf8' template template0"
  fi
fi

#run npm run gulp lint

run lab \
  --verbose \
  --transform 'test/_helpers/transformer.js' \
  --sourcemaps \
  --ignore __core-js_shared__,core,Reflect,_babelPolyfill,regeneratorRuntime
