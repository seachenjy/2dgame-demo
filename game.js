
    let ctx = document.getElementById("main").getContext("2d")
    let width  = 800
    let height = 600
    let gridSize = 40
    let tkpos = [300,300]
    let tkgpos = [0,20]
    let clientX = 0
    let clientY = 0

    function draw(){
        ctx.clearRect(0,0,width,height)
        ctx.lineWidth = 0.5
        ctx.fillStyle="#f8f8f8"

        ctx.beginPath()
        for (let i=1,max=width/gridSize;i<max;i++){
            ctx.moveTo(i*gridSize,0)
            ctx.lineTo(i*gridSize,height)
        }
        for (let i=1,max=height/gridSize;i<max;i++){
            ctx.moveTo(0,i*gridSize)
            ctx.lineTo(width,i*gridSize)
        }
        ctx.stroke()
        ctx.closePath()



        ctx.beginPath();
        ctx.fillStyle="#dd0000"
        ctx.arc(tkpos[0], tkpos[1], 10, 0, Math.PI*2)
        ctx.fill()
        ctx.closePath()
        
        ctx.beginPath();
        ctx.lineWidth = 3
        ctx.moveTo(tkpos[0],tkpos[1])
        let s = (60*60)/(Math.abs(clientX*clientX) + Math.abs(clientY*clientY))
        ctx.lineTo(clientX*s + tkpos[0],clientY*s + tkpos[1])
        ctx.stroke()
        ctx.closePath()
        
        setTimeout(requestAnimationFrame(draw),100)

    }

    draw()


    document.getElementById("main").addEventListener("mousemove",function(e){
        clientX = e.offsetX - tkpos[0]
        clientY = e.offsetY - tkpos[1]
    })
    
