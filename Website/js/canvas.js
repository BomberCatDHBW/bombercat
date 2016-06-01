function drawCanvas(){
    var canvas = document.getElementById('canvas');
    if(canvas.getContext){
        var context = canvas.getContext('2d');
        context.fillStyle = "rgb(255, 0, 255)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}