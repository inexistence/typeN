import { RequestMethod } from "../enums/request-methods";

export interface ActionMetadataArgs {
  /**
   * route path
   */
  route: string|RegExp;

  /**
   * method to be called
   */
  method: string;

  /**
   * class used to call method
   */
  target: Function;

  /**
   * request method type
   */
  type: RequestMethod;
}
