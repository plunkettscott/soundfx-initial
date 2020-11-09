import { IAudioMetadata } from 'music-metadata'
import { extname } from 'path'
import { SoundFXRouterContext } from "../";

export async function allSoundsForResource(context: SoundFXRouterContext) {
    const { resource } = context.params
    const { manager } = context

    if (! manager.hasResource(resource)) {
        context.status = 404
        context.body = { message: 'The resource does not exist' }

        return 
    }

    const resourceSounds = {}
    manager.resource(resource).soundKeys.forEach((sound) => {
        resourceSounds[sound] = {
            sound: `${context.protocol}://${context.host}/${context.resourceName}${context.url}/${sound}`,
            sound_file: `${context.protocol}://${context.host}/${context.resourceName}${context.url}/${sound}/file`
        }
    })

    context.body = resourceSounds
}

export async function getSound(context: SoundFXRouterContext) {
    const { resource, sound } = context.params
    const { manager } = context

    if (!manager.hasResource(resource)) {
        context.status = 404
        context.body = { message: 'The resource does not exist' }

        return
    }

    const Sound = manager.soundFromResource(resource, sound)

    if (Sound === null) {
        context.status = 404
        context.body = { message: 'The sound was not registered in that resource' }

        return
    }

    let audioMetadata: IAudioMetadata

    try {
        audioMetadata = await Sound.audioMetadata()
    } catch (e) {
        context.status = 500
        context.body = {
            message: "Could not read audio metadata. The audio file is probably corrupted."
        }

        return
    }

    context.body = {
        resource,
        sound,
        metadata: {},
        audioMetadata: {
            common: audioMetadata.common,
            format: audioMetadata.format,
            native: audioMetadata.native,
            quality: audioMetadata.quality,
        }
    }
}

export async function getSoundFile(context: SoundFXRouterContext) {
    const { resource, sound } = context.params
    const { manager } = context

    if (!manager.hasResource(resource)) {
        context.status = 404
        context.body = { message: 'The resource does not exist' }

        return
    }

    const Sound = manager.soundFromResource(resource, sound)

    if (Sound === null) {
        context.status = 404
        context.body = { message: 'The sound was not registered in that resource' }

        return
    }

    context.attachment(`${resource}_${sound}${extname(Sound.path)}`)
    context.body = Sound.createReadStream()
}