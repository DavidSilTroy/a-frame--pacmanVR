
function turnTo(ploh,y){ //recibe el objeto player o phantom y el tiempo
    
    switch (ploh.id){
        case "Blinky":
            document.querySelector(`#${ploh.id}`).setAttribute("rotation",` 0 ${y} 0`)
            break
        case "Pinky":
            document.querySelector(`#${ploh.id}`).setAttribute("rotation",` 0 ${y} 0`)
            break
        case "Inky":
            document.querySelector(`#${ploh.id}`).setAttribute("rotation",` 0 ${y} 0`)
            break
        case "Clyde":
            document.querySelector(`#${ploh.id}`).setAttribute("rotation",` 0 ${y} 0`)
            break
        default:
            break
    }
}

function moveTo(ploh,time=950){ //recibe el objeto player o phantom y el tiempo
    
    switch (ploh.id){
        case "Blinky":
            document.querySelector(`#${ploh.id}`).setAttribute("animation",`property: position; to: ${ploh.rx} 0 ${ploh.rz}; dur: ${time*1}; easing: linear; loop: false`)
            break
        case "Pinky":
            document.querySelector(`#${ploh.id}`).setAttribute("animation",`property: position; to: ${ploh.rx} 0 ${ploh.rz}; dur: ${time*1}; easing: linear; loop: false`)
            break
        case "Inky":
            document.querySelector(`#${ploh.id}`).setAttribute("animation",`property: position; to: ${ploh.rx} 0 ${ploh.rz}; dur: ${time*1}; easing: linear; loop: false`)
            break
        case "Clyde":
            document.querySelector(`#${ploh.id}`).setAttribute("animation",`property: position; to: ${ploh.rx} 0 ${ploh.rz}; dur: ${time*1}; easing: linear; loop: false`)
            break
        default:
            document.querySelector(`${ploh.id}`).setAttribute("animation",`property: position; to: ${ploh.rx} 0.0999 ${ploh.rz}; dur: ${time*1.1}; easing: linear; loop: false`)
            break
    }
}

var moveX = (ph,theMap=firstMap) =>{
    ph.x+=1
    ph.rx=(ph.x -theMap.length/2)*5
    ph.rz=(ph.z -theMap[0].length/2)*5
    return(ph)
}

var moveRX = (ph,theMap=firstMap) =>{

    ph.x-=1
    ph.rx=(ph.x -theMap.length/2)*5
    ph.rz=(ph.z -theMap[0].length/2)*5
    return(ph)
}

var moveZ = (ph,theMap=firstMap) =>{

    ph.z+=1
    ph.rz=(ph.z -theMap[0].length/2)*5
    ph.rx=(ph.x -theMap.length/2)*5
    return(ph)
}

var moveRZ = (ph,theMap=firstMap) =>{
    ph.z-=1
    ph.rz=(ph.z -theMap[0].length/2)*5
    ph.rx=(ph.x -theMap.length/2)*5
    return(ph)
}

function movePhantoms(ph,){ 

    let x,z,px,pz
    
    let d1 = 2000
    let d2 = 1/0
    let d3 = 1/0
    let d4 = 1/0
    let time = gameSetUp.gtime
    let pl = playerPosition(firstMap)
    
    if(gameSetUp.start==4){
        switch (ph.id){
            case "Blinky":
                px=pl.x*-3
                pz=pl.z*-4
                break
            case "Pinky":
                px = pl.z*8
                pz = pl.x*9
                break
            case "Inky":
                px=pl.x*-5
                pz=pl.z*5
                break
            case "Clyde":
                px=pl.x*10
                pz=pl.z*-8
                break
        }
    }else{
        switch (ph.id){
            case "Blinky":
                px=pl.x
                pz=pl.z
                break
            case "Pinky":
                px = pl.z*2
                pz = pl.x*2
                break
            case "Inky":
                px=pl.x*1.7
                pz=pl.z*1.7
                break
            case "Clyde":
                px=pl.x*1.2
                pz=pl.z*1.2
                break
        }
    }
    
    

    x=ph.x
    z=ph.z
    for(let count= 0;count<4;count++){
        switch(count){
            case 0:
                x-=1
                break
            case 1:
                x+=1
                z-=1
                break
            case 2:
                x+=1
                z+=1
                break
            case 3:
                x-=1
                z+=1
                break
        }
        if(firstMap[x][z]==1||firstMap[x][z]==4){
        }else{
            if(phantom[ph.number].x==x&&phantom[ph.number].z==z){ 
            }else{
                switch(count){
                    case 0:
                        d1=Math.sqrt(((x-px)**2)+((z-pz)**2))
                        break
                    case 1:
                        d2=Math.sqrt(((x-px)**2)+((z-pz)**2))
                        break
                    case 2:
                        d3=Math.sqrt(((x-px)**2)+((z-pz)**2))
                        break
                    case 3:
                        d4=Math.sqrt(((x-px)**2)+((z-pz)**2))
                        break
                    
                }
            }
        }
    }
    phantom[ph.number].x=ph.x
    phantom[ph.number].z=ph.z

    

    if(d1>d2){d1="a"}else{d2="a"}
    if(d3>d4){d3="a"}else{d4="a"}
    
    if(d1!="a"&&d3!="a"){
        if(d1>d3){
            turnTo(ph,-90)
            moveTo(moveX(ph,firstMap),time)
            
        }else{
            turnTo(ph,90)
            moveTo(moveRX(ph,firstMap),time)
            
        }
    }
    else if(d1!="a"&&d4!="a"){
        if(d1>d4){
            turnTo(ph,180)
            moveTo(moveZ(ph,firstMap),time)
            
        }else{
            turnTo(ph,90)
            moveTo(moveRX(ph,firstMap),time)
            
        }
    }
    else if(d2!="a"&&d3!="a"){
        if(d2>d3){
            turnTo(ph,-90)
            moveTo(moveX(ph,firstMap),time)
            
        }else{
            turnTo(ph,0)
            moveTo(moveRZ(ph,firstMap),time)
            
        }
    }
    else if(d2!="a"&&d4!="a"){
        if(d2>d4){
            turnTo(ph,180)
            moveTo(moveZ(ph,firstMap),time)
            
        }else{
            turnTo(ph,0)
            moveTo(moveRZ(ph,firstMap),time)
            
        }
    }
}

var phantomPosition = (ph,theMap=firstMap)=>{
    
    let phpos = document.querySelector(`#${ph.id}`).getAttribute("position")
    //posicion del fantasma en arreglo
    let x = Math.round(phpos.x/5 + theMap.length/2)

        let phant={
            rx: phpos.x,
            ry: phpos.y,
            rz: phpos.z,
            x: x,
            y: phpos.y,
            z:Math.round(phpos.z/5 + theMap[x].length/2),
            id:ph.id,
            number: ph.number
        }
        return phant  
}


var createPhantom=(name,location,model)=>{       //es posible que cambie esto un poco para poner objetos en 3d xd
    let setPhantom = document.querySelector("#phantom_entity")
    let phantomNow = document.createElement('a-gltf-model')
    //phantomNow.setAttribute('dynamic-body','')
    phantomNow.setAttribute('id',name)
    phantomNow.setAttribute('src',model)
    phantomNow.setAttribute('scale','1.5 1.3 1.5')
    phantomNow.setAttribute('position',location)
    //interaccion fantasma-jugador
    phantomNow.addEventListener('click',()=>{
        if(gameSetUp.start==3||gameSetUp.start==4){    
            if(phantomNow.getAttribute('color')=="#2121DE"){
                document.querySelector('#mensaje').setAttribute('value',`delicius!`)
                phantomNow.setAttribute('position',location)
                switch (name){
                    case "Blinky":
                    phantomNow.setAttribute('color',Blinky.color)
                    break
                    case "Pinky":
                    phantomNow.setAttribute('color',Pinky.color)
                    break
                    case "Inky":
                    phantomNow.setAttribute('color',Inky.color)
                    break
                    case "Clyde":
                    phantomNow.setAttribute('color',Clyde.color)
                    break
                }
    
            }else{
                doSound("#player","#dead")
                gameSetUp.lifes-=1
                if(gameSetUp.lifes<0){
                    gameSetUp.start=6
                }else{
                    gameSetUp.start=2
                    gameSetUp.now=1
                    document.querySelector('#mensaje').setAttribute('value',`LIFES:${gameSetUp.lifes}     POINTS:${gameSetUp.pointsNumber}      LEVEL:1 `)
                }
                
    
            }
        }
    })

    setPhantom.appendChild(phantomNow) 
}





            



