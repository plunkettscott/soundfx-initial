import { Resource } from './Resource'
export enum SoundSource {
  Local = 'path',
  URL = 'url',
  Stream = 'stream',
}

export interface SoundConfiguration {
  name: string
  path: string
  purpose?: string
  source: SoundSource
}

const DefaultConfiguration: Partial<SoundConfiguration> = {
  source: SoundSource.Local,
}

export class Sound {
  private key: string
  private config: SoundConfiguration

  public constructor(key: string, config: SoundConfiguration) {
    this.key = key
    this.config = Object.assign(DefaultConfiguration, config)
  }
}
