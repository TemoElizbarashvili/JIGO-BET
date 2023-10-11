import { Component, OnDestroy, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/UI.sevice';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lucky-wheel',
  templateUrl: './lucky-wheel.component.html',
  styleUrls: ['./lucky-wheel.component.scss']
})
export class LuckyWheelComponent implements OnInit, OnDestroy {
  isSpinning = false;
  circle: HTMLElement;
  isMuted: boolean = false;
  isPopUpOpen: boolean = false;
  hasWinned: boolean = false;
  prize: any = '';

  constructor(private uiService: UIService, private userService: UserService) { }

  ngOnInit(): void {
    this.circle = document.querySelector('.circle');

    this.uiService.removeUi();
  }


  // 0-22.5 = 5 pts;
  // 22.5 - 67.5 = banknot
  // 67.5 - 112.5 = 10 point
  // 112.5 - 157.5 = 100 point
  // 157.5 - 202.5 = 5 point
  // 202.5 - 247.5 = banknot
  // 247.5 - 292.5 = 10 point
  // 292.5 - 337.5 = 100 point
  // 337.5 - 360 = 5 point


  onSpinWheel() {
    if(this.isSpinning)
      return;
    this.isSpinning = true;
    const finalDeg = Math.floor(Math.random() * 360);
    this.prize = this.checkPrize(finalDeg);
    console.log('degree', finalDeg);
    const degToSpin = 360 + 360 * Math.floor((Math.random() * 5)) + finalDeg;
    this.circle.style.transform = `rotate(${degToSpin}deg)`;
    this.circle.style.transition = `3s cubic-bezier(0,.07,0,1)`;
    

    // this.circle.style.animationTimingFunction = `cubic-bezier(.03,.82,1,.23)`;
    setTimeout(() => {
      this.circle.style.transform = `rotate(${degToSpin%360}deg)`;
      this.circle.style.transition = `0s`;
      this.hasWinned = true;
    }, 3000);

    setTimeout(() => {
      this.isSpinning = false;
      this.hasWinned = false;
    }, 4000);

  }

  checkPrize(deg: number): any {
    if ((deg > 0 && deg < 22.5) || (deg > 157.5 && deg < 202.5)){
      return 5;
    }
    if ((deg > 337.5 && deg < 360)){
      return 5;
    }
    if ((deg > 22.5 && deg < 67.5) || (deg > 202.5 && deg < 247.5)){
      return 0;
    }
    if ((deg > 67.5 && deg < 112.5) || (deg > 247.5 && deg < 292.5)){
      return 10;
    }
    if ((deg > 112.5 && deg < 157.5) || (deg > 292.5 && deg < 337.5)){
      return 100;
    }
  }

  onMute() {

  }

  get balance() { 
    return this.userService.balance;
  }

  get prizeToDisplay() {
    if (this.prize == 5)
      return '5 POINT'
    if(this.prize == 10)
      return '10 POINT'
    if(this.prize == 100)
      return '100 POINT'
    return 'BANKNOT';

  }

  ngOnDestroy(): void {
    this.uiService.setBackUI();
  }

}
