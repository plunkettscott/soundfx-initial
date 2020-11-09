import { Metadata } from '../metadata'
import * as mm from 'music-metadata'
import { Resource } from './Resource'
import { join } from 'path'
import { Readable } from 'stream'
import { createReadStream } from 'fs'

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
  private resource: Resource
  private config: SoundConfiguration

  public constructor(key: string, resource: Resource, config: SoundConfiguration) {
    this.key = key
    this.resource = resource
    this.config = Object.assign(DefaultConfiguration, config)
  }

  public get path(): string {
    return join(this.resource.path, 'sounds', this.config.path)
  }

  public async audioMetadata(): Promise<mm.IAudioMetadata> {
    return await mm.parseFile(this.path)
  }

  public createReadStream(): Readable {
    return createReadStream(this.path)
  }

  public generateData(merge: Partial<PlaySoundData> = {}): PlaySoundData {
    return {
      mode: merge.mode === null ? 'Spatial' : merge.mode,
      resource: this.resource.name,
      sound: this.key,
      volume: merge.volume === null ? 0.1 : merge.volume,
    }
  }

  public playFrontend(source: number) {
    setImmediate(() => {
      emitNet('SoundFX::Internal:StartSound', source, this.generateData({ mode: 'Frontend' }), {})
    })
  }
}
