// Adaptateur

interface ControlerActions {
    sauter(): void;
    attaquer(): void;
    interagir(): void;
}

class Clavier {
    public onSpace() {}
    public onLeftClick() {}
    public onRightClick() {}
}

class ClavierAdapter implements ControlerActions {
    private clavier: Clavier;
    constructor(clavier: Clavier) {
        this.clavier = clavier;
    }

    public sauter() { this.clavier.onSpace(); }
    public attaquer() { this.clavier.onLeftClick(); }
    public interagir() { this.clavier.onRightClick(); }
}

class ManetteXbox {
    public onA() {}
    public onB() {}
    public onX() {}
}

class ManetteXboxAdapter implements ControlerActions {
    private manette: ManetteXbox;
    constructor(manette: ManetteXbox) {
        this.manette = manette;
    }
    public sauter() { this.manette.onA(); }
    public attaquer() { this.manette.onB(); }
    public interagir() { this.manette.onX(); }
}

class ManettePS5 {
    public onCross() {}
    public onCircle() {}
    public onTriangle() {}
}

class ManettePS5Adapter implements ControlerActions {
    private manette: ManettePS5;
    constructor(manette: ManettePS5) {
        this.manette = manette;
    }
    public sauter() { this.manette.onCross(); }
    public attaquer() { this.manette.onCircle(); }
    public interagir() { this.manette.onTriangle(); }
}
