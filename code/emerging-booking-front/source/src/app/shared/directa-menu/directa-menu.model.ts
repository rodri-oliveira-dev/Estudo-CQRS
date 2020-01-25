import { Type } from '@angular/core';

export class Menu {
    groups: Array<MenuGroup> = [];

    add(items: Array<MenuGroup>): Menu {
        items.forEach((item) => this.groups.push(item));
        return this;
    }
}

export class MenuGroup {
    label: string;
    icon: string;
    items: MenuItem[] = [];

    private constructor(label: string, icon: string) {
        this.label = label;
        this.icon = icon.startsWith('fas ') ? icon : `fas ${icon}`;
    }

    static create(label: string, icon: string = ''): MenuGroup {
        return new MenuGroup(label, icon);
    }

    newItem(label: string, forms: Type<any>, icon: string = ''): MenuGroup {
        this.items.push(new MenuItem(label, forms, icon));
        return this;
    }
}

export class MenuItem {
    icon: string;
    label: string;
    forms: Type<any>;

    constructor(label: string, forms: Type<any>, icon: string = '') {
        this.label = label;
        this.forms = forms;
        this.icon = icon.startsWith('fas ') ? icon : `fas ${icon}`;
    }
}
