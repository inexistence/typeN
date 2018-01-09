import { MetadataArgsStorage } from "../../metadata-args-storage";
import { ActionMetadata } from "../action-metadata";
import { ControllerMetadata } from "../controller-metadata";
import { ParamMetadataBuilder } from "./param-metadata-builder";

export class ActionMetadataBuilder {
  public static createActions(controller: ControllerMetadata): ActionMetadata[] {
    const actionArgs = MetadataArgsStorage.get().actions.filter(action => {
      return controller.target === action.target;
    });
    const actions: ActionMetadata[] = actionArgs.map(args => {
      const action = new ActionMetadata(controller, args);
      action.params = ParamMetadataBuilder.createParams(action);
      return action;
    });
    return actions;
  }
}
