import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Modal } from 'reactstrap';

export class ColheitasListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      colheitas: [],
      colheitasFiltradas : [], 
      especies: [],
      grupos: [],
      arvores: [],
      loading: true ,
      excluir : false ,
      indice : -1,
      dataInicio : new Date(Date.now()).toISOString().substr(0,10),
      dataFim : new Date(Date.now()).toISOString().substr(0,10),
      grupoId : 0,
      arvoreId : 0,
      especieId : 0
    };
  }

  componentDidMount() {
    this.carregarColheitas();
  }

  static renderColheitasTable(Colheitas,me) {
    return (
      <div>
        <Modal isOpen={me.state.excluir}>
          <div style={{margin:10}}>
            <h3>Confirmacao</h3>
            <p>Tem certeza que deseja excluir ?</p>
            <div>
              <button className='btn btn-primary' style={{margin:10}} onClick={() => me.Excluir()}>Sim</button>
              <button className='btn btn-secondary' onClick={() => me.setState({excluir : false, itemId : 0})}>Não</button>
            </div>
          </div>
        </Modal>

        <Link to='/ColheitasCadastro'>
          <button className='btn btn-primary' style={{marginTop : 10,marginBottom : 10}}>Adicionar</button>
        </Link>
        <section className='row col-12'>
          <div className='col-md-2'>
            <label className='label label-default'>Árvore</label>
            <select className='form-control' value={me.state.arvoreId} onChange={me.handleArvoreChange}>
              <option key='0' value='0'>Escolher</option>
              {me.state.arvores.map(x => <option key={x.id} value={x.id}>{x.descricao}</option>)}
            </select>
          </div>
          <div className='col-md-2'>
          <label className='label label-default'>Grupo</label>
            <select className='form-control' value={me.state.grupoId} onChange={me.handleGrupoChange}>
              <option key='0' value='0'>Escolher</option>
              {me.state.grupos.map(x => <option key={x.id} value={x.id}>{x.nome}</option>)}
            </select>
          </div>
          <div className='col-md-2'>
            <label className='label label-default'>Especie</label>
            <select className='form-control' value={me.state.especieId} onChange={me.handleEspecieChange}>
              <option key='0' value='0'>Escolher</option>
              {me.state.especies.map(x => <option key={x.id} value={x.id}>{x.descricao}</option>)}
            </select>
          </div>
          <div className='col-md-3'>
            <label className='label label-default'>Data ínicio</label>
            <input type='date' className='form-control' value={me.state.dataInicio} onChange={me.handleDataInicioChange}/>
          </div>
          <div className='col-md-3'>
            <label className='label label-default'>Data fim</label>
            <input type='date' className='form-control' value={me.state.dataFim} onChange={me.handleDataFimChange}/>
          </div>
        </section>
        <table className='table table-striped' aria-labelledby="tabelLabel" style={{marginTop : 10}}>
          <thead>
            <tr>
              <th>Informações</th>
              <th>Data</th>
              <th>Peso bruto</th>
              <th>Árvore/Grupo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Colheitas.map((x,i) =>
              <tr key={x.id}>
                <td>{x.informacoes}</td>
                <td>{new Date(x.dataColheita).toLocaleDateString()}</td>
                <td>{x.pesoBruto}</td>
                <td>{x.arvore}</td>
                <td> 
                    <Link to={'/ColheitasEdicao/'+x.id}>
                    <button className='btn btn-primary' style={{marginRight : 10}}>Editar</button>
                    </Link>
                    <button className='btn btn-primary' value='Excluir'  onClick={() => me.setState({excluir : true, indice : i})}>Excluir</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : ColheitasListComponent.renderColheitasTable(this.state.colheitasFiltradas,this);

    return (
      <div>
        <h1 id="tabelLabel" >Colheitas</h1>
        {contents}
      </div>
    );
  }

  handleArvoreChange = (e) => {
    this.setState({
      arvoreId : e.target.value
    },() => this.filtrar() );
  }

  handleGrupoChange = (e) => {
    this.setState({
      grupoId : e.target.value
    },() => this.filtrar() );
  }

  handleEspecieChange = (e) => {
    this.setState({
      especieId : e.target.value
    },() => this.filtrar() );
  }

  handleDataInicioChange = (e) => {
    this.setState({
      dataInicio : e.target.value
    },() => this.filtrar() );
  }

  handleDataFimChange = (e) => {
    this.setState({
      dataFim : e.target.value
    },() => this.filtrar() );
  }

  filtrar = () => {
    
    var local = this.state;
    let filtrado = this.state.colheitas.filter(x => 
      (local.arvoreId == 0 ? true : x.arvoreId == local.arvoreId) &&
      (local.grupoId == 0 ? true : x.grupoId == local.grupoId) &&
      (local.especieId == 0 ? true : x.especieId == local.especieId)&&
      (new Date(x.dataColheita) >= new Date(local.dataInicio)) &&
      ( new Date(x.dataColheita) <= new Date(local.dataFim))
      );
    
    this.setState({colheitasFiltradas : filtrado});
  }

  async carregarColheitas() {
    await this.carregarEspecies();
    await this.carregarArvores();
    await this.carregarGrupos();

    const response = await fetch('api/Colheitas');
    const data = await response.json();
    
    this.setState({ colheitas: data, colheitasFiltradas : data, loading: false });
  }

  async carregarEspecies() {
    
    const response = await fetch('api/especies');
    const data = await response.json();
    this.setState({ especies: data});
  }

  async carregarGrupos() {
    
    const response = await fetch('api/grupos');
    const data = await response.json();
    this.setState({ grupos: data });
  }

  async carregarArvores() {
    
    const response = await fetch('api/arvores');
    const data = await response.json();
    this.setState({ arvores: data });
  }

  Excluir = async () => {
    await this.ExcluirColheita(this.state.colheitas[this.state.indice]);
  }

  async ExcluirColheita(model){
    
    console.log(JSON.stringify(model))
    const response = await fetch('api/Colheitas',{
      method : 'DELETE',
      body : JSON.stringify(model),
      headers:{
        "Content-Type":"application/json"
      }
    });
    this.carregarColheitas();
    this.setState({indice : -1,excluir : false})
  }
}
