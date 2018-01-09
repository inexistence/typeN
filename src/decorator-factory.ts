import { CustomParameterDecorator } from "./custom-parameter-decorator";
import { MetadataArgsStorage } from "./metadata-args-storage";
import { ParamType } from "./metadata/enums/param-type";

export class DecoratorFactory {
  public static createParamDecorator(options: CustomParameterDecorator) {
    return (object: Object, method: string, index: number) => {
      MetadataArgsStorage.get().params.push({
          type: ParamType.CUSTOM,
          object,
          method,
          index,
          parse: false,
          required: options ? options.required : false,
          transform: options.value,
      });
    };
  }
}
