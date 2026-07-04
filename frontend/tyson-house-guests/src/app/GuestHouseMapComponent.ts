import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-guest-house-map',
  standalone: true,
  template: `
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <h3 style="text-align: center; margin-bottom: 20px; font-size: 1.8rem;">
        Къде се намираме
      </h3>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <div
          #mapContainer
          style="display: block; width: 100%; height: 450px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); background-color: #e5e3df;"
        ></div>

        <div style="display: flex; flex-direction: column; justify-content: center;">
          <h4 style="font-size: 1.4rem; margin-bottom: 10px;">
            Точни Координати
          </h4>

          <p style="font-size: 1.2rem; color: #4285F4; font-weight: bold; margin-bottom: 15px;">
            📍 41.627221394772825, 23.19162813199282
          </p>

          <p>
            Село Микрево се намира в Югозападна България, само на няколко минути от град Сандански и с директен достъп от магистрала "Струма".
          </p>

          <ul style="line-height: 1.8; padding-left: 20px;">
            <li>
              <strong>С автомобил:</strong> Хванете отбивката за Микрево/Струмяни от А3. Къщата е в тихата горна част на селото.
            </li>
            <li>
              <strong>Път:</strong> Изцяло асфалтиран и достъпен за всякакви автомобили.
            </li>
            <li>
              <strong>Паркинг:</strong> Безплатни паркоместа в затворения двор на къщата.
            </li>
          </ul>

          <a
            href="https://maps.google.com/?q=41.627221394772825,23.19162813199282"
            target="_blank"
            style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #4285F4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; text-align: center; max-width: 250px;"
          >
            📍 Навигация в Google Maps
          </a>
        </div>
      </div>
    </div>
  `,
})
export class GuestHouseMapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapElement!: ElementRef;

  async ngAfterViewInit() {
    try {
      const { setOptions, importLibrary } = await import('@googlemaps/js-api-loader');

      setOptions({
        apiKey: environment.googleMapsApiKey,
        version: 'weekly',
      } as any);

      const { Map } = (await importLibrary('maps')) as any;
      const { Marker } = (await importLibrary('marker')) as any;

      const propertyLocation = {
        lat: 41.627221394772825,
        lng: 23.19162813199282,
      };

      const map = new Map(this.mapElement.nativeElement, {
        center: propertyLocation,
        zoom: 16,
      });

      new Marker({
        position: propertyLocation,
        map: map,
        title: 'Guest House Location',
      });
    } catch (err: any) {
      console.error('Грешка при зареждане на Google Maps:', err);
    }
  }
}