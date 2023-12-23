#!/bin/bash
set -e

INJECT_ENV="cat"
DEFAULT_ENV_FILE=""
CONFIG_FILE=.curlmanrc
[ -f $CONFIG_FILE ] && source $CONFIG_FILE

ENV_FILE=$DEFAULT_ENV_FILE

usage() { echo "Usage: $0 [-e <environment>] <file>"; exit 0; }

while getopts "he:" option; do
    case $option in
        e)
            ENV_FILE=${OPTARG}
            ;;
        h | *)
            usage
            ;;
    esac
done

shift $((OPTIND-1))
[ -z $1 ] && usage

env $(node .utils/format-json.js .session.json | cat - $ENV_FILE | eval $INJECT_ENV) node .utils/format-config.js $1 \
    | curl -K - \
    | node .utils/run-response-handler.js $1
