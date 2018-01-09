import { ControllerMetadata } from "../controller-metadata";
import { MetadataArgsStorage } from "../../metadata-args-storage";
import { Container } from "../../container";
import { ActionMetadataBuilder } from "./action-metadata-builder";

export class ControllerMetadataBuilder {
  public static createControllers(classes: Function[] = [], container: Container): ControllerMetadata[] {
    const controllers: ControllerMetadata[] = MetadataArgsStorage.get().controllers
      .filter(ctrl => {
        return classes.findIndex(claz => claz === ctrl.target) >= 0;
      })
      .map(args => {
        const controllerMetadata = new ControllerMetadata(args, container);
        controllerMetadata.actions = ActionMetadataBuilder.createActions(controllerMetadata);
        return controllerMetadata;
      });
    return controllers;
  }
}
