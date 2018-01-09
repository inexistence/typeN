import { ParamType } from "../enums/param-type";
import { Action } from "../../action";

export interface ParamMetadataArgs {
    /**
     * Parameter object.
     */
    object: any;

    /**
     * Method on which's parameter is attached.
     */
    method: string;

    /**
     * Index (# number) of the parameter in the method signature.
     */
    index: number;

    /**
     * Parameter type.
     */
    type: ParamType;

    /**
     * Parameter name.
     */
    name?: string;

    /**
     * Indicates if this parameter is required or not
     */
    required?: boolean;

    parse: boolean;

    transform?: (action: Action, value?: any) => Promise<any> | any;
}
