var dir = "levels/Sounds/";
var ex = ".ogg";

var Sound = {};
Sound.credits = new Audio(dir + "credits" + ex);
Sound.desertPyramid = new Audio(dir + "desertPyramid" + ex);
Sound.doorOpen = new Audio(dir + "doorOpen" + ex);
Sound.endGame = new Audio(dir + "endGame" + ex);
Sound.fail = new Audio(dir + "fail" + ex);
Sound.greekMarket = new Audio(dir + "greekMarket" + ex);
Sound.greekTemple = new Audio(dir + "greekTemple" + ex);
Sound.interact = new Audio(dir + "interact" + ex);
Sound.intro = new Audio(dir + "intro" + ex);
Sound.norseBasic = new Audio(dir + "norseBasic" + ex);
Sound.norseSerene = new Audio(dir + "norseSerene" + ex);
Sound.objectFound = new Audio(dir + "objectFound" + ex);
Sound.portal = new Audio(dir + "portal" + ex);
Sound.puzzleSolved = new Audio(dir + "puzzleSolved" + ex);
Sound.pyramidRooms = new Audio(dir + "pyramidRooms" + ex);
Sound.wind = new Audio(dir + "wind" + ex);
Sound.thunder = new Audio(dir + "thunder" + ex);
Sound.lightning = new Audio(dir + "lightning" + ex);

function isPlaying(audelem) { 
    return !audelem.paused; 
}

function isAnyPlaying(){
    var playing = false;
    for (track in Sound) {
        if (isPlaying(Sound[track])){
            playing = true;
            console.log(track);
        }
    }
    return playing;
}

function isAnyPlayingExcept(thisOne) {
    var playing = false;
    for (track in Sound) {
        if (track != thisOne && isPlaying(Sound[track])){
            playing = true;
            console.log(track);
        }
    }
    return playing;
}

function muteAll() {
    for (track in Sound) {
        stop(track);
    }
}

function stop(track) {
    Sound[track].pause();
    Sound[track].currentTime = 0;
    for(var i = waiting.length - 1; i >= 0; i--) {
        if(waiting[i] === track) {
            waiting.splice(i, 1);
        }
    }

}

function loop(track) {    
    Sound[track].addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

}

// Play and pause others while playing
function primaryPlay(thisOne) {
    // Play this one
    Sound[thisOne].play();

    // Check which are playing
    var playing = [];

    for (track in Sound) {
        if (track != thisOne && !Sound[track].paused) {
            // add to array
            playing.push(track);

            // Pause
            Sound[track].pause();
        }
    }


    // If this one has ended, play others
    Sound[thisOne].addEventListener('ended', function() {
        console.log(playing);
        for (player in playing) {
            console.log(player);
            if (Sound[playing[player]].currentTime > 0) {
                secondaryPlay(playing[player]);
                console.log("secondary playing");
            }
        }
    }, false);
}


// Remeber waiting.
var waiting = [];
// Play when others are done
function secondaryPlay(thisOne) {
    waiting.push(thisOne);

    var finishedLast = 0;
    for (track in Sound) {
        if (track != thisOne && !Sound[track].paused) {
            var finished = Sound[track].duration - Sound[track].currentTime;
            if (finished > finishedLast) {
                finishedLast = finished;
            }

        }
    }

    // Play when last one is done.
    setTimeout(function(){
        if (waiting.indexOf(thisOne) != -1){
            Sound[thisOne].play();
            loop(thisOne);
        }
    }, finished * 1000);
}