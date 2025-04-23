// Singleton

class Parametres {
    private static instance: Parametres;
    private static readonly 
    private difficulty: number = 0;
    private static readonly maxDifficulty: number = 3;
    private static readonly difficultyError: {[key: string]: string} = {
        'en': `Difficulty must be between 0 and ${Parametres.maxDifficulty}`,
        'fr': `La difficulté doit etre comprise entre 0 et ${Parametres.maxDifficulty}`,
        'es': `La dificultad debe estar entre 0 y ${Parametres.maxDifficulty}`,
        'it': `La difficolta deve essere compresa tra 0 e ${Parametres.maxDifficulty}`,
        'de': `Die Schwierigkeit muss zwischen 0 und ${Parametres.maxDifficulty} liegen`,
        'zh': `难度必须在0到${Parametres.maxDifficulty}之间`
    }
    private language: string = 'en';
    private static readonly languages: string[] = ['en', 'fr', 'es', 'it', 'de', 'zh'];
    private static readonly languageError: {[key: string]: string} = {
        'en': `Language must be one of ${Parametres.languages}`,
        'fr': `La langue doit etre une des ${Parametres.languages}`,
        'es': `El idioma debe ser uno de ${Parametres.languages}`,
        'it': `La lingua deve essere uno di ${Parametres.languages}`,
        'de': `Die Sprache muss einer von ${Parametres.languages} sein`,
        'zh': `语言必须是${Parametres.languages}`
    }
    private static readonly maxVolume: number = 100;
    private static readonly volumeError: {[key: string]: string} = {
        'en': `Volume must be between 0 and ${Parametres.maxVolume}`,
        'fr': `Le volume doit etre compris entre 0 et ${Parametres.maxVolume}`,
        'es': `El volumen debe estar entre 0 y ${Parametres.maxVolume}`,
        'it': `Il volume deve essere compreso tra 0 e ${Parametres.maxVolume}`,
        'de': `Die Lautstärke muss zwischen 0 und ${Parametres.maxVolume} liegen`,
        'zh': `音量必须在0到${Parametres.maxVolume}之间`
    }
    private musicVolume: number = 50;
    private effectsVolume: number = 50;
    private resolution: number[] = [1920, 1080];
    private static readonly resolutionLengthError: {[key: string]: string} = {
        'en': `Resolution must be an array of length 2`,
        'fr': `La resolution doit etre un tableau de longueur 2`,
        'es': `La resolucion debe ser un array de longitud 2`,
        'it': `La risoluzione deve essere un array di lunghezza 2`,
        'de': `Die Aufloesung muss ein Array mit einer Lengde von 2 sein`,
        'zh': `分辨率必须是长度为2的数组`
    }
    private static readonly negativeResolutionError: {[key: string]: string} = {
        'en': `Resolution must be positive`,
        'fr': `La resolution doit etre positive`,
        'es': `La resolucion debe ser positiva`,
        'it': `La risoluzione deve essere positiva`,
        'de': `Die Aufloesung muss positiv sein`,
        'zh': `分辨率必须是正的`
    }
    private graphicsQuality: number = 0;
    private static readonly maxGraphicsQuality: number = 3;
    private static readonly graphicsQualityError: {[key: string]: string} = {
        'en': `Graphics quality must be between 0 and ${Parametres.maxGraphicsQuality}`,
        'fr': `La qualité graphique doit etre comprise entre 0 et ${Parametres.maxGraphicsQuality}`,
        'es': `La calidad grafica debe estar entre 0 y ${Parametres.maxGraphicsQuality}`,
        'it': `La qualità grafica deve essere compresa tra 0 e ${Parametres.maxGraphicsQuality}`,
        'de': `Die Grafikqualität muss zwischen 0 und ${Parametres.maxGraphicsQuality} liegen`,
        'zh': `图形质量必须在0到${Parametres.maxGraphicsQuality}之间`
    }

    private constructor() {}

    public static getInstance(): Parametres {
        if (!Parametres.instance) {
            Parametres.instance = new Parametres();
        }
        return Parametres.instance;
    }

    public getDifficulty(): number { return this.difficulty; }
    public setDifficulty(difficulty: number): void { 
        if (difficulty < 0 || difficulty > Parametres.maxDifficulty) throw new Error(Parametres.difficultyError[this.language]);
        this.difficulty = difficulty; 
    }

    public getLanguage(): string { return this.language; }
    public setLanguage(language: string): void { 
        if (!Parametres.languages.includes(language)) throw new Error(Parametres.languageError[this.language]);
        this.language = language; 
    }

    public getMusicVolume(): number { return this.musicVolume; }
    public setMusicVolume(volume: number): void { 
        if (volume < 0 || volume > Parametres.maxVolume) throw new Error(Parametres.volumeError[this.language]);
        this.musicVolume = volume;
    }

    public getEffectsVolume(): number { return this.effectsVolume; }
    public setEffectsVolume(volume: number): void { 
        if (volume < 0 || volume > Parametres.maxVolume) throw new Error(Parametres.volumeError[this.language]);
        this.effectsVolume = volume;
    }

    public getResolution(): number[] { return this.resolution; }
    public setResolution(resolution: number[]): void { 
        if (resolution.length !== 2) throw new Error(Parametres.resolutionLengthError[this.language]);
        if (resolution[0] < 0 || resolution[1] < 0) throw new Error(Parametres.negativeResolutionError[this.language]);
        this.resolution = resolution; 
    }

    public getGraphicsQuality(): number { return this.graphicsQuality; }
    public setGraphicsQuality(quality: number): void { 
        if (quality < 0 || quality > Parametres.maxGraphicsQuality) throw new Error(Parametres.graphicsQualityError[this.language]);
        this.graphicsQuality = quality; 
    }
}