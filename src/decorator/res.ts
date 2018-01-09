import { MetadataArgsStorage } from "../metadata-args-storage";
import { ParamType } from "../metadata/enums/param-type";

export function Res() {
  return (object: Object, methodName: string, index: number) => {
    MetadataArgsStorage.get().params.push({
      type: ParamType.RES,
      object,
      method: methodName,
      index,
      required: true,
      parse: false,
    });
  };
}
