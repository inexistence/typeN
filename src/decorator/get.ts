import { MetadataArgsStorage } from "../metadata-args-storage";
import { RequestMethod } from "../metadata/enums/request-methods";

export function Get(route: string|RegExp): Function {
  return (object: Object, key: string, descriptor: PropertyDescriptor) => {
    MetadataArgsStorage.get().actions.push({
      type: RequestMethod.GET,
      target: object.constructor,
      route,
      method: key,
    });
  };
}
