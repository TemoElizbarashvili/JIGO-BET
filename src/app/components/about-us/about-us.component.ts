import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {




  ngOnInit(): void {
    const mainContent = <HTMLElement>document.querySelector('.main-content');
    this.incrementNumber('value-1');
    this.incrementNumber('value-2');
    this.incrementNumber('value-3');

    mainContent.style.backgroundImage = 'none';
    window.addEventListener("scroll", this.reveal);
  }

  reveal() {
    const elements = document.querySelectorAll('.about-container');

    for (var i = 0; i < elements.length; i++ ) {
      let elementTop = elements[i].getBoundingClientRect().top;
      let windowHeight = window.innerHeight;
      let elementVisible = 350;

      if (elementTop < windowHeight - elementVisible) {
        elements[i].classList.add('animate');
      } else {
        elements[i].classList.remove('animate');
      }
    }
  }



  incrementNumber(id) {
    let element = document.getElementById(id);
    let endNumber = Number(document.getElementById(id).innerHTML);

    this.incraseNumber( 0 , endNumber, element);
  }

  private incraseNumber(index, endNumber, element) {
    if ( index <= endNumber) {
      element.innerHTML = index;
      setTimeout(() => {
        this.incraseNumber(index + 10, endNumber, element);
      }, 10);
    }
  }

}




