import { Resource, ResourceConfiguration } from './Resource'
import { Metadata } from '../metadata/index'
import { Sound } from './Sound'

export interface Resources {
  [key: string]: Resource
}

export class Manager {
  private resourceStore: Resources
  private metadata: Metadata

  public constructor() {
    this.resourceStore = {}
    this.metadata = new Metadata()
  }

  public get resources(): string[] {
    return Object.keys(this.resourceStore)
  }

  public hasResource(resource: string): boolean {
    return this.resources.indexOf(resource) > -1
  }

  public resource(resource: string): Resource | null {
    if (this.hasResource(resource)) {
      return this.resourceStore[resource]
    }

    return null
  }

  public soundFromResource(resource: string, sound: string): Sound | null {
    if (this.hasResource(resource)) {
      if (this.resource(resource).hasSound(sound)) {
        return this.resource(resource).sound(sound)
      }
    }

    return null
  }

  public regiserKnownResources(): void {
    this.metadata
      .getResourceNames()
      .forEach((r) => {
        setImmediate(() => {
          this.registerResource(r)
        })
      })
  }

  public registerResource(resource: string, config: Partial<ResourceConfiguration> = {}): void {
    console.log(`[SoundFX] Found the '${resource}' resource.`)
    this.resourceStore[resource] = new Resource({ ...config, resource })
  }
}
