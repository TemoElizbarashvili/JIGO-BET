import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

  
// 0-6-6 // 1-5-3 // 2-4-1 // 3-7-0 // 4-2-2 // 5-1-3 // 6-0-8 // 7-3-5 // 8-8-7
@Component({
  selector: 'app-cocoa-rush',
  templateUrl: './cocoa-rush.component.html',
  styleUrls: ['./cocoa-rush.component.scss']
})
export class CocoaRushComponent implements OnInit, OnDestroy{
  iconWidth = 200;
  iconHeight = 200;
  numIcons = 9;
  timePerIcon = 100;
  indexes = [[1,1,1],
             [0,0,0],
             [8,8,8]];
  isPopUpOpen: boolean = false;
  iconMap1 = ['cola', 'cocoa', 'hotdog', 'ramen', 'shawarma', 'cake', 'ice-cream', 'burger', 'chips'];
  iconMap2 = ['ice-cream', 'cake', 'shawarma', 'burger', 'hot-dog', 'cocoa', 'cola', 'ramen', 'chips'];
  iconMap3 = ['ramen', 'hot-dog', 'shawarma', 'cocoa', 'cake', 'burger', 'cola', 'chips', 'ice-cream'];
  audioElement = document.querySelector('#audio'); 
  lines: number = 1;
  rolling: boolean = false;
  auto: boolean = false;
  isMuted: boolean = false;
  audio: HTMLAudioElement;
  winAudio: HTMLAudioElement;
  spinAudio: HTMLAudioElement;
  hasWined: boolean = false;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let footer = <HTMLElement>document.querySelector('footer');
    let navigation = <HTMLElement>document.querySelector('nav');
    let mainContainer = <HTMLElement>document.querySelector('.main-content');
    let gameContianer = <HTMLElement>document.querySelector('.game-container');
    this.audio = <HTMLAudioElement>document.querySelector('#audio');
    this.winAudio = <HTMLAudioElement>document.querySelector('#win-audio');
    this.spinAudio = <HTMLAudioElement>document.querySelector('#spin-audio');

    let viewportHeight = window.innerHeight;

    footer.style.display = 'none';
    navigation.style.display = 'none';
    mainContainer.style.marginTop = '0';
    gameContianer.style.height = `${viewportHeight}px`;
    this.audio.play();
  }

  animate(reel, offset = 0) :  Promise<number> {
    this.spinAudio.play();
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
    this.rolling = true;

    const REELSLIST = document.querySelectorAll('.reel');

    // const LIST = [...[REELSLIST]] ;
    
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
       
      if (this.chekcWinConditions()) {
        this.winAudio.play();
        this.hasWined = true;
        console.log('Jackpot!');
        let prize = this.lines * 8;
        if (this.lines == 5) {
          prize = this.lines * 10;
        }
        this.userService.balance += prize;
        
        setTimeout(() => {
          this.hasWined = false;
        }, 4000);
    
      }
      this.rolling = false;   
      this.userService.setBalance();
    });
  }


  printResult() {
    this.indexes[0].forEach((element, i) => {
      if (i == 0) 
        console.log(this.iconMap1[element]);
      if (i == 1)
        console.log(this.iconMap2[element]);
      if (i == 2)
        console.log(this.iconMap3[element]);
    });
    this.indexes[1].forEach((element, i) => {
      if (i == 0) 
        console.log(this.iconMap1[element]);
      if (i == 1)
        console.log(this.iconMap2[element]);
      if (i == 2)
        console.log(this.iconMap3[element]);
    });
    this.indexes[2].forEach((element, i) => {
      if (i == 0) 
        console.log(this.iconMap1[element]);
      if (i == 1)
        console.log(this.iconMap2[element]);
      if (i == 2)
        console.log(this.iconMap3[element]);
    });
  }


  onRoll() {
    if (this.userService.balance < this.lines){
      alert('You do not have enough balance!');
    } else {
      this.userService.balance -= this.lines;
      if(!this.rolling && !this.hasWined)
        this.rollAll();
    }
  }

  onLineClick(line: number) {
    this.lines = line;
  }

  chekcWinConditions() : boolean { 
    if (this.lines == 1 || this.lines == 3 || this.lines == 5) {
      if (this.iconMap1[this.indexes[1][0]] == this.iconMap2[this.indexes[1][1]] && this.iconMap1[this.indexes[1][0]] == this.iconMap3[this.indexes[1][2]])
        return true;
    }

    if (this.lines == 3 || this.lines == 5) {
      if (this.iconMap1[this.indexes[0][0]] == this.iconMap2[this.indexes[0][1]] && this.iconMap1[this.indexes[0][0]] == this.iconMap3[this.indexes[0][2]])
        return true;
      if (this.iconMap1[this.indexes[2][0]] == this.iconMap2[this.indexes[2][1]] && this.iconMap1[this.indexes[2][0]] == this.iconMap3[this.indexes[2][2]])
        return true;
    }

    if (this.lines == 5) {
      if (this.iconMap1[this.indexes[0][0]] == this.iconMap2[this.indexes[1][1]] && this.iconMap1[this.indexes[0][0]] == this.iconMap3[this.indexes[2][2]])
        return true;
        if (this.iconMap3[this.indexes[0][2]] == this.iconMap2[this.indexes[1][1]] && this.iconMap3[this.indexes[0][2]] == this.iconMap1[this.indexes[2][0]])
        return true;
    }
    return false;
  }

  onAutoRoll() {
    this.auto = !this.auto;
    if (this.auto) { 
     setInterval(() => {
      if (this.auto && !this.rolling && !this.hasWined)
        this.onRoll();
     }, 5000);
     
    }
  }

  onMute() {
    this.isMuted = !this.isMuted;

    this.audio.muted = this.isMuted;
  }

  get balance() {
    return this.userService.balance;
  }

  get prize() {
    let prize = this.lines * 8;
    if (this.lines == 5) {
      prize = this.lines * 10;
    }
    return prize;
  }

  ngOnDestroy(): void {
    let footer = <HTMLElement>document.querySelector('footer');
    let navigation = <HTMLElement>document.querySelector('nav');
    let mainContainer = <HTMLElement>document.querySelector('.main-content');


    footer.style.display = 'block';
    navigation.style.display = 'flex';
    mainContainer.style.marginTop = '-70px';

    this.userService.setBalance();

    console.log('Destroyed!');
  }

}
