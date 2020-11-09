import { Howl } from 'howler'

const activeHowlers = []
let clientInformation: ClientInformation

function sendNuiCommand(command: string, body: any = {}) {
    /* @ts-ignore */
    return fetch(`https://${GetParentResourceName()}/${command}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(body)
    }).then(resp => resp.json()).then(r => console.log(r));
}

function listenForMessages() {
    sendNuiCommand('getInfo')

    window.addEventListener('message', (str: MessageEvent) => {
        const { data, info }: SoundFXMessageData = str.data

        if (info !== null && info !== undefined) {
            clientInformation = info
            console.log('[SoundFX] Received Information Payload', clientInformation)

            return
        }
    
        switch (data.mode) {
            case 'Frontend': {
                return startFrontendSound(data)
            }
        }
    })    
}

function getSource(data: PlaySoundData) {
    return `http://${clientInformation.serverEndpoint}/${clientInformation.resourceName}/${data.resource}/${data.sound}/file`
}

function startFrontendSound(data: PlaySoundData) {
    const frontendSound = new Howl({
        src: getSource(data),
        html5: true,
        volume: data.volume,
    })

    frontendSound.play()

    activeHowlers.push(frontendSound)
}

listenForMessages()