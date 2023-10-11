import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class UIService {
    footer 
    navigation;
    mainContainer;
    gameContianer;

    constructor() {
        this.footer = <HTMLElement>document.querySelector('footer');
        this.navigation = <HTMLElement>document.querySelector('nav');
        this.mainContainer = <HTMLElement>document.querySelector('.main-content');
        this.gameContianer = <HTMLElement>document.querySelector('.game-container');
    }

    removeUi() {
        let viewportHeight = window.innerHeight;

        this.footer.style.display = 'none';
        this.navigation.style.display = 'none';
        this.mainContainer.style.marginTop = '0';
        this.gameContianer.style.height = `${viewportHeight}px`;
    }

    setBackUI() { 
        this.footer.style.display = 'block';
        this.navigation.style.display = 'flex';
        this.mainContainer.style.marginTop = '-70px';
    }
   
}