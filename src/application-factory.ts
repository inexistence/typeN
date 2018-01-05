import { Application } from "./application";
import { KoaDriver } from "./driver/koa/koa-driver";
import { RoutingControllersOptions } from "./routing-controller-options";

export class ApplicationFactory {
  public static useKoaServer<T>(koa: T, options?: RoutingControllersOptions): T {
    const driver = new KoaDriver(koa);
    return new Application().createServer(driver, options);
  }

  public static createKoaServer(options?: RoutingControllersOptions): any {
    const driver = new KoaDriver();
    return new Application().createServer(driver, options);
  }
}
