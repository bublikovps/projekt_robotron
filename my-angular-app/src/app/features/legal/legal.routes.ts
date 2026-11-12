import { Routes } from '@angular/router';

import { ImpressumComponent }
from './impressum/impressum.component';

import { DatenschutzComponent }
from './datenschutz/datenschutz.component';

import { NutzungsbedingungenComponent }
from './nutzungsbedingungen/nutzungsbedingungen.component';

export const LEGAL_ROUTES: Routes = [

  {
    path: 'impressum',
    component: ImpressumComponent
  },

  {
    path: 'datenschutz',
    component: DatenschutzComponent
  },

  {
    path: 'nutzungsbedingungen',
    component: NutzungsbedingungenComponent
  }

];