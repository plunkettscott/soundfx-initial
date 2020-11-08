import { Resource, ResourceConfiguration } from './Resource'
import { Metadata } from '../metadata/index'

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

  public hasResource(Resource: string): boolean {
    return this.resources.indexOf(Resource) > -1
  }

  public resource(resource: string): Resource | null {
    if (this.hasResource(resource)) {
      return this.resourceStore[resource]
    }

    return null
  }

  public registerResource(resource: string, config: Partial<ResourceConfiguration> = {}): void {
    if (this.hasResource(resource)) {
      return
    }

    this.resources[resource] = new Resource({ ...config, resource })
  }
}
