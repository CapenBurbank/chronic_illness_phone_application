

class Styles_Object_Database {
    constructor() {
        this.darkMode = false;
        this.lightMode = false;
    }

    /**
     * 
     * @param {boolean} enable 
     */

    async enable_Dark_Mode(enable) {
        this.darkMode = enable;
        if (this.lightMode) {
            this.lightMode = !enable
        }
    }

    /**
     * 
     * @param {boolean} enable 
     */

    async enableLightmode(enable) {
        this.lightMode = enable;
        if (this.darkMode) {
            this.darkMode = !enable;
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
        this.standard_color_1 = 'cadetblue';
        this.standard_color_2 = 'white';
        this.main_color_1 = this.standard_color_1;
        this.main_color_2 = this.standard_color_2;
        this.preference_color_1;
        this.preference_color_2;
        this.darkModeColorScheme = '#121212';
        this.lightModeColorScheme = '#FFFFFF';
    }

    /**
     * 
     * @param {string} color1 
     * @param {string} color2 
     */

    adjust_Linear_Gradient(color1, color2) {
        this.main_color_1 = color1;
        this.main_color_2 = color2; 
    }
}

class Icons extends Styles_Object_Database {
    constructor (darkMode, lightMode) {
        super(darkMode, lightMode);
        this.iconStandardColor = 'teal';
        this.iconColor = this.iconStandardColor;
        this.iconTextColor = this.iconStandardColor;
        this.iconBackgroundColorStandard = 'rgba(255,255,255, 0.19)';
        this.iconBackgroundColorLightMode = 'rgba(128,128,128, 0.19)';
        this.darkModeColorScheme = 'rgba(255,255,255, 0.8)';
        this.lightModeColorScheme = 'black';
        this.currentBackgroundColorForIcon = this.iconBackgroundColorStandard;
    }

    change_iconColor(color) {
        this.iconColor = color;
        this.iconTextColor = color;

    
        if (color == this.lightModeColorScheme) {
            this.currentBackgroundColorForIcon = this.iconBackgroundColorLightMode;
        }
        else if (color != this.lightModeColorScheme) {
            this.currentBackgroundColorForIcon = this.iconBackgroundColorStandard;
        }
    }
}


export {Styles_Object_Database, Fonts, Background, Linear_Gradient, Icons}