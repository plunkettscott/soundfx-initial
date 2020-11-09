import { setHttpCallback } from '@citizenfx/http-wrapper'
import Koa, { Context, Next } from 'koa'
import Router, { RouterContext } from '@koa/router'

import { Manager } from '../manager'
import { Metadata } from '../metadata'
import * as resourcesController from './controllers/resources'
import * as soundsController from './controllers/sounds'

export interface SoundFXRouterContext extends RouterContext {
  manager: Manager
  metadata: Metadata
  resourceName: string
}

export function registerWithHttpServer(manager: Manager) {
  const api = new Koa()
  const router = new Router()
  const resourceName = GetCurrentResourceName()

  api.use(async (context: Context, next: Next) => {
    context.manager = manager
    context.metadata = Metadata
    context.resourceName = resourceName

    await next()
  })

  /** Configure the Routes */
  router.get('/:resource', soundsController.allSoundsForResource)
  router.get('/:resource/:sound', soundsController.getSound)
  router.get('/:resource/:sound/file', soundsController.getSoundFile)

  api.use(router.routes())
  api.use(router.allowedMethods())

  setHttpCallback(api.callback())
}