import express = require("express");
import axios from "axios";
import {
  expressjwt as jwt,
  GetVerificationKey,
  Request as JWTRequest,
} from "express-jwt";
import jwksRsa = require("jwks-rsa");
import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

dotenvExpand.expand(dotenv.config());

const { AUTHZEN_PDP_URL = 'http://localhost:3002', AUTHZEN_PDP_API_KEY } = process.env;
const authorizerUrl = `${AUTHZEN_PDP_URL}/access/v1/evaluations`

export const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI,
  }) as GetVerificationKey,

  // Validate the audience and the issuer
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: ["RS256"],
});

// Resource mapper
const resourceMapper = async (req: express.Request, store) => {
  if (!req.params?.id) {
    return {};
  }

  const todo = await store.get(req.params.id);
  return { ownerID: todo.OwnerID };
};

// Authorizer middleware
export const authzMiddleware = (store) => {
  return (permission: string) => {
    return async (
      req: JWTRequest,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const headers: Record<string, string> = {
        'content-type': 'application/json',
      };
      if (AUTHZEN_PDP_API_KEY) {
        headers.authorization = AUTHZEN_PDP_API_KEY;
      }
      const data = {
        subject: {
          identity: req.auth?.sub,
        },
        action: {
          name: permission,
        },
        resource: await resourceMapper(req, store),
      };
      const response = await axios.post(authorizerUrl, data, { headers });
      if (response?.data?.decision) {
        next();
      } else {
        res.status(403).send();
      }
    };
  };
};
