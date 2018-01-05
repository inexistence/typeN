export interface UserContainerOptions {
  /**
   * 若为 true，用户设置的container获取不到数据时，会从默认container中获取
   */
  fallback?: boolean;

  /**
   * 若为 true，用户设置的container获取数据出错时，会从默认container中获取
   */
  fallbackOnErrors?: boolean;
}

interface Class<T> {
  new (...args: any[]): T;
}

interface IContainer {
  get<T>(someClass: Class<T>|Function): T;
}

class DefaultContainer {
  private instances: { type: Function, object: any }[] = [];

  public get<T>(someClass: Class<T>): T {
    let instance = this.instances.find(inst => inst.type === someClass);
    if (!instance) {
      instance = { type: someClass, object: new someClass() };
      this.instances.push(instance);
    }
    return instance.object;
  }
}

export class Container {
  private defaultContainer: IContainer = new DefaultContainer();
  private userContainer?: IContainer;
  private userContainerOptions?: UserContainerOptions;

  public useContainer(iocContainer: IContainer, options?: UserContainerOptions) {
    this.userContainer = iocContainer;
    this.userContainerOptions = options;
  }

  public getFromContainer<T>(someClass: Class<T>|Function): T {
    if (this.userContainer) {
      try {
        const instance = this.userContainer.get(someClass);

        if (instance) {
          return instance;
        }

        if (!this.userContainerOptions || !this.userContainerOptions.fallback) {
          return instance;
        }
      } catch (error) {
        if (!this.userContainerOptions || !this.userContainerOptions.fallbackOnErrors) {
          throw error;
        }
      }
    }
    return this.defaultContainer.get(someClass);
  }
}
