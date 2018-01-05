import { ActionMetadata } from "./action-metadata";
import { ControllerMetadataArgs } from "./args/controller-metadata-args";
import { arch } from "os";
import { Container } from "../container";

export class ControllerMetadata {
  public route: string;
  public target: Function;
  public type: "default"|"json"|"xml";

  public actions: ActionMetadata[];

  constructor(args: ControllerMetadataArgs, private container: Container) {
    this.route = args.route;
    this.type = args.type;
    this.target = args.target;
  }

  get instance(): any {
    return this.container.getFromContainer(this.target);
  }
}
