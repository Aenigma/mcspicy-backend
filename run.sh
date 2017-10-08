#!/bin/sh
set -euo pipefail
ENV_FILE="$(dirname $0)/env"

if [ ! -f "$ENV_FILE" ]; then
	echo -n "You need to create $ENV_FILE with CLOUDANT_USER_NAME and "
	echo "CLOUDANT_PASSWORD before running!"
	echo "Here's a template to get you started: "
	echo
  echo "#!/bin/sh"
	echo "export AWS_S3_BUCKET='YOUR_S3_BUCKET_HERE'"
  echo "export AWS_ACCESS_KEY_ID='YOUR_KEY_ID_HERE'"
  echo "export AWS_SECRET_ACCESS_KEY='YOUR_ACCESS_KEY_HERE'"
  echo "export AWS_REGION='us-west-2'"
	exit 1
fi

. $ENV_FILE

node app.js
