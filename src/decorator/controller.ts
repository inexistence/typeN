import { MetadataArgsStorage } from "../metadata-args-storage";

export function Controller(route: string = "/") {
  return (target: Function) => {
    MetadataArgsStorage.get().controllers.push({
      target,
      type: "default",
      route,
    });
  };
}
