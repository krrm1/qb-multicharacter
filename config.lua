Config = {}
Config.StartingApartment = true -- Enable/disable starting apartments (make sure to set default spawn coords)
Config.Interior = vector3(-1044.49, -2749.64, 21.37) -- Interior to load where characters are previewed
Config.DefaultSpawn = vector3(-1044.49, -2749.64, 21.37) -- Default spawn coords if you have start apartments disabled
Config.PedCoords = vector4(-1051.87, -2721.22, 0.8, 46.17) -- Create preview ped at these coordinates
Config.HiddenCoords = vector4(-1051.87, -2721.22, 0.8, 46.17) -- Hides your actual ped while you are in selection
Config.CamCoords = vector4(-1056.31, -2717.17, 2, 49.21) -- Camera coordinates for character preview screen

Config.DefaultNumberOfCharacters = 5 -- min = 1 | max = 5
Config.PlayersNumberOfCharacters = { -- Define maximum amount of player characters by rockstar license (you can find this license in your server's database in the player table)
    { license = "license:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", numberOfChars = 2 },
}

Config.PedCords = {
    [1] = vector4(-1063.4, -2714.47, 0.8, 239.55),
    [2] = vector4(-1062.54, -2713.47, 0.8, 226.12),
    [3] = vector4(-1061.85, -2712.47, 0.8, 226.49),
    [4] = vector4(-1060.87, -2711.47, 0.8, 225.39),
    [5] = vector4(-1060.1, -2710.47, 0.8, 227.23),
}

Config.TrainCoord = {
    Heading = 0,
    Start = vector3(0, 0, 0),
    Stop = vector3(0, 0, 0),
}