// html elements
const combinationTitle = getElem("#main-picked-title");
const pickedColorDiv = getElem("#picked-color-div");
const pickedColorBox = getElem("#picked-color-box");
const combiPaletteDiv = getElem("#combi-color-div");
const combiTitle = getElem("#combination-title");////////////////
const combinationColorTitle = getElem("#combi-color-title");
const combinationColorCode = getElem("#combi-color-code");
const combiColorBox = getElem("#combi-color-box");

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
 * make #combination-title to `Cloth Color Combination: ${colors} `
 * @param elem - \#combination-title
 * @param {Array<string>} colors - List of Colors
 */
const makeCombiTitle = (elem, colors) => {
    elem.innerText += ` ${colors} `;
}

/**
 * make #combi-color-title to `${color} ${colorCode}`
 * @param elem - \#combi-color-title
 * @param {Array<string>} colors - List of Colors

 */
const makeCombinaionColorTitle=(elem, colors)=>{       /////추가
    elem.innerText += `${colors}` ;
}

/**
 * make #combi-color-title to `${color} ${colorCode}`
 * @param elem - \#combi-color-title
 * @param {Array<string>} colorCode - List of Color Code
 */

const makeCombinaionColorCode=(elem, combiColorCode)=>{    //추가
    elem.innerText += `${combiColorCode}`;
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

/**
 * make \#picked-color-box to colored
 * @param {HTMLElement} elem
 * @param {string} colorCode
 */   

const makeCombinaionColorBoxToColored = (elem, colorCode) => {
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
    
    const colors = params.get("colors");
    const colorCode = params.get("colorCode");
    makeCombiTitle(combiTitle,colors)
    makeCombinaionColorTitle(combinationColorTitle, colors);
    makeCombinaionColorCode(combinationColorCode, colorCode);
    

    if (isValidParam(color, loc)) {
        try {
            const colorData = await fetchColorCombi(color, loc);
            const combinationList = colorData.color;       // color combinations
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
            //const color = params.get("color");
            
            

            /**
             * get color code from color name
             * @param {string} colorName
             * @returns {string}
             */
             
            
            const getcombiColorCode = (colorName) => {
                return combinationList.find(colorCodeObj => colorCodeObj.name.toUpperCase() === colorName.toUpperCase()).code;
            }

            const combiColorCode = getcombiColorCode(color);
            makeCombinaionColorBoxToColored(combiColorBox, combiColorCode);


        } catch (e) {
            console.log(e);
        }
    }
})();
