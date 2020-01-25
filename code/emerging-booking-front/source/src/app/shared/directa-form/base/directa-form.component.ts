import { Component, Input, Output, EventEmitter, ViewRef, HostBinding } from '@angular/core';
import { AdDirective } from '../../directives/ad-directive';
import { DirectaForm } from '../directa-form.model';

declare var $: any;

@Component({
    selector: 'app-directa-form',
    templateUrl: 'directa-form.component.html',
    styleUrls: ['directa-form.component.scss'],
})
export class DirectaFormComponent implements DirectaForm {

    @Input() title = 'sem titulo';
    @Input() subtitle = 'subtitulo';
    @Input() formWitdth: string;
    @Input() formHeight: string;
    @Input() adHost: AdDirective;
    @Input() fullSize = false;
    @Input() ref: ViewRef;
    @Input() icon = 'fa-window-maximize';

    @Output() closeForm = new EventEmitter<any>();
    @Output() cancelForm = new EventEmitter<any>();

    @HostBinding('class.directa-form') formField = true;
    @HostBinding('class.maximized') maximizeField = false;


    close(result: any = null) {
        const i = this.adHost.viewContainerRef.indexOf(this.ref);
        this.adHost.viewContainerRef.remove(i);
        this.closeForm.emit(result);
    }

    maximize() {
        this.maximizeField = true;
        this.fullSize = true;
        this.applyStyle();
    }

    minimize() {
        this.maximizeField = false;
        this.fullSize = false;
        this.applyStyle();
    }

    cancel() {
        const i = this.adHost.viewContainerRef.indexOf(this.ref);
        this.adHost.viewContainerRef.remove(i);
        this.cancelForm.emit();
    }

    applyStyle() {
        const widthSize = window.innerWidth - (window.innerWidth * 0.20);
        const heightSize = window.innerHeight - (window.innerHeight * 0.093);

        const width = this.fullSize ? `${widthSize}px` : `${this.formWitdth}px`;
        const height = this.fullSize ? `${heightSize}px` : `${this.formHeight}px`;
        const left = `${window.innerWidth / 4}px`;
        const top = `${window.innerHeight / 4}px`;

        return {
            top,
            left,
            width,
            height
        };
    }

    overlay() {
        const idRefComponent = this.adHost.viewContainerRef.indexOf(this.ref);
        $('#host .form-box').removeClass('form-overlay');

        var formRef = $('#host .form-box')[idRefComponent];
        $(formRef).addClass('form-overlay');
    }
}

export { DirectaForm };
