import { Manager } from "./manager";

export const registerCommands = (manager: Manager) => {
    RegisterCommand('soundfx-resources', () => {
        manager.resources.forEach((r) => {
            console.log(`${r}: ${manager.resource(r).path}`)
        })
    }, true)
}