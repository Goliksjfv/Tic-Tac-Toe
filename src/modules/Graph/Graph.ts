import Point from "./Point";

export type TWIN2D = {
    LEFT: number;
    BOTTOM: number;
    WIDTH: number;
    HEIGHT: number;
}

export type TWIN3D = TWIN2D & {
    CENTER: Point;
    CAMERA: Point;
}

export type TWIN = TWIN2D | TWIN3D;

export type TGraph = {
    id?: string;
    width?: number;
    height?: number;
    WIN: TWIN;
}

class Graph {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private PI2 = 2 * Math.PI;
    private WIN: TWIN;

    constructor({ id, width = 300, height = 300, WIN}: TGraph) {
        if (id) {
            this.canvas = document.getElementById(id) as HTMLCanvasElement;
        } else {
            this.canvas = document.createElement('canvas');
            document.querySelector('body')?.appendChild(this.canvas);
        };

        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.WIN = WIN;

       
    }

    xs(x: number): number {
        return this.canvas.width * (x - this.WIN.LEFT) / this.WIN.WIDTH;
    }
    ys(y: number): number {
        return this.canvas.height - this.canvas.height * (y - this.WIN.BOTTOM) / this.WIN.HEIGHT;
    }

    sx(x: number): number {
        return x * this.WIN.WIDTH / this.canvas.width;
    }
    sy(y: number): number {
        return y * this.WIN.HEIGHT / this.canvas.height;
    }

    clear(): void {
        this.context.fillStyle = '#fefefe';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1: number, y1: number, x2: number, y2: number, color = '#123456', width = 2): void {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
        this.context.closePath();
    }

    point(x: number, y: number, color = '#123456', size = 2): void {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.arc(this.xs(x), this.ys(y), size, 0, this.PI2);
        this.context.stroke();
        this.context.closePath();
    }
    
    text(
        x: number,
        y: number,
        text: string,
        size = '17px arial',
        color = '#000',
        isGraphName = false
    ): void {
        this.context.fillStyle = color;
        this.context.font = size;
        if (isGraphName) {
            this.context.save();
            this.context.translate(this.xs(x), this.ys(y));
            this.context.rotate(-Math.PI / 2);
            this.context.fillText(text, 0, 0);
            this.context.restore();
        } else {
            this.context.fillText(text, this.xs(x), this.ys(y));
        }
    }

    polygon(points: Omit<Point, 'z'>[], color = 'purple'): void {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
        }
        this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
        this.context.closePath();
        this.context.fill();
    }
}

export default Graph;