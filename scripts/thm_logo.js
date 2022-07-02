/**
 * This file calculates and resizes the THM-Logo
 * if you have to make changes, be sure to pay close attention to the THM-Corporate Design: 
 * https://www.thm.de/site/thm-dokumente/kommunikation-und-marketing/744-cd-manual/download.html
 * 
 */
document.onload = resizeLogo();
window.onresize = resizeLogo;

/**
 * @name resizeLogo
 * @description (re-)calculates thm-logo size and position
 */
function resizeLogo() {
    //general logo sizing
    let logoContainer = document.querySelector("#thm-logo").parentNode;
    let logoBox = document.getElementById("thm-logo");

    let parentWidth = logoContainer.offsetWidth;
    let logoWidth = parentWidth * 0.6;
    let logoHeight = logoWidth / 3;
    let upperHeight = logoHeight * 0.69078;

    //single components sizing
    let numOfRows = 5.5;
    let squaresContainer = document.getElementById("squares-container");
    let squareRows = document.getElementsByClassName("thm-row");
    let squareCols = document.getElementsByClassName("thm-col");

    let squaresContainerWidth = logoWidth * 0.2478;
    let squareRowsHeight = upperHeight / numOfRows;

    logoBox.setAttribute("style", "width: "+logoWidth+"px; height: "+logoHeight+"px; margin: "+squareRowsHeight*4+"px;");
    squaresContainer.setAttribute("style", "width: "+squaresContainerWidth+"px; height: "+upperHeight+"px;");

    for(let i = 0; i < squareRows.length; i++) {
        if(i % 2 != 0) {
            squareRows[i].setAttribute("style", "height: "+squareRowsHeight/2+"px;")
        } else {
            squareRows[i].setAttribute("style", "height: "+squareRowsHeight+"px;")
        }
    }

    for (let i = 0; i < squareCols.length; i++) {
        if(i % 2 != 0) {
            squareCols[i].setAttribute("style", "height: "+squareRowsHeight+"px; width: "+squareRowsHeight/2+"px;");
        } else {
            squareCols[i].setAttribute("style", "height: "+squareRowsHeight+"px; width: "+squareRowsHeight+"px;");
        }
    }
    
    //lettering
    let letterContainer = document.getElementById("letters-container");
    let letterContainerWidth = logoWidth - squaresContainerWidth - 2;

    letterContainer.setAttribute("style", "height: "+upperHeight+"px; width: "+letterContainerWidth+"px;");

    let thmLetters = document.getElementsByClassName("thm-lettering");
    for(let item of thmLetters) {
        item.setAttribute("style", "margin-left: "+squareRowsHeight*1.25+"px;");
    }

    //subheader sizing
    let subheadingContainer = document.getElementById("subheading-container");
    subheadingContainer.setAttribute("style", "height: "+(logoHeight-upperHeight)+"px; padding-top: "+squareRowsHeight*1.25+"px;");
}