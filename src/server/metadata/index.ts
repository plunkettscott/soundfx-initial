export interface MetadataValue<E> {
  value: string
  extra: E
}

export class Metadata {
  public hasKey(resourceName: string, key: string): boolean {
    return GetNumResourceMetadata(resourceName, key) > 0
  }

  public getAllByKey<E>(resourceName: string, key: string): MetadataValue<E>[] {
    if (!this.hasKey(resourceName, key)) {
      return null
    }

    const count = GetNumResourceMetadata(resourceName, key)
    const value: MetadataValue<E>[] = []

    for (let i = 0; i < count; i++) {
      value.push({
        value: GetResourceMetadata(resourceName, key, i),
        extra: <E>(GetResourceMetadata(resourceName, key + '_extra', i) as unknown),
      })
    }

    return value
  }

  public getFirstByKey<E>(resourceName: string, key: string): MetadataValue<E> {
    return this.getAllByKey<E>(resourceName, key)[0]
  }

  public getResourceNames(): string[] {
    const resources = []
    for (let i = 0; i < GetNumResources(); i++) {
      resources.push(GetResourceByFindIndex(i))
    }

    return resources
  }
}
