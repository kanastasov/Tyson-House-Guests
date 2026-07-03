import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GuestHouseMapComponent } from './GuestHouseMapComponent';

interface HouseFeature {
  title: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GuestHouseMapComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'house-guest-frontend';

features = [
      {
      title: 'Тройна стая с климатик',
      category: 'Стая 1',
      specs: '3 единични легла • Климатик • Капацитет: 3 души',
      description: 'Просторна и прохладна стая, идеална за приятели или семейства с деца. Оборудвана с три отделни комфортни легла и мощен климатик за горещите дни.',
      imageUrl: 'assets/room2.jpg',
      hoverImageUrl: 'assets/room22.jpg' 
      
    },
    {
      title: 'Уютна двойна стая с телевизор',
      category: 'Стая 2',
      specs: '1 двойно легло • Телевизор • Капацитет: 2 души',
      description: 'Комфортна и светла спалня, оборудвана с удобно двойно легло и телевизор. Перфектно място за почивка след динамичен ден.',
      imageUrl: 'assets/room11.jpg',
      hoverImageUrl: 'assets/room111.jpg' 

    },
    {
      title: 'Класическа двойна стая',
      category: 'Стая 3',
      specs: '1 двойно легло • Капацетет: 2 души',
      description: 'Уединена и спокойна спалня с голямо двойно легло, съчетаваща изчистен дизайн с уютна атмосфера за пълноценен сън.',
      imageUrl: 'assets/room3.jpg',
      hoverImageUrl: 'assets/room33.jpg' 
    },

    {
      title: 'Оборудван кухненски кът',
      category: 'Удобства',
      specs: 'Хладилник • Микровълнова фурна • Посуда',
      description: 'Удобна компактна кухня на етажа, предназначена за бързо приготвяне на закуска, топли напитки и правилно съхранение на вашите хранителни продукти.',
      imageUrl: 'assets/kitchen.jpg' 
    },
    {
      title: 'Самостоятелна баня',
      category: 'Удобства',
      specs: 'Самостоятелен санитарен възел • Душ • Тоалетна',
      description: 'Чиста и модерна баня с тоалетна, разположена на същия етаж. Използва се напълно самостоятелно и единствено от вашата компания.',
      imageUrl: 'assets/bathroom.jpg' 
    }
  ];
}