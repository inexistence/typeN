import { ActionMetadata } from "../metadata/action-metadata";

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

  public abstract initialize(): void;

  public abstract registerAction(action: ActionMetadata): void;

  public abstract registerRoutes(): void;
}
