import { MetadataArgsStorage } from "../metadata-args-storage";
import { ParamType } from "../metadata/enums/param-type";
import { ParamOptions } from "../decorator-options/param-options";

export function Query(name?: string, options?: ParamOptions) {
  return (object: Object, methodName: string, index: number) => {
    MetadataArgsStorage.get().params.push({
      type: ParamType.QUERY,
      name,
      object,
      method: methodName,
      index,
      required: options.required,
    });
  };
}