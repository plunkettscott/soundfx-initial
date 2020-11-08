import { Manager } from './manager'

const manager = new Manager()

on('onResourceStart', (resourceName: string) => {
  manager.registerResource(resourceName)
})
