# Node.JS

## Setup

### Install dependencies
To install the application dependencies, run the following command:
```
yarn
```

### Set up the `.env` file
Rename the `.env.example` file to `.env` and update the `ASERTO_AUTHORIZER_CERT_PATH` path to correspond to the path in which Topaz generated your certificates (by default this path will be `~/.config/topaz/certs/grpc-ca.crt`).
`ASERTO_DIRECTORY_REJECT_UNAUTHORIZED=false` will let you connect to a local directory without passing the certificate.

```
JWKS_URI=https://citadel.demo.aserto.com/dex/keys
ISSUER=https://citadel.demo.aserto.com/dex
AUDIENCE=citadel-app

ASERTO_POLICY_ROOT=todoApp

# Topaz
#
# This configuration targets a Topaz instance running locally.
# To target an Aserto hosted authorizer, comment out the lines below and uncomment the section
# at the bottom of this file.
ASERTO_AUTHORIZER_SERVICE_URL=localhost:8282
ASERTO_DIRECTORY_SERVICE_URL=localhost:9292
ASERTO_AUTHORIZER_CERT_PATH=${HOME}/.config/topaz/certs/grpc-ca.crt
ASERTO_DIRECTORY_REJECT_UNAUTHORIZED=false

# Aserto hosted authorizer
#
# To run the server using an Aserto hosted authorizer, the following variables are required:
# ASERTO_AUTHORIZER_SERVICE_URL=authorizer.prod.aserto.com:8443
# ASERTO_DIRECTORY_SERVICE_URL=directory.prod.aserto.com:8443
# ASERTO_TENANT_ID={Your Aserto Tenant ID UUID}
# ASERTO_AUTHORIZER_API_KEY={Your Authorizer API Key}
# ASERTO_DIRECTORY_API_KEY={Your Directory (read-only) API Key}
# ASERTO_POLICY_INSTANCE_NAME=todo
# ASERTO_POLICY_INSTANCE_LABEL=todo

```

## Start the server
```
yarn start
```
