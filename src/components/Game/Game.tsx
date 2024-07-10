import { Graph } from "../../modules/Graph";
import useGraph from "../../modules/Graph";
import { useEffect } from "react";


const Game = () =>{
    const WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    }
    let graph: Graph | null = null;
    const [getGraph, cancelGraph] = useGraph(render);
    let field=[];

   
    const mouseup = () => {
        
    };

    const mousedown = (event:MouseEvent) => {
        if(!graph){
            return;
        }
        console.log(graph.sx(event.clientX)-30);
        console.log(-(graph.sy(event.clientY)-10)); 
    };
    

    function render(): void {
        if (!graph) {
            return;
        }
        graph.clear();
        let i=1;
            
            printField();
            printCross(0,0);
            printZero(0,0);
            
    };
    useEffect(() => {
        // @ts-ignore
        graph = getGraph({
            WIN,
            id: 'canvas',
            width: 500,
            height: 500,
            callbacks: { mouseup, mousedown }
        });

        return () => {
            cancelGraph();
        }
    });
    function printCross(x:number,y:number){
        if(!graph){
            return;
        }
        graph.line(x,y,x+WIN.WIDTH/6,y+WIN.WIDTH/6);
        graph.line(x,y,x-WIN.WIDTH/6,y+WIN.WIDTH/6);
        graph.line(x,y,x-WIN.WIDTH/6,y-WIN.WIDTH/6);
        graph.line(x,y,x+WIN.WIDTH/6,y-WIN.WIDTH/6);
    }
    function printZero(x:number,y:number){
        if (!graph) {
            return;
        }
        graph.point(0,0,'#000000',WIN.WIDTH*4);
    }
    function printField(){
        if (!graph) {
            return;
        }
        graph.line(WIN.LEFT+WIN.WIDTH/3, WIN.HEIGHT/2, WIN.LEFT+WIN.WIDTH/3, -WIN.HEIGHT/2, '#000000');
        graph.line(WIN.LEFT+2*WIN.WIDTH/3, WIN.HEIGHT/2, WIN.LEFT+2*WIN.WIDTH/3, -WIN.HEIGHT/2, '#000000');
        graph.line(WIN.LEFT,-WIN.BOTTOM-WIN.HEIGHT/3,-WIN.LEFT,-WIN.BOTTOM-WIN.HEIGHT/3,'#000000');
        graph.line(WIN.LEFT,-WIN.BOTTOM-2*WIN.HEIGHT/3,-WIN.LEFT,-WIN.BOTTOM-2*WIN.HEIGHT/3,'#000000');
       
        
    }
    return(<>
        <canvas id='canvas' width='500' height='500' />
    </>);
}

export default Game;