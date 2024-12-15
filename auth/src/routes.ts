/**
 * An array of routes that are publicy accessible,
 * these routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = ["/", "/auth/verify"];

/**
 * An array of routes that are used to authenticate,
 * this routes will authenticate users based on credentials
 * @type {string[]}
 */

export const authRoutes: string[] = [
  "/auth/login",
  "/auth/signup",
  "/auth/error",
  "/auth/reset",
  "/auth/reset-password",
];

/**
 * api auth route for next-auth,
 * this route will authenticate users using next-auth google & github provider
 * @type {string}
 */

export const apiAuthPrefix: string = "/api/auth";

/**
 * api users route for server side load,
 * this route will authenticate users using next-auth credential provider
 * @type {string}
 */

export const apiUsersPrefix: string = "/api/users";

/**
 * default log in redirect route
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/private";
