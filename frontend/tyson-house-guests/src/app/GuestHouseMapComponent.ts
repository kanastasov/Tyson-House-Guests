import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../environments/environment.prod';
@Component({
  selector: 'app-guest-house-map',
  standalone: true,
  template: `
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <h3 style="text-align: center; margin-bottom: 20px; font-size: 1.8rem;">Къде се намираме</h3>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <div #mapContainer style="width: 100%; height: 450px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"></div>
        
        <div style="display: flex; flex-direction: column; justify-content: center;">
          <h4 style="font-size: 1.4rem; margin-bottom: 10px;">Как да стигнете до нас?</h4>
          <p>Село Микрево се намира в Югозападна България, само на няколко минути от град Сандански и с директен достъп от магистрала "Струма".</p>
          <ul style="line-height: 1.8; padding-left: 20px;">
            <li><strong>С автомобил:</strong> Хванете отбивката за Микрево/Струмяни от А3. Къщата е в тихата горна част на селото.</li>
            <li><strong>Път:</strong> Изцяло асфалтиран и достъпен за всякакви автомобили.</li>
            <li><strong>Паркинг:</strong> Безплатни паркоместа в затворения двор на къщата.</li>
          </ul>
          <a href="https://maps.google.com/?q=41.6247,23.1894" target="_blank" 
             style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #4285F4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; text-align: center; max-width: 250px;">
            📍 Навигация в Google Maps
          </a>
        </div>
      </div>
    </div>
  `
})
export class GuestHouseMapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapElement!: ElementRef;

  async ngOnInit() {
    try {
      const { Loader } = await import('@googlemaps/js-api-loader');
      
      const loader = new Loader({
        apiKey: environment.googleMapsApiKey, 
        version: 'weekly'
      });

      const google = await (loader as any).load();
      
      const propertyLocation = { lat: 41.6247, lng: 23.1894 }; 

      const map = new google.maps.Map(this.mapElement.nativeElement, {
        center: propertyLocation,
        zoom: 15,
      });

      new google.maps.Marker({
        position: propertyLocation,
        map: map,
        title: 'Гостоприемният Втори Етаж',
        animation: google.maps.Animation.DROP
      });
    } catch (err: any) {
      console.error('Грешка при зареждане на Google Maps:', err);
    }
  }
}