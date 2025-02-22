/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './app/routes/ui/__root'
import { Route as RoutesImport } from './app/routes/ui/routes'
import { Route as AppRouterImport } from './app/routes/ui/appRouter'

// Create/Update Routes

const RoutesRoute = RoutesImport.update({
  id: '/routes',
  path: '/routes',
  getParentRoute: () => rootRoute,
} as any)

const AppRouterRoute = AppRouterImport.update({
  id: '/appRouter',
  path: '/appRouter',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/appRouter': {
      id: '/appRouter'
      path: '/appRouter'
      fullPath: '/appRouter'
      preLoaderRoute: typeof AppRouterImport
      parentRoute: typeof rootRoute
    }
    '/routes': {
      id: '/routes'
      path: '/routes'
      fullPath: '/routes'
      preLoaderRoute: typeof RoutesImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/appRouter': typeof AppRouterRoute
  '/routes': typeof RoutesRoute
}

export interface FileRoutesByTo {
  '/appRouter': typeof AppRouterRoute
  '/routes': typeof RoutesRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/appRouter': typeof AppRouterRoute
  '/routes': typeof RoutesRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/appRouter' | '/routes'
  fileRoutesByTo: FileRoutesByTo
  to: '/appRouter' | '/routes'
  id: '__root__' | '/appRouter' | '/routes'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRouterRoute: typeof AppRouterRoute
  RoutesRoute: typeof RoutesRoute
}

const rootRouteChildren: RootRouteChildren = {
  AppRouterRoute: AppRouterRoute,
  RoutesRoute: RoutesRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/appRouter",
        "/routes"
      ]
    },
    "/appRouter": {
      "filePath": "appRouter.tsx"
    },
    "/routes": {
      "filePath": "routes.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
