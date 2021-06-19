

class Styles_Object_Database {
    constructor() {
        this.allowLinearGradient = true;
        this.backgroundColor;
        this.darkMode = false;
        this.lightMode = false;
    }

    /**
     * 
     * @param {boolean} enable 
     */

    async enable_Dark_Mode(enable) {
        
        if (enable) {
            this.backgroundColor = '#121212'
            this.allowLinearGradient = false
            this.darkMode = enable
        } 
        else {
            this.darkMode = enable;
        }
    }

    async enableLightmode(enable) {
        if (enable) {
            this.lightMode = enable
        }
        else {
            this.lightMode = enable
        }
    }

}

class Fonts extends Styles_Object_Database {
    constructor () {
        this.fontMultiplier = 1;
        this.fontFamily;
        this.fontWeight;
        this.fontColor;
    }

    /**
     * 
     * @param {string} fontType 
     */

    change_fontFamily(fontType) {
        this.fontFamily = fontType;
    }

    /**
     * 
     * @param {int} weight 
     */

    change_fontWeight(weight) {
        this.fontWeight = weight;
    }

    /**
     * 
     * @param {string} color 
     */

    change_fontColor(color) {
        this.fontColor = color;
    }

    /**
     * 
     * all fonts are standardized throughout app, font multiplier is applied as a factor to slightly enlarge font in increments
     * 
     * @param {int} int 
     */

    change_fontMultiplier(int) {
        this.fontMultiplier = int;
    }
}

class Background extends Styles_Object_Database {
    constructor (backgroundColor) {
        super(backgroundColor);
    }

    /**
     * 
     * @param {string} color 
     */

    change_backgroundColor(color) {
        this.backgroundColor = color;
    }
}

class Linear_Gradient extends Styles_Object_Database {
    constructor (darkMode, lightMode) {
        super(darkMode, lightMode);
        this.color_1 = 'cadetblue';
        this.color_2 = 'white';
    }

    /**
     * 
     * @param {string} color1 
     * @param {string} color2 
     */

    adjust_Linear_Gradient(color1, color2) {
        this.color_1 = color1;
        this.color_2 = color2; 
    }
}

class Icons extends Styles_Object_Database {
    constructor (darkMode, lightMode) {
        super(darkMode, lightMode);
        this.iconColor = 'teal'
        this.iconTextColor = 'teal'
    }

    change_iconColor(color) {
        this.iconColor = color;
        this.iconTextColor = color;
    }
}


export {Styles_Object_Database, Fonts, Background, Linear_Gradient, Icons}