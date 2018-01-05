import { BaseDriver } from "../base-driver";
import { ActionMetadata } from "../../metadata/action-metadata";

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

  public registerAction(action: ActionMetadata) {
    const route = ActionMetadata.appendBaseRoute(this.routePrefix, action.fullRoute);
    const routeHandler = async (context: any, next: () => Promise<any>) => {
      const result = await action.controller.instance[action.method](context, next);
      context.response.body = result;
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
}
