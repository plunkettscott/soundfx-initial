import { Sound, SoundConfiguration } from './Sound'
import { Metadata } from '../metadata/index'

export interface Sounds {
  [key: string]: Sound
}

export interface ResourceConfiguration {
  resource: string
}

export class Resource {
  private soundStore: Sounds
  private config: ResourceConfiguration
  private metadata: Metadata

  public constructor(config: ResourceConfiguration) {
    this.config = config
    this.metadata = new Metadata()
    this.soundStore = {}

    this.registerSounds()
  }

  public get name(): string {
    return this.config.resource
  }

  public get sounds(): Sound[] {
    return Object.values(this.soundStore)
  }

  public get soundKeys(): string[] {
    return Object.keys(this.soundStore)
  }

  public get path(): string {
    return GetResourcePath(this.config.resource)
  }

  public hasSound(key: string): boolean {
    return Object.keys(this.soundStore).indexOf(key) > -1
  }

  public sound(key: string): Sound | null {
    if (this.hasSound(key)) {
      return this.soundStore[key]
    }

    return null
  }

  public registerSounds(): void {
    const sounds = this.metadata.getAllByKey<SoundConfiguration>(this.config.resource, 'sound')

    sounds.forEach((sound) => {
      this.soundStore[sound.value] = new Sound(sound.value, this, sound.extra)

      setImmediate(() => {
        console.log(`[SoundFX] Registering ${sound.value} sound.`)
      })
    })
  }
}
