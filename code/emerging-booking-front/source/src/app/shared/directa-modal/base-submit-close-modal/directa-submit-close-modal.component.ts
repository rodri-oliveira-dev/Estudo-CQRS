import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DirectaModal } from '../directa-modal.model';

declare var $: any;

@Component({
    selector: 'app-directa-submit-close-modal',
    templateUrl: 'directa-submit-close-modal.component.html'
})

export class DirectaSubmitCloseModalComponent implements DirectaModal {
    @Input() message_title = 'sem titulo';
    @Input() message = 'message';

    @Output() submitForm = new EventEmitter<any>();
    @Output() closeForm = new EventEmitter<any>();

    submit() {
        this.submitForm.emit();
    }

    close() {
        this.closeForm.emit();
    }

}