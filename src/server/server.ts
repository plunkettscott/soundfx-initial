import { Manager } from './manager'
import { registerCommands } from './commands'
import { registerWithHttpServer } from './api'

let manager: Manager = null

on('onResourceStart', onResourceStart)
function onResourceStart(resourceName: string) {
  if (resourceName === GetCurrentResourceName()) {
    manager = new Manager()
    manager.regiserKnownResources()

    registerCommands(manager)
    registerWithHttpServer(manager)
  }

  manager.registerResource(resourceName)
}

// Play Frontend
// exports('playFrontend', playFrontend)
function playFrontend(sound: string, source: number, invokedBy = null) {
  if (invokedBy === null) {
    invokedBy = GetInvokingResource()
  }

  manager.soundFromResource(GetInvokingResource(), sound)?.playFrontend(source)
}

on('SoundFX:PlayFrontend', (source: number, sound: string) => {
  playFrontend(sound, source, GetInvokingResource())
})