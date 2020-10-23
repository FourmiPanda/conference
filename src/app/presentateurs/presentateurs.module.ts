import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresentateursComponent } from './presentateurs.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PresentateursComponent],
  exports: [PresentateursComponent]
})
export class PresentateursComponentModule { }
