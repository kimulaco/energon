docker container run --init -it --rm \
  --name energon-server \
  --env PORT=4000 \
  --env PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
  --env GCP_PROJECT_NAME=$GCP_PROJECT_NAME \
  --env GCP_BETA_KEY=$GCP_BETA_KEY \
  --env ELECTRIC_BILL_URL=$ELECTRIC_BILL_URL \
  --env ELECTRIC_BILL_USER=$ELECTRIC_BILL_USER \
  --env ELECTRIC_BILL_PASSWORD=$ELECTRIC_BILL_PASSWORD \
  -p 4000:4000 \
  energon-server
