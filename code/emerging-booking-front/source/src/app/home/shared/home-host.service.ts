import { Injectable, ComponentFactoryResolver, Type } from '@angular/core';
import { MenuItem, MenuGroup } from '../../shared/directa-menu/directa-menu.model';
import { AdDirective } from '../../shared/directives/ad-directive';
import { DirectaForm } from '../../shared/directa-form/directa-form.model';
import { AppSession } from 'src/app/core/app-session';
import { Token } from 'src/app/login/shared/token.model';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import * as moment from 'moment';
import 'moment/locale/pt-br';
import * as $ from 'jquery';

declare var $: any;

@Injectable()
export class HomeHostService {
  expire: boolean = false;
  interval: any;
  verifierQuantity: any;


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private http: HttpClient
  ) { }

  create(adHost: AdDirective, form: Type<any>): DirectaForm {

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(form);

    const componentRef = adHost.viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as DirectaForm).adHost = adHost;
    (componentRef.instance as DirectaForm).ref = componentRef.hostView;

    $($('#host .form-box')[adHost.viewContainerRef.indexOf(componentRef.hostView)]).addClass('form-overlay');

    return (componentRef.instance as DirectaForm);
  }

  createForm(adHost: AdDirective, itemMeun: MenuItem) {
    this.create(adHost, itemMeun.forms);
  }

  verifierQuantityItems(group: MenuGroup) {
    this.verifierQuantity = setTimeout(() => {
      this.addDropdown(group);
    });
  }

  addDropdown(group: MenuGroup) {
    // quantidade de itens no submenu
    var count = group.items.length;
    // tamanho dos filhos
    var width = parseInt($('#list-submenu').children().width());
    // multiplicando para pegar o tamanho total dos filhos
    var size = count * width;

    var size_window = window.innerWidth - 100;

    var limit = parseInt(((size_window / width).toFixed(0))) - 1;

    if (count > limit) {
      for (let i = 1; i <= count - limit; i++) {
        $('#list-submenu').children().eq(limit).addClass("dropdown-item");
        $('#more_submenu').append($('#list-submenu').children().eq(limit));
      }
      $('#button-dropdown').remove();
      $('#submenu').append(
        `<button type="button" id="button-dropdown" class="btn btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="sr-only">Dropdown</span>
    </button>
      `);
    } else {
      $('#button-dropdown').remove();
    }
  }

  /**
   * 
   * @param expire 
   * Recebe um parametro do tipo boolean, se o parametro for de valor true,
   * é atribuido os valores 'show' (mostra o modal na tela)
   * 'keyboard: false' que bloqueia que o usuário possa fechar o modal 
   * atraves do teclado ou clicando fora da região do modal
   * e o 'focus: true'. Caso contrario o parametro for de valor false, 
   * é atribuido o valor 'hide' que oculta o modal para o usuario
   */
  showModal(expire: boolean) {
    if (expire) {
      $('#directa-submit-close-modal').modal({
        keyboard: false
      })
      $('#directa-submit-close-modal').modal('show')
      $('#directa-submit-close-modal').modal({
        focus: true
      })
    } else {
      $('#directa-submit-close-modal').modal('hide')
    }
  }

  startTimer() {
    this.interval = setTimeout(() => {
      if (AppSession.ExpiresIn) {
        var date = new Date(Date.now());
        if (AppSession.ExpiresIn > moment(new Date(date.valueOf() - date.getTimezoneOffset() * 60000)).unix()) {
          this.startTimer();
        } else {

          clearTimeout(this.interval);

          this.expire = true;
          this.showModal(this.expire);
        }
      }
    }, 1000)
  }

  logoutHost() {

    return this.http.get(`${environment.urlBaseDSSO}oauth/signout`)
      .subscribe(
        () => this.onSuccessLogout(),
        (error) => this.onErrorLogout(error)
      );
  }

  onSuccessLogout() {
    AppSession.signout();

    this.notExperid();
    clearTimeout(this.interval);
  }

  onErrorLogout(error) {
    AppSession.signout();

    this.notExperid();
    clearTimeout(this.interval);
  }

  verifierRefreshTokenHost() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Grant_Type': 'refresh_token',
        'Refresh_Token': `${AppSession.RefreshToken}`
      })
    };
    return this.http.post<Token>(`${environment.urlBaseDSSO}oauth/refresh`, {}, httpOptions)
      .subscribe(
        (data) => this.onSuccessVerifierRefreshToken(data)
      );
  }

  onSuccessVerifierRefreshToken(data: Token) {

    this.notExperid();
    this.startTimer();

    AppSession.ObjectToken(data);
  }

  notExperid() {
    this.expire = false;
    this.showModal(this.expire);
  }
}
