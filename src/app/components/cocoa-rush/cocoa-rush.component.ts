import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cocoa-rush',
  templateUrl: './cocoa-rush.component.html',
  styleUrls: ['./cocoa-rush.component.scss']
})
export class CocoaRushComponent implements OnInit{
  iconWidth = 200;
  iconHeight = 200;
  numIcons = 9;
  timePerIcon = 100;
  indexes = [[1,1,1], [0,0,0], [8,8,8]];
  iconMap = ['cola', 'cocoa', 'hotdog', 'ramen', 'shawarma', 'cake', 'ice-cream', 'burger', 'chips'];

  ngOnInit(): void {
    // this.rollAll();
    let footer = <HTMLElement>document.querySelector('footer');
    let navigation = <HTMLElement>document.querySelector('nav');
    let mainContainer = <HTMLElement>document.querySelector('.main-content');
    let gameContianer = <HTMLElement>document.querySelector('.game-container');

    let viewportHeight = window.innerHeight;

    // console.log(viewportHeight);
    footer.style.display = 'none';
    navigation.style.display = 'none';
    mainContainer.style.backgroundImage = 'url(../../../assets/images/cocoa-back.png)';
    mainContainer.style.backgroundSize = 'cover';
    mainContainer.style.backgroundRepeat = 'no-repeat';
    mainContainer.style.marginTop = '0';
    mainContainer.style.backgroundPosition = 'center';
    gameContianer.style.height = `${viewportHeight}px`;
    
    // setInterval(() => this.rollAll(), 5000);
  }

  animate(reel, offset = 0) :  Promise<number> {
    const DELTA = (offset + 2) * this.numIcons + Math.round(Math.random() * this.numIcons);
    const STYLE = getComputedStyle(reel);
    const BACKGROUNDPOSITIONY = parseFloat(STYLE["background-position-y"]);
    let targetBackgroundPositionY = BACKGROUNDPOSITIONY + DELTA * this.iconHeight;
    let normalTargetBackgroundPositionY = targetBackgroundPositionY%(this.numIcons * this.iconHeight);


    return new Promise((resolve, reject) => {
      reel.style.transition = `background-position-y ${8 + DELTA * this.timePerIcon}ms cubic-bezier(.45, .05,.58,1.09)`;
      reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;
  
      setTimeout(() => {
        reel.style.transition = `none`;
        reel.style.backgroundPositionY = `${normalTargetBackgroundPositionY}px`;
        resolve(DELTA%this.numIcons);
      }, 8 + DELTA * this.timePerIcon )
    });


  };

  rollAll() {
    const REELSLIST = document.querySelectorAll('.reel');

    const LIST = [...[REELSLIST]] ;
    
    let reels: Element[] = [];

    for (let i = 0; i < REELSLIST.length; i++) {
      reels.push(REELSLIST[i]);
    }

    Promise.all(reels.map((reel, i) => this.animate(reel, i))).then((deltas) => {
      deltas.forEach((delta,index) => {
        let middleIcon = this.indexes[1][index] + (delta%this.numIcons);
        let upperIcon = middleIcon == 8 ? 0 : middleIcon + 1;
        let lastIcon = middleIcon == 0 ? 8 : middleIcon - 1;
        this.indexes[0][index] = upperIcon%this.numIcons;
        this.indexes[1][index] = middleIcon%this.numIcons;
        this.indexes[2][index] = lastIcon%this.numIcons;
      });
      
      console.log(this.indexes.map(i => i.map(i => this.iconMap[i])));
      // console.log(this.indexes);

      
      // if (this.indexes[0] == this.indexes[1] || (this.indexes[0] == this.indexes[1] && this.indexes[0] == this.indexes[2]))
      // {
      //   console.log('YOU WIN');  
      // }

      
    });

    

  }


  onRoll() {
    this.rollAll();
  }

}
