/**
 * Routing controller initialization options.
 */
export interface RoutingControllersOptions {

    /**
     * Indicates if cors are enabled.
     * This requires installation of additional module (cors for express and kcors for koa).
     */
    cors?: boolean|Object;

    /**
     * Global route prefix, for example '/api'.
     */
    routePrefix?: string;

    /**
     * List of controllers to register in the framework or directories from where to import all your controllers.
     */
    controllers?: Function[]|string[];

    /**
     * Indicates if development mode is enabled.
     * By default its enabled if your NODE_ENV is not equal to "production".
     */
    development?: boolean;
}
