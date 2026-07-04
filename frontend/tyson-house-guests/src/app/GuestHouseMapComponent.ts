import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { environment } from '../environments/environment.prod';

type Lang = 'bg' | 'en';

@Component({
  selector: 'app-guest-house-map',
  standalone: true,
  template: `
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <h3 style="text-align: center; margin-bottom: 20px; font-size: 1.8rem;">
        {{ text.title }}
      </h3>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <div
          #mapContainer
          style="display: block; width: 100%; height: 450px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); background-color: #e5e3df;"
        ></div>

        <div style="display: flex; flex-direction: column; justify-content: center;">
          <h4 style="font-size: 1.4rem; margin-bottom: 10px;">
            {{ text.coordsTitle }}
          </h4>

          <p style="font-size: 1.2rem; color: #4285F4; font-weight: bold; margin-bottom: 15px;">
            📍 {{ propertyLocation.lat }}, {{ propertyLocation.lng }}
          </p>

          <p>
            {{ text.description }}
          </p>

          <ul style="line-height: 1.8; padding-left: 20px;">
            <li>
              <strong>{{ text.byCarLabel }}:</strong> {{ text.byCar }}
            </li>
            <li>
              <strong>{{ text.roadLabel }}:</strong> {{ text.road }}
            </li>
            <li>
              <strong>{{ text.parkingLabel }}:</strong> {{ text.parking }}
            </li>
          </ul>

          <a
            [href]="mapLink"
            target="_blank"
            style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #4285F4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; text-align: center; max-width: 250px;"
          >
            📍 {{ text.navigate }}
          </a>
        </div>
      </div>
    </div>
  `,
})
export class GuestHouseMapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapElement!: ElementRef;

  @Input() lang: Lang = 'bg';

  propertyLocation = {
    lat: 41.627221394772825,
    lng: 23.19162813199282,
  };

  get mapLink() {
    return `https://maps.google.com/?q=${this.propertyLocation.lat},${this.propertyLocation.lng}`;
  }

  get text() {
    return this.lang === 'bg'
      ? {
          title: 'Къде се намираме',
          coordsTitle: 'Точни Координати',
          description:
            'Село Микрево се намира в Югозападна България, само на няколко минути от град Сандански и с директен достъп от магистрала "Струма".',
          byCarLabel: 'С автомобил',
          byCar:
            'Хванете отбивката за Микрево/Струмяни от А3. Къщата е в тихата горна част на селото.',
          roadLabel: 'Път',
          road: 'Изцяло асфалтиран и достъпен за всякакви автомобили.',
          parkingLabel: 'Паркинг',
          parking: 'Безплатни паркоместа в затворения двор на къщата.',
          navigate: 'Навигация в Google Maps',
        }
      : {
          title: 'Where we are located',
          coordsTitle: 'Exact Coordinates',
          description:
            'Mikrevo village is located in Southwestern Bulgaria, just a few minutes from Sandanski and with direct access from the Struma highway.',
          byCarLabel: 'By car',
          byCar:
            'Take the exit for Mikrevo/Strumyani from A3. The house is in the quiet upper part of the village.',
          roadLabel: 'Road',
          road: 'Fully asphalted and accessible for all types of vehicles.',
          parkingLabel: 'Parking',
          parking: 'Free parking spaces in the enclosed yard.',
          navigate: 'Open in Google Maps',
        };
  }

  async ngAfterViewInit() {
    try {
      const { setOptions, importLibrary } = await import('@googlemaps/js-api-loader');

      setOptions({
        apiKey: environment.googleMapsApiKey,
        version: 'weekly',
      } as any);

      const { Map } = (await importLibrary('maps')) as any;
      const { Marker } = (await importLibrary('marker')) as any;

      const map = new Map(this.mapElement.nativeElement, {
        center: this.propertyLocation,
        zoom: 16,
      });

      new Marker({
        position: this.propertyLocation,
        map,
        title: 'Guest House Location',
      });
    } catch (err: any) {
      console.error('Google Maps error:', err);
    }
  }
}