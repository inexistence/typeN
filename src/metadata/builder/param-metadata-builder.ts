import { ActionMetadata } from "../action-metadata";
import { ParamMetadata } from "../param-metadata";
import { MetadataArgsStorage } from "../../metadata-args-storage";

export class ParamMetadataBuilder {
  public static createParams(action: ActionMetadata): ParamMetadata[] {
    const params = MetadataArgsStorage.get().params.filter(param =>
      param.object.constructor === action.target &&
      param.method === action.method).map(paramArg => {
        return new ParamMetadata(action, paramArg);
      });
    return params;
  }
}
