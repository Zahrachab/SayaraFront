'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">prj-sayara documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-232e43659696594cadfe3c0d3bf0d7ec"' : 'data-target="#xs-components-links-module-AppModule-232e43659696594cadfe3c0d3bf0d7ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-232e43659696594cadfe3c0d3bf0d7ec"' :
                                            'id="xs-components-links-module-AppModule-232e43659696594cadfe3c0d3bf0d7ec"' }>
                                            <li class="link">
                                                <a href="components/AlertComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmationDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmationDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactUsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactUsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NosClientsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NosClientsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoservicesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoservicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OfferComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OfferComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PremierePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PremierePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-232e43659696594cadfe3c0d3bf0d7ec"' : 'data-target="#xs-injectables-links-module-AppModule-232e43659696594cadfe3c0d3bf0d7ec"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-232e43659696594cadfe3c0d3bf0d7ec"' :
                                        'id="xs-injectables-links-module-AppModule-232e43659696594cadfe3c0d3bf0d7ec"' }>
                                        <li class="link">
                                            <a href="injectables/CommandeService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CommandeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ModeleService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ModeleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PusherService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PusherService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CommandesModule.html" data-type="entity-link">CommandesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CommandesModule-0c40592938343445901936f73ed7ac89"' : 'data-target="#xs-components-links-module-CommandesModule-0c40592938343445901936f73ed7ac89"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CommandesModule-0c40592938343445901936f73ed7ac89"' :
                                            'id="xs-components-links-module-CommandesModule-0c40592938343445901936f73ed7ac89"' }>
                                            <li class="link">
                                                <a href="components/AllCommandesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AllCommandesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommandesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommandesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommandesRoutingModule.html" data-type="entity-link">CommandesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GestionModule.html" data-type="entity-link">GestionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GestionModule-7922b75f36b71b79112023e3b16d1e57"' : 'data-target="#xs-components-links-module-GestionModule-7922b75f36b71b79112023e3b16d1e57"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GestionModule-7922b75f36b71b79112023e3b16d1e57"' :
                                            'id="xs-components-links-module-GestionModule-7922b75f36b71b79112023e3b16d1e57"' }>
                                            <li class="link">
                                                <a href="components/AjouterCouleurComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AjouterCouleurComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AjouterModeleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AjouterModeleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AjouterOptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AjouterOptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AjouterVersionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AjouterVersionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FicheModeleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FicheModeleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FicheVersionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FicheVersionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionCouleurComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionCouleurComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionModeleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionModeleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionOptionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionOptionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionVersionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionVersionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfosDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfosDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModifierCouleurComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifierCouleurComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModifierModeleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifierModeleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModifierOptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifierOptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModifierVerionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifierVerionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidenavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SupprimerModeleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SupprimerModeleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-GestionModule-7922b75f36b71b79112023e3b16d1e57"' : 'data-target="#xs-pipes-links-module-GestionModule-7922b75f36b71b79112023e3b16d1e57"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-GestionModule-7922b75f36b71b79112023e3b16d1e57"' :
                                            'id="xs-pipes-links-module-GestionModule-7922b75f36b71b79112023e3b16d1e57"' }>
                                            <li class="link">
                                                <a href="pipes/DateAgoPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateAgoPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GestionRoutingModule.html" data-type="entity-link">GestionRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link">ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfileModule-c9a2209f7b0d043efb3b7ed5a28ee56a"' : 'data-target="#xs-components-links-module-ProfileModule-c9a2209f7b0d043efb3b7ed5a28ee56a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-c9a2209f7b0d043efb3b7ed5a28ee56a"' :
                                            'id="xs-components-links-module-ProfileModule-c9a2209f7b0d043efb3b7ed5a28ee56a"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileRoutingModule.html" data-type="entity-link">ProfileRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SimulationModule.html" data-type="entity-link">SimulationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SimulationModule-80a7a1c6454d7d27441c183ddfd93962"' : 'data-target="#xs-components-links-module-SimulationModule-80a7a1c6454d7d27441c183ddfd93962"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SimulationModule-80a7a1c6454d7d27441c183ddfd93962"' :
                                            'id="xs-components-links-module-SimulationModule-80a7a1c6454d7d27441c183ddfd93962"' }>
                                            <li class="link">
                                                <a href="components/InfosDispoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfosDispoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SimulationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SimulationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SimulationRoutingModule.html" data-type="entity-link">SimulationRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StockModule.html" data-type="entity-link">StockModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StockModule-fa4361f83ee85aa9976960ccaeb6b8b2"' : 'data-target="#xs-components-links-module-StockModule-fa4361f83ee85aa9976960ccaeb6b8b2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StockModule-fa4361f83ee85aa9976960ccaeb6b8b2"' :
                                            'id="xs-components-links-module-StockModule-fa4361f83ee85aa9976960ccaeb6b8b2"' }>
                                            <li class="link">
                                                <a href="components/StockComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StockUploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StockUploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StockVehiculesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StockVehiculesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StockRoutingModule.html" data-type="entity-link">StockRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TarifsModule.html" data-type="entity-link">TarifsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TarifsModule-a8991654455f5b500af67be71251c028"' : 'data-target="#xs-components-links-module-TarifsModule-a8991654455f5b500af67be71251c028"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TarifsModule-a8991654455f5b500af67be71251c028"' :
                                            'id="xs-components-links-module-TarifsModule-a8991654455f5b500af67be71251c028"' }>
                                            <li class="link">
                                                <a href="components/TarifsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TarifsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TarifsOptionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TarifsOptionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TarifsVersionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TarifsVersionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadFichierTarifComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadFichierTarifComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TarifsRoutingModule.html" data-type="entity-link">TarifsRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CouleurDataSource.html" data-type="entity-link">CouleurDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageSnippet.html" data-type="entity-link">ImageSnippet</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageSnippet-1.html" data-type="entity-link">ImageSnippet</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageSnippet-2.html" data-type="entity-link">ImageSnippet</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertService.html" data-type="entity-link">AlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthentificationService.html" data-type="entity-link">AuthentificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommandeServiceMock.html" data-type="entity-link">CommandeServiceMock</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CouleurService.html" data-type="entity-link">CouleurService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CouleurServiceMock.html" data-type="entity-link">CouleurServiceMock</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImageService.html" data-type="entity-link">ImageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModeleServiceMock.html" data-type="entity-link">ModeleServiceMock</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OptionService.html" data-type="entity-link">OptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OptionServiceMock.html" data-type="entity-link">OptionServiceMock</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StockService.html" data-type="entity-link">StockService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StockServiceMock.html" data-type="entity-link">StockServiceMock</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VersionService.html" data-type="entity-link">VersionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VersionServiceMock.html" data-type="entity-link">VersionServiceMock</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/UtilisateurGuard.html" data-type="entity-link">UtilisateurGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Commande.html" data-type="entity-link">Commande</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Couleur.html" data-type="entity-link">Couleur</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Modele.html" data-type="entity-link">Modele</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModeleDetail.html" data-type="entity-link">ModeleDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Option.html" data-type="entity-link">Option</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OptionDetail.html" data-type="entity-link">OptionDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockVehicule.html" data-type="entity-link">StockVehicule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockVersion.html" data-type="entity-link">StockVersion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Vehicule.html" data-type="entity-link">Vehicule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VersionDetail.html" data-type="entity-link">VersionDetail</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});