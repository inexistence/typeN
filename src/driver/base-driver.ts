import { ActionMetadata } from "../metadata/action-metadata";
import { Action } from "../action";
import { ParamMetadata } from "../metadata/param-metadata";

export abstract class BaseDriver {
  /**
   * Reference to koa or express app object.
   */
  public app: any;

  /**
   * Global application prefix
   */
  public routePrefix: string = "";

  public developmentMode: boolean = true;

  /**
   * additional module (cors for express and kcors for koa)
   */
  public cors?: boolean | Object;

  public useClassTransformer: boolean = true;

  public abstract initialize(): void;

  public abstract registerAction(action: ActionMetadata, executor: (action: Action) => void): void;

  public abstract registerRoutes(): void;

  public abstract getParam(action: Action, param: ParamMetadata): any;

  public abstract handleSuccess(value: any, action: Action, actionMetadata: ActionMetadata): Promise<any>| any;

  public abstract handleError(error: any, action: Action, actionMetadata?: ActionMetadata): Promise<any>|any;
}
