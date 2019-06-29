export class ImageData {
    srcUrl: string = '';
    name: string;
    sensor: string;
    x: number;
    y: number;
    xResponsive: number;
    yResponsive: number;
    clipX: number;
    clipY: number;
    clipWidth: number;
    clipHeight: number;    
   
    constructor({name, sensor, x, y, clipX, clipY, clipW, clipH}, srcUrl: string) {
        this.name = name;
        this.sensor = sensor;
        this.x = x;
        this.y = y;
        this.xResponsive = x;
        this.yResponsive = y;
        this.clipX = clipX;
        this.clipY = clipY;
        this.clipWidth = clipW;
        this.clipHeight = clipH;
        this.srcUrl = srcUrl;
    }  
}