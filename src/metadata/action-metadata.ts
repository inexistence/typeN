import { RequestMethod } from "./enums/request-methods";
import { ControllerMetadata } from "./controller-metadata";
import { ActionMetadataArgs } from "./args/action-metadata-args";
import { ParamMetadata } from "./param-metadata";

export class ActionMetadata {
  public route: string | RegExp;
  public fullRoute: string | RegExp;
  public target: Function;
  public type: RequestMethod;
  public controller: ControllerMetadata;
  public method: string;
  public params: ParamMetadata[];

  constructor(controller: ControllerMetadata, args: ActionMetadataArgs) {
    this.controller = controller;
    this.type = args.type;
    this.target = args.target;
    this.route = args.route;
    this.method = args.method;
    this.fullRoute = this.buildFullRoute();
  }

  private buildFullRoute(): string | RegExp {
    if (this.route instanceof RegExp) {
      if (this.controller.route) {
        return ActionMetadata.appendBaseRoute(this.controller.route, this.route);
      }
      return this.route;
    }

    let path: string = "";
    if (this.controller.route) path += this.controller.route;
    if (this.route && typeof this.route === "string") path += this.route;
    return path;
  }

  public static appendBaseRoute(baseRoute: string, route: RegExp|string = "") {
    const prefix = `${baseRoute.length > 0 && baseRoute.indexOf("/") < 0 ? "/" : ""}${baseRoute}`;
    if (typeof route === "string")
      return `${prefix}${route}`;

    if (!baseRoute || baseRoute === "") return route;

    const fullPath = `^${prefix}${route.toString().substr(1)}?$`;

    return new RegExp(fullPath, route.flags);
  }

  public async callMethod(params: any[] = []) {
    const controllerInstance = this.controller.instance;
    return await controllerInstance[this.method].apply(controllerInstance, params);
  }
}
