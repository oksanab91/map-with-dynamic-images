export class DispalySettingsFilter {
    background: string;
    sensor: string[];
}

export class DispalySettingsJson {
    'display-settings': DispalySettingsFilter;       
}

export class DispalySettings {
    backgrounds: string[];
    sensors: string[];
}