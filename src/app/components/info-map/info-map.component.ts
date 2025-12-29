import { Component, ViewEncapsulation, input } from '@angular/core';

@Component({
  selector: 'app-info-map',
  template: `
    <div class="info-map w-full h-full flex items-start justify-center pt-7.5 pl-12.5">
      <div class="bg-[#3388ff] rounded-lg px-4 py-3 flex items-center shadow-lg relative max-w-87.5 w-full">
        <!-- Left Arrow Icon -->
        <div class="mr-3 shrink-0">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
             <path d="M15 20V10a4 4 0 0 0-4-4H5"/>
             <path d="M9 2L5 6l4 4"/>
           </svg>
        </div>

        <!-- Address Text -->
        <div class="flex-1 min-w-0 mr-4 border-r border-white pr-4">
          <div class="text-white font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {{ address() || 'Locating...' }}
          </div>
        </div>

        <!-- Distance -->
        <div class="flex flex-col justify-center items-center pl-1 text-white font-medium shrink-0">
          <span>100m</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    app-info-map {
      display: block;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class InfoMapComponent {
  address = input<string | null>(null);
}
