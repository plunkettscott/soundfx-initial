
interface SoundFXMessageData {
    info: ClientInformation
    data: PlaySoundData
    options: any
}

interface ClientInformation {
    serverEndpoint: string
    resourceName: string
}