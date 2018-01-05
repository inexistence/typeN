import { BaseDriver } from "./driver/base-driver";
import { RoutingControllersOptions } from "./routing-controller-options";
import { ControllerMetadataArgs } from "./metadata/args/controller-metadata-args";
import { MetadataArgsStorage } from "./metadata-args-storage";
import { ActionMetadataArgs } from "./metadata/args/action-metadata-args";
import { ControllerMetadata } from "./metadata/controller-metadata";
import { ActionMetadata } from "./metadata/action-metadata";
import { Container } from "./container";

export class RoutingController<T extends BaseDriver> {
  constructor(private readonly driver: T, private container: Container, private options: RoutingControllersOptions) {
  }

  public initialize(): this {
    this.driver.initialize();
    return this;
  }

  public registerControllers(classes: Function[] = []): this {
    const controllers: ControllerMetadata[] = MetadataArgsStorage.get().controllers.filter(ctrl => {
      return classes.filter(claz => claz === ctrl.target);
    }).map(args => {
      return new ControllerMetadata(args, this.container);
    });
    controllers.forEach(controller => {
      const actionArgs = MetadataArgsStorage.get().actions.filter(action => {
        return controller.target === action.target;
      });
      const actions = actionArgs.map(args => new ActionMetadata(controller, args));
      controller.actions = actions;
    });

    controllers.forEach(controller => {
      controller.actions.forEach(action => {
        this.driver.registerAction(action);
      });
    });

    this.driver.registerRoutes();
    return this;
  }
}
