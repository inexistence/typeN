import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { BaseDriver } from "./driver/base-driver";
import { Action } from "./action";
import { ParamMetadata } from "./metadata/param-metadata";

export class ActionParamsFactory<T extends BaseDriver> {
  constructor(private readonly driver: T) {}

  public async handleParams(action: Action, param: ParamMetadata): Promise<any> {
    let value = this.driver.getParam(action, param);
    value = this.normalizeParamValue(value, param);
    value = await this.handleValue(value, param, action);
    return value;
  }

  protected normalizeParamValue(value: any, paramMetadata: ParamMetadata) {
    if (value === null || value === undefined)
      return value;
    switch (paramMetadata.targetName) {
      case "number":
        if (value === "") return undefined;
        return +value;

      case "string":
        return value;

      case "boolean":
        if (value === "true" || value === "1") {
          return true;
        } else if (value === "false" || value === "0") {
          return false;
        }
        return !!value;

      case "date":
        const parsedDate = new Date(value);
        if (isNaN(parsedDate.getTime())) {
          throw new Error(`${paramMetadata.name} is invalid! It can't be parsed to date.`);
        }
        return parsedDate;

      default:
        if (value && paramMetadata.isTargetObject && paramMetadata.parse) {
          if (typeof value === "string") {
            try {
              value = JSON.parse(value);
            } catch (error) { console.error(error); }
          }
          if (this.driver.useClassTransformer &&
            paramMetadata.targetType &&
            paramMetadata.targetType !== Object &&
            !(value instanceof paramMetadata.targetType)) {
              value = plainToClass(paramMetadata.targetType, value);
            }
        }
        return value;
    }
  }

  protected async handleValue(value: any, param: ParamMetadata, action: Action): Promise<any> {
    if (param.transform) {
      value = await param.transform(action, value);
    }

    if (param.required) {
      const isValueEmpty = value === null || value === undefined || value === "";

      if (isValueEmpty) {
        throw new Error(`${param.name} is required`);
      }
    }
    return value;
  }
}
