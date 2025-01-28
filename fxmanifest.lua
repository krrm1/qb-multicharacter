fx_version 'cerulean'
game 'gta5'

description 'amir_expert#1911'
version '2.0.0'

shared_script 'config.lua'
client_script 'client/main.lua'
server_scripts  {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua'
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/reset.css',
    'html/profanity.js',
    'html/script.js',
    'html/male_pos.png',
    'html/logo_main.png'
}

dependencies {
    'qb-core'
}

lua54 'yes'


escrow_ignore {
    'config.lua',
    'client/main.lua',
    'server/main.lua',
}
