import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dice-game',
  templateUrl: './dice-game.component.html',
  styleUrls: ['./dice-game.component.scss']
})
export class DiceGameComponent implements OnInit, OnDestroy {
  diceOne;
  diceTwo;
  isPopUpOpen: boolean = false;
  isMuted: boolean = false;
  isRolling: boolean = false;
  hasWinned: boolean = false;
  diceRollAudio: HTMLAudioElement;
  winAudio: HTMLAudioElement;
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let footer = <HTMLElement>document.querySelector('footer');
    let navigation = <HTMLElement>document.querySelector('nav');
    let mainContainer = <HTMLElement>document.querySelector('.main-content');
    let gameContianer = <HTMLElement>document.querySelector('.game-container');
    this.diceOne = document.getElementById("dice1");
    this.diceTwo = document.getElementById("dice2");
    this.diceRollAudio = document.querySelector('#roll-dice')
    this.winAudio = document.querySelector('#game-win')

    let viewportHeight = window.innerHeight;

    footer.style.display = 'none';
    navigation.style.display = 'none';
    mainContainer.style.marginTop = '0';
    gameContianer.style.height = `${viewportHeight}px`;

  }


  rollDice() {
    if (!this.isMuted)
      this.diceRollAudio.play();

    this.isRolling = true;
    this.userService.balance -= 10;

    let diceOne = Math.floor((Math.random() * 6) + 1);
    let diceTwo= Math.floor((Math.random() * 6) + 1);

    for (let i=1; i<=6; i++) {
      this.diceOne.classList.remove('show-' + i);
      if (diceOne === i) {
        this.diceOne.classList.add('show-' + i)
      }
    }

    for (let i=1; i<=6; i++) {
      this.diceTwo.classList.remove('show-' + i);
      if (diceTwo === i) {
        this.diceTwo.classList.add('show-' + i)
      }
    }

    if (this.winCheck(diceOne, diceTwo))
    {
      this.hasWinned = true;
      this.userService.balance += 100;
      setTimeout(() => {
        if (!this.isMuted)
          this.winAudio.play();
      }, (1000));
      setTimeout(() => {
        this.hasWinned = false;
      }, 3000);

    }


    setTimeout(() => {
    this.isRolling = false;
    }, 1500);

    this.userService.setBalance();
  }

  winCheck(first: number, second: number) : boolean {
    if (first === second && first === 6)
      return true;
    if (first + second == 11) 
      return true;

    return false;
  }

  onMute() {
    this.isMuted = !this.isMuted;
  }

  get balance() {
    return this.userService.balance;
  }


  ngOnDestroy(): void {
    let footer = <HTMLElement>document.querySelector('footer');
    let navigation = <HTMLElement>document.querySelector('nav');
    let mainContainer = <HTMLElement>document.querySelector('.main-content');


    footer.style.display = 'block';
    navigation.style.display = 'flex';
    mainContainer.style.marginTop = '-70px';

    this.userService.setBalance();

  }
}

