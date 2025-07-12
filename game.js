var buttonColors =["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level =0;
var i=0;
var check=true;
function nextSequence(){
    $("h1").html("LEVEL "+level++);
    var randomNumber = Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    return randomNumber;

}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();

}
function flash(color){
    $("#" + color).fadeOut(100).fadeIn(100);
    playSound(color);

}

function arraysEqual(arr1, arr2){
    for(var j = 0;j<arr1.length;j++){
        if(arr1[j]!=arr2[j]){
            return false;
        }
    }
    return true;

}
function wrong(){
    playSound("wrong");
    level = 0;
    userClickedPattern.length = 0;
    gamePattern.length = 0;
    $("h1").html("Bzzzz WRONG");
    setTimeout(function () {
        $("h1").html("Press A Key to Start");
    }, 2000);

}

$(document).keydown(function(event){
    if(event.key=="a" && level==0){
        var randomChosenColor = buttonColors[nextSequence()];
        gamePattern.push(randomChosenColor);
        console.log(gamePattern);
        flash(randomChosenColor);   
    }
});


$(".btn").click(function(event){
    var userChosenColor=this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    if(userClickedPattern[i]!=gamePattern[i])
    {
        wrong();
        i=0;
        check = false;
    }
    else{
        i++;
        check = true;
    }

    if((userClickedPattern.length == gamePattern.length)&& check == true){
        
        if(arraysEqual(userClickedPattern,gamePattern)){
            i=0;
            userClickedPattern.length = 0;
            randomChosenColor=buttonColors[nextSequence()];
            gamePattern.push(randomChosenColor);
            setTimeout(function(){flash(randomChosenColor);},800);
        }
        else{
            wrong();
        }
    }
});






