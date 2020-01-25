import { EventEmitter } from '@angular/core';

export interface DirectaModal {
    message_title: string;
    message: string;

    submitForm?: EventEmitter<any>;
    closeForm: EventEmitter<any>;
}