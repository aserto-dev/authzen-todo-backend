# AuthZEN Todo Backend

## Setup

### Install dependencies
To install the application dependencies, run the following command:
```
yarn
```

### Set up the `.env` file
Rename the `.env.example` file to `.env` and update the `PDP_URL` variable. The authorization middleware will send AuthZEN requests to `${PDP_URL}/access/v1/evaluations`.

Optionally, set the `PDP_API_KEY` variable if your authorizer needs an API key. You should prefix it with `basic` or `Bearer` as appropriate. If set, the authorization middleware will add the `authorization: ${PDP_API_KEY}` header to every authorization request.

```
JWKS_URI=https://citadel.demo.aserto.com/dex/keys
ISSUER=https://citadel.demo.aserto.com/dex
AUDIENCE=citadel-app

PDP_URL=https://authorizer.domain.com
PDP_API_KEY=basic YOUR_API_KEY
```

## Start the server
```
yarn start
```
