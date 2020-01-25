import { Component, ViewChild, OnInit, HostBinding } from '@angular/core';
import { MenuService } from './shared/home-menu.service';
import { HomeHostService } from './shared/home-host.service';
import { AdDirective } from '../shared/directives/ad-directive';
import { Menu, MenuItem, MenuGroup } from '../shared/directa-menu/directa-menu.model';
import { AppSession } from '../core/app-session';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MenuService, HomeHostService]
})
export class HomeComponent implements OnInit {

  @ViewChild(AdDirective) adHost: AdDirective;
  currentGroup: MenuGroup = MenuGroup.create('', '');
  menu: Menu = new Menu();

  @HostBinding('class.small-navegation') showAndHideMenu = true;
  @HostBinding('class.submenu-show') showAndHideSubmenu = true;

  constructor(
    private menuService: MenuService,
    private homeHostService: HomeHostService
  ) { }

  ngOnInit(): void {
    this.menu = this.menuService.getMenu();
    this.showAndHideMenu = false;
    this.showAndHideSubmenu = false;
    this.homeHostService.startTimer();
  }

  creatForm(itemMeun: MenuItem) {
    this.homeHostService.createForm(this.adHost, itemMeun);
  }

  getUserName() {
    const userObject = AppSession.getAndKeep('DSSO.LU');
    return userObject.displayName;
  }

  stayLogged(): boolean {
    return AppSession.isLoggedIn();
  }

  /**
   * @method hideAndShow
   * Método para verificar o Hide and Show do Menu principal
   * O método recebe uma variavel do tipo boolean
   * "Seta" o tipo passado e chama o método hideNavegation() para ocultar a barra de Menu
   * Ou o método showNavegation() para retorna a seu tamanho original/padrão
   */
  hideAndShow(alterHideShow: boolean) {
    if (alterHideShow === true) {
      this.hideNavegation();
    } else {
      this.showNavegation();
    }
  }

  /**
   * @method hideNavegation
   * Método que oculta a barra de Menu principal
   */

  hideNavegation() {
    this.showAndHideMenu = true;
  }

  /**
   * @method showNavegation
   * Método que retorna o tamanho original/padrão da barra de Menu principal
   */
  showNavegation() {
    this.showAndHideMenu = false;
  }

  public setCurrentGroup(group: MenuGroup) {
    this.showAndHideSubmenu = true;
    this.currentGroup = group;
  }

  public setItemCurrentGroup(itemMenu: MenuItem) {
    this.creatForm(itemMenu);
  }

  verifierRefreshToken() {
    this.homeHostService.verifierRefreshTokenHost();
  }

  logout() {
    this.homeHostService.logoutHost();
  }
}
