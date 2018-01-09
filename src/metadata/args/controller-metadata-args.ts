export interface ControllerMetadataArgs {
  /**
   * binded class
   */
  target: Function;

  /**
   * base route for controller
   */
  route: string;

  /**
   * body parser type
   */
  type: "default"|"json"|"xml";
}
