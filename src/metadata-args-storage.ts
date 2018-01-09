import { ActionMetadataArgs } from "./metadata/args/action-metadata-args";
import { ControllerMetadataArgs } from "./metadata/args/controller-metadata-args";
import { ParamMetadataArgs } from "./metadata/args/param-metadata-args";

export class MetadataArgsStorage {
  private static sStorage = new MetadataArgsStorage();

  public actions: ActionMetadataArgs[] = [];
  public controllers: ControllerMetadataArgs[] = [];
  public params: ParamMetadataArgs[] = [];

  public static get(): MetadataArgsStorage {
    return MetadataArgsStorage.sStorage;
  }
}
