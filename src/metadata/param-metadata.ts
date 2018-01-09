import "reflect-metadata";
import { ActionMetadata } from "./action-metadata";
import { ParamType } from "./enums/param-type";
import { ParamMetadataArgs } from "./args/param-metadata-args";

export class ParamMetadata {
  /**
   * Parameter's action
   */
  public actionMetadata: ActionMetadata;

  /**
   * Object on which's method's parameter this parameter is attached.
   */
  public object: any;

  /**
   * Method on which's parameter is attached.
   */
  public method: string;

  /**
   * Parameter type.
   */
  public type: ParamType;

  /**
   * Index (# number) of the parameter in the method signature.
   */
  public index: number;

  /**
   * Parameter name.
   */
  public name?: string;

  public targetType: any;

  public targetName: string;

  public isTargetObject: boolean;

  /**
   * Indicates if this parameter is required or not
   */
  public required?: boolean;

  constructor(actionMetadata: ActionMetadata, arg: ParamMetadataArgs) {
    this.actionMetadata = actionMetadata;
    this.method = arg.method;
    this.type = arg.type;
    this.object = arg.object;
    this.index = arg.index;
    this.name = arg.name;
    this.required = arg.required;
    // get param's type, number string or any other type.
    const ParamTypes = (Reflect as any).getMetadata("design:paramtypes", arg.object, arg.method);
    if (typeof ParamTypes !== "undefined") {
        this.targetType = ParamTypes[arg.index];
    }
    if (this.targetType) {
      if (this.targetType instanceof Function && this.targetType.name) {
        this.targetName = this.targetType.name.toLowerCase();
      } else if (typeof this.targetType === "string") {
        this.targetName = this.targetType.toLowerCase();
      }
      this.isTargetObject = this.targetType instanceof Function || this.targetType.toLowerCase() === "object";
    }
  }
}
