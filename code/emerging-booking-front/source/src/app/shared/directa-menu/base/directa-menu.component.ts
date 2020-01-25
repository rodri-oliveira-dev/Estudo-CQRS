import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu, MenuItem, MenuGroup } from '../directa-menu.model';
import { HomeHostService } from 'src/app/home/shared/home-host.service';

@Component({
    selector: 'app-directa-menu',
    templateUrl: 'directa-menu.component.html',
    styleUrls: ['directa-menu.component.scss']
})
export class DirectaMenuComponent implements OnInit {

    @Input() menu: Menu = new Menu();
    @Output() itemClicked = new EventEmitter<MenuItem>();
    @Output() groupSelected = new EventEmitter<MenuGroup>();

    constructor(
        private homeHostService: HomeHostService
    ) { }

    ngOnInit() { }

    execute(item: MenuItem) {
        this.itemClicked.emit(item);
    }
    
    selectGroup(group: MenuGroup){
        this.homeHostService.verifierQuantityItems(group);
        this.groupSelected.emit(group);
    }
}
