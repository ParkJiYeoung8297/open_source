// html elements
const combinationTitle = getElem("#main-picked-title");
const pickedColorDiv = getElem("#picked-color-div");
const pickedColorBox = getElem("#picked-color-box");
const combiPaletteDiv = getElem("#combi-color-div");
const combicolorPalette = getElem("#combi-color-palette-row-div");

/**
 * make #main-picked-title to `Your Color: ${color} on ${loc}`
 * @param elem - \#main-picked-title
 * @param {string} color - picked color
 * @param {string} loc - picked loc
 */
const makeCombinationTitle = (elem, color, loc) => {
    elem.innerText += ` ${color} on ${loc}`;
}

/**
 * make #combi-color-div to `Cloth Color Combination : ${color}, ${color},${color}`
 * @param elem - \#combi-color-div
 * @param {string} color - 
 * @param {string} colorCode
 */
 const makecombiPaletteDiv = (elem, color,colorCode) => {
    elem.innerText += ` ${color}  (${colorCode}) `;
}



/**
 * get current url
 * @returns {string}
 */
const getCurrentUrl = () => {
    return window.location.href;
}

/**
 * extract querystring from url
 * @param {string} url
 * @returns {URLSearchParams}
 */
const extractQuery = (url) => {
    return new URL(url).searchParams;
}

/**
 * check fetchColorCombi params are valid
 * @param {string} color
 * @param {string} loc
 * @returns {boolean}
 */
const isValidParam = (color, loc) => {
    return !(typeof color === "undefined" || !isCorrectLoc(loc));
}

/**
 * make \#picked-color-box to colored
 * @param {HTMLElement} elem
 * @param {string} colorCode
 */
const makePickedColorBoxToColored = (elem, colorCode) => {
    if (colorCode.toLowerCase() === "ffffff") {
        elem.style.borderStyle = "solid";
        elem.style.borderWidth = "1px";
        elem.style.borderColor = "#000000";
    } else {
        elem.style.backgroundColor = `#${colorCode}`;
    }
}

// Run Async Code Here
(async () => {
    const params = extractQuery(getCurrentUrl());
    const color = params.get("color");      // picked color name
    const loc = params.get("loc");          // picked loc ("TOP" or "BOTTOM")

    makeCombinationTitle(combinationTitle, color, loc);
    
    

    if (isValidParam(color, loc)) {
        try {
            const colorData = await fetchColorCombi(color, loc);
            const combinationList = colorData.colors;       // color combinations
            const colorCodeList = colorData.colorCode       // color code

            /**
             * get color code from color name
             * @param {string} colorName
             * @returns {string}
             */
            const getColorCode = (colorName) => {
                return colorCodeList.find(colorCodeObj => colorCodeObj.name.toUpperCase() === colorName.toUpperCase()).code;
            }

            const pickedColorCode = getColorCode(color);
            makePickedColorBoxToColored(pickedColorBox, pickedColorCode);

            // ------------- ADD YOUR CODE HERE --------------
            // TODO: MAKE COMBINATION COLOR LIST FROM combinationList
            console.log(combinationList);

                const targetColor = combinationList[0];
                const targetColorCode = getColorCode(targetColor);
                // targetColorCode == "ff0000"
                makecombiPaletteDiv(combiPaletteDiv,targetColor,targetColorCode)
                const targetColorr = combinationList[1];
                const targetColorrCode = getColorCode(targetColorr);
                makecombiPaletteDiv(combiPaletteDiv,targetColorr,targetColorrCode)

                /**
                 * create color palette HTML element
                 * @param {number} idx - index for element id
                 * @param {string} targetColor - color name
                 * @param {string} targetcolorCode - hex color code
                 * @returns {HTMLDivElement}
                 */
                const createColorPaletteElem = (idx,targetColor, targetcolorCode) => {

                    const box = createSquareDiv(targetcolorCode);

                    const text = document.createElement("p");
                    text.innerText = targetColor;

                    const boxWrap = document.createElement("div");
                    boxWrap.style.width = "100%";
                    boxWrap.appendChild(box);

                    const setWrap = document.createElement("div");
                    setWrap.className = "col-6 col-xs-4 col-md-3 col-lg-2 text-center";
                    setWrap.id = `combi-color-palette-color-set-wrap-${idx}`;
                    setWrap.appendChild(boxWrap)
                    setWrap.appendChild(text);

                    // setWrap.onclick = () => {
                    //     colorButtonOnClick(colorName, loc);
                    // }

                    return setWrap;
                }
                
                
                /**
                 * append color palette elements
                 * @param {Array<{string}>} combinationList - color combination list
                 * @param {Array<{name: string, code: string}>} colorCodeList - color code list
                 */
                const appendColorPalettes = (combinationList, colorCodeList) => {
                    const colorNameSet = new Set();
                    combinationList.map(color => {
                        colorNameSet.add(color[targetLoc]);
                    });

                    Array.from(colorNameSet.values()).map((targetColor, idx) => {
                        const targetcolorCode = colorCodeList.find(codeObj => codeObj.name.toUpperCase() === targetColor.toUpperCase());
                        const elem = createColorPaletteElem(idx, targetColor, targetcolorCode.code);
                        combicolorPalette.appendChild(elem);
                    });
                }



        } catch (e) {
            console.log(e);
        }
    }
})();
