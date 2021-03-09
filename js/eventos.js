

const mapX = firstMap.length      //number of columns
const mapZ = firstMap[0].length   //this is why the map must has the same numbres of rows
const mapSpace = gameSetUp.wallWidth  //to make it short
    
var wallMaker=(location,real=1)=>{ //this function need a location and a "real" to decide if is a door or a wall
    let wallNow = document.createElement('a-box')           //creating a-box, this will be the wall
    let setWall = document.querySelector('#wall_entity')    //selecting in the document where this wall will be 
    //wallNow.setAttribute('src','#id')                     //in case you want to use a image
    wallNow.setAttribute('width',gameSetUp.wallWidth)       //giving the width to the wall
    wallNow.setAttribute('depth',gameSetUp.wallWidth)       //giving the depth to the wall
    wallNow.setAttribute('position',location)              //giving the location to the wall in the map
    
    if(real==1){                                            
        wallNow.setAttribute('static-body','')              //making solid the wall
        wallNow.setAttribute('height',gameSetUp.wallHeight) //giving the height to the wall
        wallNow.setAttribute('color',gameSetUp.wallColor)   //giving the color to the wall
    }else{
        wallNow.setAttribute('height',gameSetUp.doorHeight) //giving the height to the door
        wallNow.setAttribute('color',gameSetUp.doorColor)   //giving the color to the door
    }
    setWall.appendChild(wallNow)                            //uploading the document with the new information   
}

var pointMaker=(location, size = "0.5")=>{ //this function need a location, and optional a size to the powerpallets
    let setPoint = document.querySelector("#point_entity")  //crating a-sphere, this will be the points
    let pointNow = document.createElement('a-sphere')       //selecting the in document where this point going to be
    //pointNow.setAttribute('dynamic-body','')              //this going to make the ball fall and move 
    pointNow.setAttribute('color','white')                  //giving the color to the point 
    pointNow.setAttribute('radius',size)                    //giving the radius to the point 
    pointNow.setAttribute('position',location)              //giving the location to the point
    if(size=="0.5"){pointNow.setAttribute('class','points')} //giving the class to the point
    else{pointNow.setAttribute('class','powerpallet')}      //giving the class to the powerpallet
    setPoint.appendChild(pointNow)                          //uploading the document with the new information
}

var playerPosition = (theMap) =>{
    plpos =document.querySelector("#player").getAttribute("position")
    let x = Math.round(plpos.x/5 + theMap.length/2)
    let player = {
        rx: plpos.x,
        ry: plpos.y,
        rz: plpos.z, 
        x: x,
        y: plpos.y,
        z: Math.round(plpos.z/5 + theMap[x].length/2),
        id:"#player"
    }
    return (player)   
}

var setPlayerLocation=(location)=>{  
    document.querySelector('#player').setAttribute('position', location)
    document.querySelector('#pointer').setAttribute('position', "0 0.7 0")
    document.querySelector('#pointer').setAttribute('rotation', "-90 0 0")
    document.querySelector('#pointer').removeAttribute('cursor')
    document.querySelector('#pointer').setAttribute('cursor','fuse: true; fuseTimeout: 15')
    document.querySelector('#pointer').setAttribute('geometry', "primitive: ring; radiusInner: 0.8; radiusOuter: 0.9")
}

var playerDirection= (pl,direction,theMap=firstMap)=>{
    let vueltas

    if(direction<0){
        vueltas = Math.abs(Math.round(direction/360))
            vueltas +=1
            direction +=(360*vueltas)
    }
    if(direction>=360){
        vueltas = Math.floor(direction/360)

        direction -= 360*vueltas
    }
    
    if(direction<45 || direction>315 ){
        if(theMap[pl.x][pl.z-1]==1){}else{
            moveTo(moveRZ(pl,theMap))
        }
        
    }
    if(direction>135 && direction<225){
        if(theMap[pl.x][pl.z+1]==1){}else{
            moveTo(moveZ(pl,theMap))
        }
        
    }
    if(direction>45 && direction<135){
        if(theMap[pl.x-1][pl.z]==1){}else{
            moveTo(moveRX(pl,theMap))
        }
        
    } 
    if(direction>225 && direction<315){
        if(theMap[pl.x+1][pl.z]==1){}else{
            moveTo(moveX(pl,theMap))
        }  
    }
}


var searchtheLocation=(theMap=firstMap,search=-9)=>{
    //mapX=theMap.length
    //mapZ=theMap[0].length
 for(let x= 0;x<mapX;x++){
     for(let z= 0;z<mapZ;z++){
        if(theMap[x][z]==search){
         let objLocation={
             x: x,
             z: z,
             rx: (x-mapX/2)*mapSpace,
             rz: (z-mapZ/2)*mapSpace
         }
         return objLocation   
        }

     }
 }
 console.log("no hay, brother 😔👌")
}

function checktransportation(ph,theMap){

    let place = searchtheLocation(theMap,-3) 
    if(theMap[ph.x][ph.z]==-3){
        place=searchtheLocation(theMap,-1)
        ph.rx=place.rx
        ph.rz=place.rz
        moveTo(ph,10)
       
    }
    else if(theMap[ph.x][ph.z]==-4){
        place=searchtheLocation(theMap,-2)
        ph.rx=place.rx
        ph.rz=place.rz
        moveTo(ph,10)
        
    }
}

function doSound(id, sonido){
    let eso = document.querySelector(id)
    switch(id){
        case "Blinky":
            eso.setAttribute("sound",`autoplay: true; src: ${sonido} loop:true;`)
            break
        case "Pinky":
            eso.setAttribute("sound",`autoplay: true; src: ${sonido} loop:true;`)
            break
        case "Inky":
            eso.setAttribute("sound",`autoplay: true; src: ${sonido} loop:true;`)
            break
        case "Clyde":
            eso.setAttribute("sound",`autoplay: true; src: ${sonido} loop:true;`)
            break
        default:
            if(eso.getAttribute("sound")){
                eso.removeAttribute("sound")
                eso.setAttribute("sound",`autoplay: true; src: ${sonido}`)
            }else{
                eso.setAttribute("sound",`autoplay: true; src: ${sonido}`)
            break

            }       
    }
}

var start_again = ()=>{
    let num
    let place
    let ph
    for(var i=0;i<4;i++){
        switch(i){
            case 0:
                num = 8
                break
            case 1:
                num = 9
                break
            case 2:
                num = 5
                break
            case 3:
                num = 6
                break
        }
    place = searchtheLocation(firstMap,num)
    ph ={
        rx:place.rx,
        rz:place.rz,
        id:phantom[i].id
    }
    moveTo(ph,5)
    }
    gameSetUp.phantoms=1
}

function start_the_game(){
    
    //first thing it is create the map.. 
    let enz
    let enx
    gameSetUp.start=5
    gameSetUp.lifes=2 
    doSound("#pointer","#music_intro")

    for(var x=0;x<mapX;x++){ 
        for(var z=0;z<mapZ;z++){
            enx = (x - mapX/2)*mapSpace
            enz = (z - mapZ/2)*mapSpace
            switch (firstMap[x][z]){
                case 0:
                    //points
                    pointMaker(`${enx} 0.5 ${enz}`);
                    break
                case 1:
                    //wall
                    wallMaker(`${enx} 0.5 ${enz}`);
                    break
                case 2:
                    //door
                    wallMaker(`${enx} 0 ${enz}`,0);
                    break
                case 3:
                    //nothing
                    break
                case 4:
                    //nothing
                    break
                case 5:
                    //f cian
                    Inky.x=x
                    Inky.z=z
                    createPhantom(Inky.id,`${enx} 0 ${enz}`,Inky.model)
                    break
                case 6:
                    //f naranja
                    Clyde.x=x
                    Clyde.z=z
                    createPhantom(Clyde.id,`${enx} 0 ${enz}`,Clyde.model)
                    break
                case 7:
                    //power!!!
                    pointMaker(`${enx} 1 ${enz}`, "1,5");
                    break
                case 8:
                    //f rojo
                    Blinky.x=x
                    Blinky.z=z
                    createPhantom(Blinky.id,`${enx} 0 ${enz}`,Blinky.model)
                    break
                case 9:
                    //f rosado
                    Pinky.x=x
                    Pinky.z=z
                    createPhantom(Pinky.id,`${enx} 0 ${enz}`,Pinky.model)
                    break
                case 10:
                    //player position
                    setPlayerLocation(`50 100 ${enz}`); //35 099 0
                    break
            } 
        }
    }


    
    gameSetUp.points= Array.from(document.querySelectorAll('.points'))
    gameSetUp.pointsNumber = gameSetUp.points.length
    gameSetUp.points.forEach((pointNow)=>{
        pointNow.addEventListener('click',()=>{
            pointNow.setAttribute('position','0 0 -5')
            pointNow.setAttribute('visible','false')
            doSound("#player","#wakawaka")
            gameSetUp.pointsNumber-=1
            gameSetUp.score+=10
            if(gameSetUp.pointsNumber==0){
                document.querySelector('#mensaje').setAttribute('value','HAZ GANADO!! ERES GENIAL, RECUERDALO SIEMPRE')
            }
            else {
                document.querySelector('#mensaje').setAttribute('value',`LIFES:${gameSetUp.lifes}   POINTS:${gameSetUp.pointsNumber}  SCORE:${gameSetUp.score}     LEVEL:1 `)
            }
            
        })

    })


    //editar aun
    //powepallets
    gameSetUp.points= Array.from(document.querySelectorAll('.powerpallet'))
    gameSetUp.points.forEach((pointNow)=>{
        pointNow.addEventListener('click',()=>{
            pointNow.setAttribute('position','0 0 -5')
            pointNow.setAttribute('visible','false')
            doSound("#player","#wakawaka") //poner otro sonido
            gameSetUp.power=10 
            gameSetUp.start=4           
            //document.querySelector('#Blinky').setAttribute('src',"#mblue")
            //document.querySelector('#Inky').setAttribute('src',"#mblue")
            //document.querySelector('#Pinky').setAttribute('src',"#mblue")
            //document.querySelector('#Clyde').setAttribute('src',"#mblue")
            document.querySelector('#mensaje').setAttribute('value',`LIFES:${gameSetUp.lifes}   POINTS:${gameSetUp.pointsNumber}  SCORE:${gameSetUp.score}     LEVEL:1 `)
        })

    })
       
}


window.onload = ()=>{


    setInterval(()=>{  //esto tiene un intevalo para que cada tiempo se ejecuten ciertas acciones en la bolsa jajajja
        
        if(gameSetUp.start==0){//Intro, esperando que se inicie el juego
        console.log("Estamos esperando") //controlando el proceso
        }

        else if(gameSetUp.start==1){//setear el juego, quitar intro, crear mapa y fantasmas
            console.log("Creando el mapa y todas las cosas") //controlando el proceso
            document.querySelector('#others_entity').setAttribute('position', "0 -10 0")
            document.querySelector("#wall_entity").setAttribute('position','0 0 0')
            document.querySelector("#point_entity").setAttribute('position','0 0 0')
            document.querySelector("#phantom_entity").setAttribute('position','0 0 0')
            


            if(gameSetUp.now>0){
                gameSetUp.lifes=2
                setPlayerLocation("35 0 0")
            }else{
                start_the_game()
            }
            gameSetUp.start=5
            
        }
        else if(gameSetUp.start==2){//Setear juego luego de morir y tener vidas>=0
            console.log("Moriste, te ubicaremos de nuevo") //controlando el proceso
            start_again()
            gameSetUp.start=5
        }
        else if(gameSetUp.start==3 || gameSetUp.start==4){//Correr juego con fantasmas siguiendote o huyendo de ti
                console.log(`corriendo el juego en gameSetUp.start = ${gameSetUp.start}`) //controlando el proceso
                //juego corriendo
                let pl = playerPosition(firstMap)
                let ph
                let direction
                direction = document.querySelector("#view").getAttribute("rotation")
                playerDirection(pl,direction.y)
                checktransportation(pl,firstMap)
               
                for(var i=0;i<gameSetUp.phantoms;i++){
                    ph = phantomPosition(phantom[i],firstMap)  
                    movePhantoms(ph,pl)
                    checktransportation(ph,firstMap)
                    
                }

                if(gameSetUp.start==4){
                    gameSetUp.power+10
                    if(gameSetUp.power>=300){
                        gameSetUp.start=3
                        gameSetUp.power=0
                    }
                }
            

            if(gameSetUp.power>0){
                gameSetUp.power+=100
                if(gameSetUp.power>5000){
                    //document.querySelector('#Blinky').setAttribute('color',Blinky.color)
                    //document.querySelector('#Inky').setAttribute('color',Inky.color)
                    //document.querySelector('#Pinky').setAttribute('color',Pinky.color)
                    //document.querySelector('#Clyde').setAttribute('color',Clyde.color)
                    //gameSetUp.power=0
                    //devolver color normal a fantasmas
                }
            }else{
                //agregar fantasma
                gameSetUp.now+=100
                if(gameSetUp.now>=500){
                    doSound("#Blinky","#blinky")
                    doSound("#Pinky","#pinky")
                    doSound("#Inky","#inky")
                    doSound("#Clyde","#clyde")
                    if(gameSetUp.phantoms<4){
                        gameSetUp.phantoms +=1
                        gameSetUp.start=3
                    }
                    gameSetUp.now=1
                }
            }
            

        }
        else if(gameSetUp.start==5){//Contar 5 segundos antes de iniciar el juego
            console.log(`contando antes de iniciar el juego.. gameSetUp.start = ${gameSetUp.start}`) //controlando el proceso
            document.querySelector('#mensaje').setAttribute('value',`El juego empieza en ${(gameSetUp.now-5)*-1}`)
            if(gameSetUp.now>5){
                document.querySelector('#mensaje').setAttribute('value',`LIFES:${gameSetUp.lifes}   POINTS:${gameSetUp.pointsNumber}  SCORE:${gameSetUp.score}     LEVEL:1 `)
                gameSetUp.start=4
                gameSetUp.now=1
                document.querySelector('#player').setAttribute('position',"35 0 0")
                setPlayerLocation("35 0 0")
            }else{
                gameSetUp.now+=1
            }
        }
        else if(gameSetUp.start==6){//Contar 5 segundos antes de enviarte al intro
            console.log(`ya moristesss, vas al intro de nuevo gameSetUp.start = ${gameSetUp.start}`) //controlando el proceso
            document.querySelector('#mensaje').setAttribute('value',`Volviendo al inicio en ${(gameSetUp.now-5)*-1}`)
            if(gameSetUp.now>6){
                document.querySelector('#mensaje').setAttribute('value',`I hope you enjoyed it! thanks to try, your SCORE:${gameSetUp.score}`)
                let pl =playerPosition(firstMap)
                pl.rx=0
                pl.rz=0
                moveTo(pl,1)
                gameSetUp.start=0
                gameSetUp.now=1
                document.querySelector("#wall_entity").setAttribute('position','0 -15 0')
                document.querySelector("#point_entity").setAttribute('position','0 -15 0')
                document.querySelector("#phantom_entity").setAttribute('position','0 -15 0')
                document.querySelector('#others_entity').setAttribute('position', "0 0 0")
                document.querySelector("#pointer").setAttribute('cursor','fuse: true; fuseTimeout: 2000')
                document.querySelector('#pointer').setAttribute('position', "0 0 -1")
                document.querySelector('#pointer').setAttribute('rotation', "0 0 0")
                document.querySelector('#pointer').setAttribute('geometry', "primitive: ring; radiusInner: 0.01; radiusOuter: 0.02")
            }else{
                gameSetUp.now+=1
            }
        }
        else if(gameSetUp.start==7){//time stopped.. you can go around all the map
            console.log(`Holi? gameSetUp.start = ${gameSetUp.start}`) //controlando el proceso
            if(gameSetUp.now>0){

            }else{

            }
        }

        //Aqui acaba el intevalo que vuelve a repetirse
        },gameSetUp.gtime)








}


