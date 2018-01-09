import { MetadataArgsStorage } from "../metadata-args-storage";
import { ParamType } from "../metadata/enums/param-type";

export function Ctx() {
  return (object: Object, methodName: string, index: number) => {
    MetadataArgsStorage.get().params.push({
      type: ParamType.CONTEXT,
      object,
      method: methodName,
      index,
      required: true,
      parse: false,
    });
  };
}
