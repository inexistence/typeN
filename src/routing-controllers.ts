import { BaseDriver } from "./driver/base-driver";
import { RoutingControllersOptions } from "./routing-controller-options";
import { ControllerMetadataArgs } from "./metadata/args/controller-metadata-args";
import { MetadataArgsStorage } from "./metadata-args-storage";
import { ActionMetadataArgs } from "./metadata/args/action-metadata-args";
import { ControllerMetadata } from "./metadata/controller-metadata";
import { ActionMetadata } from "./metadata/action-metadata";
import { Container } from "./container";
import { ControllerMetadataBuilder } from "./metadata/builder/controller-metadata-builder";
import { Action } from "./action";
import { ParamMetadata } from "./metadata/param-metadata";
import { ParamType } from "./metadata/enums/param-type";
import { ActionParamsFactory } from "./action-params-factory";

export class RoutingController<T extends BaseDriver> {
  private actionParamsFactory: ActionParamsFactory<T>;

  constructor(private readonly driver: T, private container: Container, private options: RoutingControllersOptions) {
    this.actionParamsFactory = new ActionParamsFactory(driver);
  }

  public initialize(): this {
    this.driver.initialize();
    return this;
  }

  public registerControllers(classes: Function[] = []): this {
    const controllers: ControllerMetadata[] = ControllerMetadataBuilder.createControllers(classes, this.container);

    controllers.forEach(controller => {
      controller.actions.forEach(actionMetadata => {
        this.driver.registerAction(actionMetadata, async (action) => {
          return await this.executeAction(action, actionMetadata);
        });
      });
    });

    this.driver.registerRoutes();
    return this;
  }

  protected async executeAction(action: Action, actionMetadata: ActionMetadata): Promise<void> {
    const paramMetadatas: ParamMetadata[] = actionMetadata.params.sort((param1, param2) => param1.index - param2.index);
    const paramValues: any[] = await Promise.all(paramMetadatas.map(async paramMetadata => {
      return await this.actionParamsFactory.handleParams(action, paramMetadata);
    }));
    try {
      const result = await actionMetadata.callMethod(paramValues);
      return await this.driver.handleSuccess(result, action, actionMetadata);
    } catch (error) {
      return await this.driver.handleError(error, action, actionMetadata);
    }
  }
}
