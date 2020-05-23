import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import {ArvoresListComponent } from './components/Arvores/ArvoresList'
import {ArvoresCadastroComponent } from './components/Arvores/ArvoresCadastro'
import {GruposListComponent} from './components/Grupos/GruposList'
import {GruposCadastroComponent} from './components/Grupos/GruposCadastro'
import {EspeciesListComponent} from './components/Especies/EspeciesList'
import {EspeciesCadastroComponent} from './components/Especies/EspeciesCadastro'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/arvores' component={ArvoresListComponent}/>
          <Route path='/arvoresCadastro' component={ArvoresCadastroComponent}/>
          <Route path='/arvoresEdicao/:id' component={ArvoresCadastroComponent}/>
          <Route path='/grupos' component={GruposListComponent}/>
          <Route path='/gruposCadastro' component={GruposCadastroComponent}/>
          <Route path='/gruposEdicao/:id' component={GruposCadastroComponent}/>
          <Route path='/especies' component={EspeciesListComponent}/>
          <Route path='/especiesCadastro' component={EspeciesCadastroComponent}/>
          <Route path='/especiesEdicao/:id' component={EspeciesCadastroComponent}/>
        </Switch>
      </Layout>
    );
  }
}
