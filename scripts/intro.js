/**
* This file provides animations for our intro.
*/
gsap.registerPlugin(MotionPathPlugin);

/* Animation */
// TODO: create "logo"-sequence as a function from all the single tweens
//Logo-Squares
var thm_squares = document.getElementsByClassName("thm-square");
let animateSquares = gsap.to(thm_squares, {
keyframes: {
    "0%": { yPercent: -1000, xPercent: -300, rotate: 0, autoAlpha: 1, zIndex: 100},
    "16%": { scaleY: 1, scaleX: 1, ease: "expo.out"},
    "20%": { yPercent: 0, xPercent: 0, scaleY: .1, scaleX: .1},
    "60%": { yPercent: -55, scaleY: 1, scaleX: 1, rotate: 360},
    "100%": { yPercent: 0, ease: "bounce.out"},
    easeEach: "sine.out"
    }, 
transformOrigin: "left",
stagger: .2,
duration: 3.5
});
//Letters THM
var thm_lettering = document.getElementsByClassName("thm-lettering");
let animateLettering = gsap.from(thm_lettering, {
autoAlpha: 0,
scaleX: 0,
transformOrigin: "left",
stagger: .8,
duration: 1,
ease: "elastic.out(1, 0.3)"
});

//Subheading: Technische Hochschule Mittelhessen
var subheadingImage = document.getElementById("thm-subheading");
let animateSubheading = gsap.from(subheadingImage, {
scaleX: 0, 
transformOrigin: "left",
delay: .5
});
//"Pulsing" logo
let interactiveLogo = gsap.to("#thm-logo", {
keyframes: {
    "33%": { scaleX: 1.1, scaleY: 1.1, ease: "none"},
    "100%": { scaleX: 1, scaleY: 1, ease: "power4.out"}
},
duration: .6,
repeat: 8,
repeatDelay: 5
});
//animated icons
var mediaIcons = $(".media_item");
let animateIcons = gsap.from(mediaIcons, {
    motionPath:{
      path:[ {x: 150, y: 40, scale: 1},  //rechts unten
        {x: -150, y: 40, scale: .5},      //links unten
        {x: -200, y: -300, scale: .3},     //links oben
        {x: 2500, y: 0, scale: 0}],   //rechts mitte
      curviness: 2,
      alignOrigin: [0.5, 0.5]
    },
  duration: 5,
  stagger: .2
});
let foldIcons = gsap.to(mediaIcons, {
    rotationX: "-90deg",
    transformPerspective:  400,
    force3D: true,
    transformOrigin: "top center",
    transformStyle:"preserve-3d",
    autoAlpha: 0,
    duration: 1
});

//animated lettering_mib h1
var letteringMib = $("#lettering_mib");
let animateMib = gsap.fromTo(lettering_mib, {
    rotationX: "-90deg",
    transformPerspective:  400
}, {
    rotationX: "0deg",
    force3D: true,
    transformOrigin: "center top",
    transformStyle:"preserve-3d",
    duration: 1
});

//animated hint
let hint = gsap.fromTo("#hint", {
    autoAlpha: 0
}, {
    autoAlpha: 1,
    duration: 1
});


//Timeline
var tl;

function getTimeline() {
tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 6
});
tl.add(animateSquares);
tl.add(animateLettering, 4.5);
tl.add(animateSubheading);
tl.add(animateIcons, 5);
tl.add(foldIcons, 12);
tl.add(interactiveLogo, 14);
tl.add(animateMib, 13);
tl.add(hint, 20);

return tl;
}

function startAtCheckpoint() {
var progress = tl.progress(); //record the progress so that we can match it with the new tween (jump to the same spot)
tl.kill(); //rewind and kill the original tween.
getTimeline().progress(progress); //create a new tween based on the new size, and jump to the same progress value.
}

getTimeline();
window.addEventListener("resize", startAtCheckpoint);
