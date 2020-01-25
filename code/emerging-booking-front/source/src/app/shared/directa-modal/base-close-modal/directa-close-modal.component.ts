import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DirectaModal } from '../directa-modal.model';


@Component({
    selector: 'app-directa-close-modal',
    templateUrl: 'directa-close-modal.component.html'
})

export class DirectaCloseModalComponent implements DirectaModal {

    @Input() message_title = 'sem titulo';
    @Input() message = 'message';

    @Output() closeForm = new EventEmitter<any>();
    
    close() {
        this.closeForm.emit();
    }
}