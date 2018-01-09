import { BaseDriver } from "../base-driver";
import { ActionMetadata } from "../../metadata/action-metadata";
import { Action } from "../../action";
import { ParamMetadata } from "../../metadata/param-metadata";
import { ParamType } from "../../metadata/enums/param-type";
import * as _ from "lodash";

export class KoaDriver extends BaseDriver {
  constructor(public koa?: any, public router?: any) {
    super();
    this.loadKoa();
    this.loadRouter();
    this.app = this.koa;
  }

  private loadKoa() {
    if (!this.koa) {
      this.koa = new (require("koa"))();
    }
  }

  private loadRouter() {
    if (!this.router) {
      this.router = new (require("koa-router"))();
    }
  }

  public initialize() {
    const bodyParser = require("koa-bodyparser");
    this.koa.use(bodyParser());
    if (this.cors) {
      const cors = require("kcors");
      if (this.cors === true) {
        this.koa.use(cors());
      } else {
        this.koa.use(cors(this.cors));
      }
    }
  }

  public registerAction(action: ActionMetadata, executor: (action: Action) => void) {
    const route = ActionMetadata.appendBaseRoute(this.routePrefix, action.fullRoute);
    const routeHandler = async (context: any, next: () => Promise<any>) => {
      const _action = { response: context.response, request: context.request, context, next };
      return await executor(_action);
    };
    this.router[action.type.toLowerCase()](...[
      route,
      routeHandler,
    ]);
  }

  public registerRoutes() {
    this.koa.use(this.router.routes());
    this.koa.use(this.router.allowedMethods());
  }

  public getParam(action: Action, paramMetadata: ParamMetadata): any {
    let value: any;
    const key = paramMetadata.name;
    switch (paramMetadata.type) {
      case ParamType.QUERY:
        value = key ? action.context.query[key] : _.toPlainObject(action.context.query);
        break;
      case ParamType.BODY:
        value = key ? action.request.body[key] : _.toPlainObject(action.request.body);
        break;
      case ParamType.PARAM:
        value = key ? action.context.params[key] : _.toPlainObject(action.context.params);
        break;
    }
    return value;
  }
}
