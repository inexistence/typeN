import { MetadataArgsStorage } from "../metadata-args-storage";
import { ParamType } from "../metadata/enums/param-type";

export function Params(name?: string) {
  return (object: Object, methodName: string, index: number) => {
    MetadataArgsStorage.get().params.push({
      type: ParamType.BODY,
      name,
      object,
      method: methodName,
      index,
      required: true,
      parse: true,
    });
  };
}