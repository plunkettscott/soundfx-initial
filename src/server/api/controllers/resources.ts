import { resourceLimits } from "worker_threads";
import { SoundFXRouterContext } from "..";

export function allResources(context: SoundFXRouterContext) {
    context.body = context.manager.resources
}

export function getResource(context: SoundFXRouterContext) {
    const { resource } = context.params
    const manager = context.manager

    if (! manager.hasResource(resource)) {
        context.status = 404
        context.body = { message: 'Not found.' }

        return
    }

    context.body = resource
}