export class DispalySettingsFilter {
    Background: string;
    Sensor: string[];
}

export class DispalySettingsJson {
    'display-settings': DispalySettingsFilter;       
}

export class DispalySettings {
    Backgrounds: string[];
    Sensors: string[];
}