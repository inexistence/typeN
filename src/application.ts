import { Container, UserContainerOptions } from "./container";
import { BaseDriver } from "./driver/base-driver";
import { RoutingControllersOptions } from "./routing-controller-options";
import { loadClassesFromDir } from "./utils";
import { RoutingController } from "./routing-controllers";

export class Application {
  private container: Container = new Container();

  constructor() {}

  public createServer<T extends BaseDriver>(driver: T, options?: RoutingControllersOptions): any {
    this.createExecutor(driver, options);
    return driver.app;
  }

  public createExecutor<T extends BaseDriver>(driver: T, options: RoutingControllersOptions = {}): void {
    driver.cors = options.cors;
    driver.developmentMode = !!options.development;

    let controllerClasses: Function[] = [];
    if (options.controllers && options.controllers.length > 0) {
      controllerClasses = (options.controllers as any[]).filter((controller => controller instanceof Function));
      const controllerDirs = (options.controllers as any[]).filter((controller => typeof controller === "string"));
      controllerClasses = loadClassesFromDir(controllerDirs).concat(controllerClasses);
    }
    new RoutingController(driver, this.container, options)
    .initialize()
    .registerControllers(controllerClasses);
  }
}
