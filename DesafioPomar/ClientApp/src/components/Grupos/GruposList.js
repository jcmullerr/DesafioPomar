import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Modal } from 'reactstrap';

export class GruposListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { grupos: [], loading: true,excluir : false ,indice : -1 };
  }

  componentDidMount() {
    this.carregarGrupos();
  }

  static renderGruposTable(grupos,me) {
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
        <Link to='/gruposCadastro'>
          <button className='btn btn-primary' style={{marginTop : 10,marginBottom : 10}}>Adicionar</button>
        </Link>
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {grupos.map((x,i) =>
              <tr key={x.id}>
                <td>{x.nome}</td>
                <td>{x.descricao}</td>
                <td> 
                <Link to={'/gruposEdicao/'+x.id}>
                  <button className='btn btn-primary' style={{marginRight : 10}}>Editar</button>
                </Link>
                <button className='btn btn-primary' value='Excluir' onClick={() => me.setState({excluir:true,indice : i})}>Excluir</button>
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
      : GruposListComponent.renderGruposTable(this.state.grupos,this);

    return (
      <div>
        <h1 id="tabelLabel" >Grupos</h1>
        {contents}
      </div>
    );
  }

  async carregarGrupos() {
    
    const response = await fetch('api/grupos');
    const data = await response.json();
    this.setState({ grupos: data, loading: false });
  }

  Excluir = async () => {
    
    await this.ExcluirGrupo(this.state.grupos[this.state.indice]);
  }

  async ExcluirGrupo(model){
    console.log(JSON.stringify(model))
    const response = await fetch('api/grupos',{
      method : 'DELETE',
      body : JSON.stringify(model),
      headers:{
        "Content-Type":"application/json"
      }
    });
    this.carregarGrupos();
    this.setState({indice : -1,excluir : false})
  }
}
