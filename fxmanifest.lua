fx_version 'cerulean'
game 'gta5'

name 'SoundFX'
description 'A toolset for playing non-native sounds in the 3D world.'
author 'Scott Plunkett'
url 'https://github.com/plunkettscott/soundfx'

client_script 'dist/client/client.js'
server_script 'dist/server/server.js'

ui_page 'dist/client/ui/index.html'

exports {
  'playFrontend'
}

files {
  'dist/client/ui/ui.js',
  'dist/client/ui/index.html'
}
