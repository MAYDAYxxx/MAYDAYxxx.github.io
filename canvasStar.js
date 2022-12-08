window.addEventListener('load',()=>{
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");      
    window.onresize=resizeCanvas;
    function resizeCanvas(){
       canvas.width=window.innerWidth;
       canvas.height=window.innerHeight;
    }
   
    resizeCanvas(); 
    canvas.style.cssText = `
    position: fixed;
    z-index: 1000;
    pointer-events: none;
    `
    //
    var arr = [];
    var colours =["#ffff00","#66ffff","#3399ff","#99ff00","#ff9900"];
    
    //
    window.addEventListener('mousemove', e=>{
            
            arr.push({
                x:e.clientX,
                y:e.clientY,
                r:Math.random()*0.5+1.5,
                td:Math.random()*4-2,
                dx:Math.random()*2-1,
                dy:Math.random()*1+1,
                rot: Math.random()*90+90,
                color: colours[Math.floor(Math.random()*colours.length)]
            });
           
    })
    //
    function star(x,y,r,l,rot){
       ctx.beginPath();
        for(let i=0;i<5;i++){         
           ctx.lineTo(Math.cos((18 + i*72 -rot)*Math.PI/180)*r+x,
           -Math.sin((18 + i*72 - rot)*Math.PI/180)*r+y);
           ctx.lineTo(Math.cos((54+i*72-rot)*Math.PI/180)*l+x
               ,-Math.sin((54+i*72 -rot)*Math.PI/180)*l+y);             
        }
        ctx.closePath();   
    }
    //
    function draw(){
        for(let i=0;i<arr.length;i++){
            let temp = arr[i];
            star(temp.x,temp.y,temp.r,temp.r*3,temp.rot);
            ctx.fillStyle = temp.color;
            ctx.strokeStyle = temp.color;
            ctx.lineWidth = 0.1;
            ctx.lineJoin = "round";
            ctx.fill();
            ctx.stroke();
        }
    }
    
    //
    function update(){
        for(let i=0;i<arr.length;i++){
            arr[i].x += arr[i].dx;
            arr[i].y += arr[i].dy;
            arr[i].rot += arr[i].td;
            arr[i].r -= 0.015;
            if(arr[i].r<0){
                arr.splice(i,1);
            }
        }
    }
    
    
    setInterval(()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        draw();
        update();
    },20)
})
