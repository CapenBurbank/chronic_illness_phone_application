

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

    async enable_Light_mode(enable) {
        this.lightMode = enable;
        if (this.darkMode) {
            this.darkMode = !enable;
        }
    }

}

class Fonts extends Styles_Object_Database {
    constructor (darkMode, lightMode) {
        super(darkMode, lightMode)
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
     * 
     */

    increment_fontMultiplier() {
        if (this.fontMultiplier == 1) {
            this.fontMultiplier = 2;
        } else if (this.fontMultiplier == 2) {
            this.fontMultiplier = 3;
        } else if (this.fontMultiplier == 3) {
            this.fontMultiplier = 1;
        } 
    }
}

class Background extends Styles_Object_Database {
    constructor (darkMode, lightMode) {
        super(darkMode, lightMode);
        this.backgroundColor;
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
        this.inactiveTabTextLightMode = 'rgba(0,0,0, 1)'
        this.inactiveTabTextDarkMode = 'rgba(255,255,255, 1)';
        this.inactiveTabText = this.iconTextColor;
        this.iconBackgroundColorStandard = 'rgba(255,255,255, 0.19)';
        this.iconBackgroundColorLightMode = 'rgba(128,128,128, 0.19)';
        this.darkModeColorScheme = 'rgba(255,255,255, 0.8)';
        this.lightModeColorScheme = 'black';
        this.tabDarkModeBackground = 'rgba(18,18,18, 0.7)';
        this.currentBackgroundColorForIcon = this.iconBackgroundColorStandard;
        this.currentTabBackgroundColor = this.iconBackgroundColorStandard;
    }

    change_iconColor(color) {
        this.iconColor = color;
        this.iconTextColor = color;

    
        if (color == this.lightModeColorScheme) {
            this.currentBackgroundColorForIcon = this.iconBackgroundColorLightMode;
            this.inactiveTabText = this.inactiveTabTextLightMode;
        }
        else if (color != this.lightModeColorScheme) {
            this.currentBackgroundColorForIcon = this.iconBackgroundColorStandard;
            this.inactiveTabText = this.iconTextColor;
        }

        if (color == this.darkModeColorScheme) {
            this.tabBackgroundColor = this.tabDarkModeBackground;
            this.inactiveTabText = this.inactiveTabTextDarkMode;
        } 
        else if (color != this.darkModeColorScheme) {
            this.tabBackgroundColor = this.iconBackgroundColorStandard;
            this.inactiveTabText = this.iconTextColor;
        }
    }
}


export {Styles_Object_Database, Fonts, Background, Linear_Gradient, Icons}