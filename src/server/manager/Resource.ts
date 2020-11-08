import { Sound, SoundConfiguration } from './Sound'
import { Metadata } from '../metadata/index'

export interface Sounds {
  [key: string]: Sound
}

export interface ResourceConfiguration {
  resource: string
}

export class Resource {
  private sounds: Sounds
  private config: ResourceConfiguration
  private metadata: Metadata

  public constructor(config: ResourceConfiguration) {
    this.config = config
    this.metadata = new Metadata()

    this.registerSounds()
  }

  public get path(): string {
    return GetResourcePath(this.config.resource)
  }

  public registerSounds(): void {
    const sounds = this.metadata.getAllByKey<SoundConfiguration>(this.config.resource, 'sound')

    sounds.forEach(s => {
      console.log(s.value)
      console.log(s.extra)
    })
  }
}
