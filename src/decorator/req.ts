import { MetadataArgsStorage } from "../metadata-args-storage";
import { ParamType } from "../metadata/enums/param-type";

export function Req() {
  return (object: Object, methodName: string, index: number) => {
    MetadataArgsStorage.get().params.push({
      type: ParamType.REQ,
      object,
      method: methodName,
      index,
      required: true,
      parse: false,
    });
  };
}
