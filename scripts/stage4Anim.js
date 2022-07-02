initStage = function(stage) {
    if(stage == 4) {    
        if(getCookie("progress") < 4) {
            setCookie("progress", 4, 3);
        }
        showLoadingScreen(false);
        //cloud transition pauses global timeline
        if(gsap.globalTimeline.paused()) {
            gsap.globalTimeline.play();
        }
        loadRoom("./resources/images/rooms/stage4SoftwareDev.svg", 1);
        gsap.to(characterSelector, {delay: 3, autoAlpha: 1, duration: 1});
    }
}

//building stage animations
buildTweens = function(stage, callback) {
    if(stage != 4) {
        return false;
    }
    //console.log("building tweens for stage4");
    
    callback();
}

/**
 * @name loadRoom
 * @description loads desired room svg + animation function
 * @param {string} room 
 * @param {int} roomNr 
 */
function loadRoom(room, roomNr) {
    $.ajax({
        url: room,
        dataType: 'html'
    }).done(function(data) {
        $("#svg-wrapper").html(data);
        switch(roomNr) {
            case 1:
                animateDevSoft();
                break;
            case 2:
                animateGraphics3D();
                break;
            case 3:
                animateAudioVisual();
                break;
            default:
                animateDevSoft();
                break;
        }
    });
}

var animatePath;
var movePf1, movePf2, movePf3, movePf4, movePf5, movePf6;
function animateDevSoft() {
    animatePath = Array;
    charMovePath = gsap.utils.toArray(".charPathSWDev");
    /* Animate all char move paths at once */
    for (let i = 0; i < charMovePath.length; i++) {
        const element = charMovePath[i];
        //Animated paths for draggable
        animatePath[i] = gsap.from(element, {
            autoAlpha: 0,
            onComplete: function() {
                gsap.to(element, {
                    strokeWidth: ".5px",
                    strokeDashoffset: -10,
                    repeat: -1,
                    duration: .5,
                    ease:Linear.easeNone
                });
            },
            paused: true
        });
    }
    //platforms appear
    gsap.from("#backgroundPlatforms", {
        autoAlpha: 0, 
        duration: 2,
        onComplete: function() {
            /* make current char move timeline access global */
            moveCharTimeline = movePf1;
            charDraggable(0, -400);
            animatePath[0].play();
        }   
    })
    //Platform 1
    movePf1 = gsap.timeline({
        paused: true,
        onComplete: function() {
            /* stop completed path, disable draggable and play next animation */
            dragMe[0].disable();
            platform1.play();
            animatePath[0].pause();
            animatePath[0].progress(0); 
        }
    });
    movePf1.to(characterSelector, {
        motionPath: {
                path: charMovePath[0],
                align: charMovePath[0],
                alignOrigin: [0.5, 0.5]
            },
            transformOrigin: "50% 50%",
            onComplete: function() {
                gsap.set(characterSelector,{scaleX: -1});
            }
        }
    );
    //move player char to start
    movePf1.progress(0.01);
    //platform content falls down after characer is moved
    let platform1 = gsap.from(".platform1", {
        y: -500, 
        autoAlpha: 0, 
        duration: 1,
        paused: true,
        onComplete: function() {
            moveCharTimeline = movePf2;
            charDraggable(0, 400);
            animatePath[1].play();
        }
    });
    //Platform 2
    movePf2 = gsap.timeline({
        paused: true,
        onComplete: function() {
            /* stop completed path, disable draggable and play next animation */
            dragMe[0].disable();
            platform2.play();
            animatePath[1].pause();
            animatePath[1].progress(0); 
        }
    })
    movePf2.to(characterSelector, {
        motionPath: {
                path: charMovePath[1],
                align: charMovePath[1],
                alignOrigin: [0.5, 0.5]
            },
            transformOrigin: "50% 50%",
            onComplete: function() {
                gsap.set(characterSelector,{scaleX: 1});
            }
        }
    );
    //platform content falls down after characer is moved
    let platform2 = gsap.from(".platform2", {
        y: -500, 
        autoAlpha: 0, 
        duration: 1,
        paused: true,
        onComplete: function() {
            moveCharTimeline = movePf3;
            charDraggable(0, -400);
            animatePath[2].play();
        }
    });
    //Platform 3
    movePf3 = gsap.timeline({
        paused: true,
        onComplete: function() {
            /* stop completed path, disable draggable and play next animation */
            dragMe[0].disable();
            platform3.play();
            animatePath[2].pause();
            animatePath[2].progress(0); 
        }
    })
    movePf3.to(characterSelector, {
        motionPath: {
                path: charMovePath[2],
                align: charMovePath[2],
                alignOrigin: [0.5, 0.5]
            },
            transformOrigin: "50% 50%",
            onComplete: function() {
                gsap.set(characterSelector,{scaleX: -1});
            }
        }
    );
    //platform content falls down after characer is moved
    let platform3 = gsap.from(".platform3", {
        y: -500, 
        autoAlpha: 0, 
        duration: 1,
        paused: true,
        onComplete: function() {
            moveCharTimeline = movePf4;
            charDraggable(0, 400);
            animatePath[3].play(); 
        }
    });
    //Platform 4
    movePf4 = gsap.timeline({
        paused: true,
        onComplete: function() {
            /* stop completed path, disable draggable and play next animation */
            dragMe[0].disable();
            platform4.play();
            animatePath[3].pause();
            animatePath[3].progress(0); 
        }
    })
    movePf4.to(characterSelector, {
        motionPath: {
                path: charMovePath[3],
                align: charMovePath[3],
                alignOrigin: [0.5, 0.5]
            },
            transformOrigin: "50% 50%",
            onComplete: function() {
                gsap.set(characterSelector,{scaleX: 1});
            }
        }
    );
    //platform content falls down after characer is moved
    let platform4 = gsap.from(".platform4", {
        y: -500, 
        autoAlpha: 0, 
        duration: 1,
        paused: true,
        onComplete: function() {
            moveCharTimeline = movePf5;
            charDraggable(0, -400);
            animatePath[4].play(); 
        }
    });
    //Platform 5
    movePf5 = gsap.timeline({
        paused: true,
        onComplete: function() {
            /* stop completed path, disable draggable and play next animation */
            dragMe[0].disable();
            platform5.play();
            animatePath[4].pause();
            animatePath[4].progress(0); 
        }
    })
    movePf5.to(characterSelector, {
        motionPath: {
                path: charMovePath[4],
                align: charMovePath[4],
                alignOrigin: [0.5, 0.5]
            },
            transformOrigin: "50% 50%"
        }
    );
    //platform content falls down after characer is moved
    let platform5 = gsap.from(".platform5", {
        y: -500, 
        autoAlpha: 0, 
        duration: 1,
        paused: true,
        onComplete: function() {
            showTextbox(textObject["F4"], transitionPhase.bind(null, "#stage4SoftwareDev", "./resources/images/rooms/stage4Graphics3D.svg", 2));
        }
    });

}

function animateGraphics3D(){
    let graphics3DTL = gsap.timeline();
    graphics3DTL.from("#stage4Graphics3DBackground", {
        autoAlpha: 0, 
        duration: 2
    })
    .from("#desk", {
        autoAlpha: 0,
        duration: 1.5,
        ease: "bounce.out"
    })
    .from("#gamingCorner", {
        autoAlpha: 0,
        y: -200,
        duration: 1,
    })
    .from("#starOnWall", {
        autoAlpha: 0,
        y: -200,
        duration: 1,
        onComplete: function() {
            gsap.to("#starOnWall", {        
                y: -10,
                duration: 5,
                repeat: -1,
                scale: "random(0.9, 1)",
                repeatRefresh: true,
                yoyo: true,
                ease: "sine.out"
            });
        }
    })
    .from("#heartOnWall", {
        autoAlpha: 0,
        y: -200,
        duration: 1,
        onComplete: function() {
            gsap.to("#heartOnWall", {
                y: -10,
                duration: 5,
                repeat: -1,
                scale: "random(0.6, 1)",
                repeatRefresh: true,
                yoyo: true,
                ease: "sine.out"
            });
        }
    })
    .from(".gamingFigure", {
        autoAlpha: 0,
        y: -100,
        stagger: .5,
        duration: 2,
        ease: "bounce.out",
        onComplete: function() {
            gsap.to(".gamingScreen", {
                y: -2,
                x: 2,
                duration: 3,
                stagger: 1,
                repeat: -1,
                scale: "random(0.7, 1)",
                repeatRefresh: true,
                yoyo: true,
                ease: "sine.out"
            });
        }
    })
    .from("#vr", {
        autoAlpha: 0, 
        duration: 2,
        ease: "bounce.out"
    })
    .from("#mobileGameDev", {
        autoAlpha: 0, 
        duration: 2
    })
    .from(".mobileDevItem", {
        autoAlpha: 0,
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        stagger: .5,
        duration: 4,
        ease: "back.out(1.7)"
    })
    .from(".mobileDevFigure", {
        autoAlpha: 0,
        y: -100,
        stagger: .5,
        duration: 2,
        ease: "bounce.out"
    })
    .from("#furnitureWireframe", {
        y: -500, 
        autoAlpha: 0, 
        duration: 2,
        ease: "bounce.out",
        onComplete: function() {
            showTextbox(textObject["F5"], transitionPhase.bind(null, "#stage4Graphics3D", "./resources/images/rooms/stage4AudioVisual.svg", 3));
        }
    });
}

function animateAudioVisual(){
    let audioVisualTL = gsap.timeline();
    audioVisualTL.from(["#studioAudioBackground", "#filmSetBackground", "#studioTVBackground"], {
        autoAlpha: 0, 
        duration: 2
    })
    .from(".avStudioItems", {
        autoAlpha: 0,
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        stagger: .5,
        duration: 4,
        ease: "back.out(1.7)"
    })
    .from(".filmsetItems", {
        autoAlpha: 0,
        stagger: .5,
        duration: 4,
        ease: "back.out(1.7)"
    })
    .from(".tvStationItems", {
        autoAlpha: 0,
        scaleX: "random(0.1, 0.5)",
        scaleY: "random(0.1, 0.5)",
        duration: 3,
        onComplete: function() {
            setTimeout(function() {
                gsap.to(characterSelector, {autoAlpha: 0, duration: 2});
                showTextbox(textObject["F6"], setMaincontent.bind(null, null, 5));
            }, 1500);
        }
    });
}

// showTextbox activates Textbox und Points to the next room. Transition needed

function transitionPhase(phase, nextPhase, roomNr) {
    gsap.to(phase, {
        autoAlpha: 0,
        duration: 2.5,
        onComplete: function (){ 
            loadRoom(nextPhase, roomNr)
        }
    });
}