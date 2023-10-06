import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    {
      imageSrc: 'https://static.crocobet.com/cms/banners/2023-08/4b42aa1c064a08108731ddbb75fc6e22.webp',
      imageAlt: 'casino'
    },
    {
      imageSrc: 'https://static.crocobet.com/cms/banners/2023-09/d91d6f69f5afaf06224432d47e8bc3a0.webp',
      imageAlt: 'casino'
    },
    {
      imageSrc: 'https://static.crocobet.com/cms/banners/2023-08/75c76e6a8a11b188716e36ed27bd3621.webp',
      imageAlt: 'casino'
    },
    {
      imageSrc: 'https://static.crocobet.com/cms/banners/2023-09/9bc1fbe9b11ca17328cbbb54d6539c16.webp',
      imageAlt: 'casino'
    },
  ]
}
