import { MetadataArgsStorage } from "../metadata-args-storage";
import { RequestMethod } from "../metadata/enums/request-methods";

export function Post(route: string|RegExp): Function {
  return (object: Object, key: string, descriptor: PropertyDescriptor) => {
    MetadataArgsStorage.get().actions.push({
      type: RequestMethod.POST,
      target: object.constructor,
      route,
      method: key,
    });
  };
}
