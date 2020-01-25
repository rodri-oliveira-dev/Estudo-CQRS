import { AdDirective } from '../directives/ad-directive';
import { EventEmitter, ViewRef } from '@angular/core';

export interface DirectaForm {
    title: string;
    subtitle: string;
    formWitdth: string;
    adHost: AdDirective;
    fullSize: boolean;
    icon: string;
    ref: ViewRef;

    closeForm: EventEmitter<any>;
    cancelForm: EventEmitter<any>;
}
