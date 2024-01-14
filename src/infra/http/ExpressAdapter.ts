import express, { Application, NextFunction, Request, Response } from "express";
import { Http, Method } from "./Http";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";
import SwaggerCSS from "../../swaggerCss";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(400).send({ error: "" + err })
}

export default class ExpressAdapter implements Http {
  app: Application

  constructor() {
    this.app = express()
    this.app.use(function (request: Request, response: Response, next: NextFunction) {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
      response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
      response.header("Cache-Control", "no-Store, no-cache, must-revalidate, proxy-revalidate")
      response.header("Pragma", "no-cache")
      response.header("Expires", "0")
      response.header("Surrogate-Control", "no-store")
      next();
    });
    this.app.use(express.json());
    this.app.use(errorHandler);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(
      swaggerDocument, //JsonObject
      undefined,  // SwaggerUiOptions
      undefined,  // SwaggerOptions
      SwaggerCSS,
      undefined,  // customfavIcon
      undefined,  // swaggerUrl
      undefined,  // customeSiteTitle
    ));
  }

  build(method: Method, url: string, callback: Function): void {
    this.app[method](url, async function (request?: Request, response?: Response) {
      const output = await callback(request?.params, request?.body)
      response?.status(output.statusCode).json(output.body)
    });
  }

  listen(port: number): void {
    try {
      this.app.listen(port);
      console.log('⭐️connected from http://localhost:3000')
      console.log('⭐️documentation and test from http://localhost:3000/api-docs')
    } catch (e) {
      throw new Error('Not connected')
    }
  }
}   
