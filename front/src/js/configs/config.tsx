export const config = {
    devMode: true,
}

export const API_PATH: string = config.devMode ? 'http://localhost:8000/api' : 'https://futsu100.com/api';

export const colorConfig = {
    emeraldGreen: 'rgb(46, 204, 135)',
    modernCian: 'rgb(61, 194, 200)',
    deepSkyBlue: 'rgb(71, 178, 247)',
    pastelBrown: 'rgb(148, 128, 120)',
    midnightBlack: 'rgb(33, 33, 33)',
    appleRed: 'rgb(231, 59, 59)',
    frenchRode: 'rgb(243, 95, 140)',
    coralPink: 'rgb(251, 127, 119)',
    brightOrange: 'rgb(253, 192, 45)',
    softViolet: 'rgb(179, 139, 220)',
}