import { Routes } from '@angular/router';

import { DevicesComponent }
from './components/devices.component';

export const DEVICES_ROUTES: Routes = [

  {
    path: 'asset-management/devices',
    component: DevicesComponent
  }

];