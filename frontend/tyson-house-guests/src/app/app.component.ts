import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestHouseMapComponent } from './GuestHouseMapComponent';
import { BookingCalendarComponent } from './booking-calendar';

interface TranslatableText {
  title: string;
  category: string;
  specs: string;
  description: string;
}

interface HouseFeature {
  imageUrl: string;
  hoverImageUrl?: string;
  translations: {
    bg: TranslatableText;
    en: TranslatableText;
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GuestHouseMapComponent, BookingCalendarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'house-guest-frontend';
  
  // Текущ език
  currentLang: 'bg' | 'en' = 'bg';

  switchLanguage(lang: 'bg' | 'en') {
    this.currentLang = lang;
  }

  // 1. МАСИВЪТ СЪС СТАИТЕ И УДОБСТВАТА (Трябва да е тук)
  features: HouseFeature[] = [
    {
      imageUrl: 'assets/room2.jpg',
      hoverImageUrl: 'assets/room22.jpg',
      translations: {
        bg: {
          title: 'Тройна стая с климатик',
          category: 'Стая 1',
          specs: '3 единични легла • Климатик • Капацитет: 3 души',
          description: 'Просторна и прохладна стая, идеална за приятели или семейства с деца. Оборудвана с три отделни комфортни легла и мощен климатик за горещите дни.'
        },
        en: {
          title: 'Triple Room with AC',
          category: 'Room 1',
          specs: '3 single beds • Air conditioning • Capacity: 3 people',
          description: 'Spacious and cool room, perfect for friends or families with children. Equipped with three separate comfortable beds and powerful AC for hot summer days.'
        }
      }
    },
    {
      imageUrl: 'assets/room11.jpg',
      hoverImageUrl: 'assets/room111.jpg',
      translations: {
        bg: {
          title: 'Уютна двойна стая с телевизор',
          category: 'Стая 2',
          specs: '1 двойно легло • Телевизор • Капацитет: 2 души',
          description: 'Комфортна и светла спалня, оборудвана с удобно двойно легло и телевизор. Перфектно място за почивка след динамичен ден.'
        },
        en: {
          title: 'Cozy Double Room with TV',
          category: 'Room 2',
          specs: '1 double bed • TV • Capacity: 2 people',
          description: 'Comfortable and bright bedroom equipped with a cozy double bed and a TV. Perfect place to relax after a dynamic day.'
        }
      }
    },
    {
      imageUrl: 'assets/room3.jpg',
      hoverImageUrl: 'assets/room33.jpg',
      translations: {
        bg: {
          title: 'Класическа двойна стая',
          category: 'Стая 3',
          specs: '1 двойно легло • Капацетет: 2 души',
          description: 'Уединена и спокойна спалня с голямо двойно легло, съчетаваща изчистен дизайн с уютна атмосфера за пълноценен сън.'
        },
        en: {
          title: 'Classic Double Room',
          category: 'Room 3',
          specs: '1 double bed • Capacity: 2 people',
          description: 'Private and peaceful bedroom with a large double bed, combining clean design with a cozy atmosphere for a restful sleep.'
        }
      }
    },
    {
      imageUrl: 'assets/kitchen.jpg',
      translations: {
        bg: {
          title: 'Оборудван кухненски кът',
          category: 'Удобства',
          specs: 'Хладилник • Микровълнова фурна • Посуда',
          description: 'Удобна компактна кухня на етажа, предназначена за бързо приготвяне на закуска, топли напитки и правилно съхранение на вашите хранителни продукти.'
        },
        en: {
          title: 'Equipped Kitchenette',
          category: 'Amenities',
          specs: 'Refrigerator • Microwave • Kitchenware',
          description: 'Convenient and compact kitchenette on the floor, designed for quick breakfast preparation, hot drinks, and proper storage of your food products.'
        }
      }
    },
    {
      imageUrl: 'assets/bathroom.jpg',
      translations: {
        bg: {
          title: 'Самостоятелна баня',
          category: 'Удобства',
          specs: 'Самостоятелен санитарен възел • Душ • Тоалетна',
          description: 'Чиста и модерна баня с тоалетна, разположена на същия етаж. Използва се напълно самостоятелно и единствено от вашата компания.'
        },
        en: {
          title: 'Private Bathroom',
          category: 'Amenities',
          specs: 'Private bathroom • Shower • Toilet',
          description: 'Clean and modern bathroom with a toilet, located on the same floor. It is used completely privately and exclusively by your group.'
        }
      }
    }
  ];

  // 2. ОБЕКТЪТ СЪС СТАТИЧНИТЕ ТЕКСТОВЕ ЗА СТРАНИЦАТА
  uiText = {
    bg: {
      badge: 'Самостоятелен етаж от къща',
      heroTitle: 'Гостоприемният Втори Етаж',
      heroDesc: 'Предлагаме под наем самостоятелен втори етаж от къща в <strong>с. Микрево</strong> — 3 обзаведени стаи, кухня и баня за до <strong>7 души</strong>. Районът съчетава спокойствие, чист въздух и селски туризъм с близост до минералните плажове на <strong>Рупите</strong> и исторически места като <strong>Мелник</strong>, <strong>Самуиловата крепост</strong> и храма на Преподобна Стойна в <strong>Златолист</strong>.',
      comingSoon: '✨ Очаквайте скоро: цялата къща с общ капацитет до 12 души и релаксиращо външно джакузи за 7 души за вашата перфектна почивка!',
      secDistribution: 'Разпределение на помещенията',
      secWhyChoose: 'Защо да изберете с. Микрево и региона?',
      subWhyChoose: 'Перфектната комбинация от автентична природа, релакс и възможности за активности',
      region1Title: 'Селски туризъм и спокойствие',
      region1Desc: 'Бягство от градския шум в автентична и тиха атмосфера. Тук времето тече по-бавно, а уединението е гарантирано.',
      region2Title: 'Чист въздух и природа',
      region2Desc: 'Разположено в подножието на Малашевска планина и близо до Пирин, селото предлага кристално чист въздух и красиви гледки.',
      region3Title: 'Минерални плажове и бани',
      region3Desc: 'Само на кратки разстояния с кола се намират световноизвестните лечебни извори и комплекси в Рупите, Сандански и Градешница.',
      region4Title: 'Близки забележителности',
      region4Desc: 'Идеална отправна точка за разходки до Самуиловата крепост, Мелник, Роженския манастир или местността за поклонение в Рупите.',
      secLogistics: 'Общи удобства и спортни активности',
      log1Title: 'Спортна зона, Дартс и Фитнес кът',
      log1Desc: 'На разположение на гостите има обособена зона за тренировки, оборудвана с лежанка, гири и боксов чувал за поддържане на перфектна форма.',
      log2Title: 'Безплатен тенис на корт',
      log2Desc: 'В селото има тенис корт с напълно безплатен достъп. Можем да осигурим хилки и топки, за да се насладите на играта по всяко време.',
      log3Title: 'WiFi и Климатик',
      log3Desc: 'Осигурен е бърз и безплатен Wi-Fi на целия етаж. Тройната стая разполага с климатик, който лесно охлажда цялата стая.',
      log4Title: 'Паркинг и уединение',
      log4Desc: 'Наемате целия етаж самостоятелно. Къщата се намира в спокоен район и предлага безплатни паркоместа в затворения двор.',
      contactBadge: 'Резервации и въпроси',
      contactTitle: 'Свържете се с нас',
      contactDesc: 'Имате въпроси за свободни дати или искате да резервирате целия етаж? На разположение сме по телефон или чат приложения.',
      priceLabel: 'Цена за целия етаж',
      priceAmount: '70€ <small>/ нощувка</small>',
      pricePerPerson: '(само 10€ на човек при 7 души)',
      pricePromo: 'При 2 или повече нощувки: <strong>60€ / нощувка</strong>',
      btnPhone: 'Обади се сега',
      btnChat: 'Пиши ни в чата',
      socialTitle: 'Свържете се с нас в收циалните мрежи:'
    },
    en: {
      badge: 'Private entire floor of a house',
      heroTitle: 'The Welcoming Second Floor',
      heroDesc: 'We offer for rent a private second floor of a house in <strong>Mikrevo village</strong> — 3 furnished rooms, a kitchen, and a bathroom for up to <strong>7 people</strong>. The area combines peace, fresh air, and rural tourism with proximity to the mineral beaches of <strong>Rupite</strong> and historical sites like <strong>Melnik</strong>, <strong>Samuil\'s Fortress</strong>, and the temple of Prepodobna Stoyna in <strong>Zlatolist</strong>.',
      comingSoon: '✨ Coming soon: the entire house with a total capacity of up to 12 people and a relaxing outdoor jacuzzi for 7 people for your perfect vacation!',
      secDistribution: 'Room Distribution',
      secWhyChoose: 'Why choose Mikrevo village and the region?',
      subWhyChoose: 'The perfect combination of authentic nature, relaxation, and activity options',
      region1Title: 'Rural Tourism & Peace',
      region1Desc: 'Escape from the city noise in an authentic and quiet atmosphere. Here time moves slower, and privacy is guaranteed.',
      region2Title: 'Fresh Air & Nature',
      region2Desc: 'Located at the foot of the Maleshevska Mountain and close to Pirin, the village offers crystal clear air and beautiful views.',
      region3Title: 'Mineral Beaches & Baths',
      region3Desc: 'World-famous healing springs and complexes in Rupite, Sandanski, and Gradeshnitsa are just a short drive away.',
      region4Title: 'Nearby Attractions',
      region4Desc: 'An ideal starting point for trips to Samuil\'s Fortress, Melnik, Rozhen Monastery, or the pilgrimage site in Rupite.',
      secLogistics: 'General Amenities & Sports Activities',
      log1Title: 'Sports Zone, Darts & Fitness Corner',
      log1Desc: 'Guests have access to a dedicated workout area equipped with a bench press, dumbbells, and a punching bag to stay in perfect shape.',
      log2Title: 'Free Tennis Court',
      log2Desc: 'There is a tennis court in the village with completely free access. We can provide rackets and balls so you can enjoy the game at any time.',
      log3Title: 'WiFi & Air Conditioning',
      log3Desc: 'Fast and free Wi-Fi is provided on the entire floor. The triple room has air conditioning that easily cools the whole room.',
      log4Title: 'Parking & Privacy',
      log4Desc: 'You rent the entire floor privately. The house is located in a quiet area and offers free parking spaces in the enclosed yard.',
      contactBadge: 'Reservations & Questions',
      contactTitle: 'Contact Us',
      contactDesc: 'Have questions about available dates or want to book the entire floor? We are available via phone or chat applications.',
      priceLabel: 'Price for the entire floor',
      priceAmount: '70€ <small>/ night</small>',
      pricePerPerson: '(only 10€ per person for 7 people)',
      pricePromo: 'For 2 or more nights: <strong>60€ / night</strong>',
      btnPhone: 'Call now',
      btnChat: 'Chat with us',
      socialTitle: 'Connect with us on social media:'
    }
  };
}