env $(node .utils/format-json.js .session.json | cat - $1) node .utils/format-config.js $2 \
    | curl -av -K - \
    | node .utils/run-response-handler.js $2
