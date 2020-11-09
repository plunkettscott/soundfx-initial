
onNet('SoundFX::Internal:StartSound', (data: PlaySoundData, options: any) => {
  SendNuiMessage(JSON.stringify({
    data,
    options, 
  }))
})

RegisterNuiCallbackType('getInfo')
on('__cfx_nui:getInfo', () => {
  const info: ClientInformation = {
    serverEndpoint: GetCurrentServerEndpoint(),
    resourceName: GetCurrentResourceName(),
  }
  
  SendNuiMessage(JSON.stringify({
    info,
  }))
})