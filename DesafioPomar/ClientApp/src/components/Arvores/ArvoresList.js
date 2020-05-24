import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Modal } from 'reactstrap';

export class ArvoresListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { Arvores: [], loading: true, excluir : false ,indice : -1};
  }

  componentDidMount() {
    this.carregarArvores();
  }

  static renderArvoresTable(arvores,me) {
    return (
      <div>
        <Modal isOpen={me.state.excluir}>
          <div style={{margin:10}}>
            <h3>Confirmacao</h3>
            <p>Tem certeza que deseja excluir ?</p>
            <div>
              <button className='btn btn-primary' style={{margin:10}} onClick={() => me.Excluir()}>Sim</button>
              <button className='btn btn-secondary' onClick={() => me.setState({excluir : false, itemId : -1})}>Não</button>
            </div>
          </div>
        </Modal>
        <Link to='/arvoresCadastro'>
          <button className='btn btn-primary' style={{marginTop : 10,marginBottom : 10}}>Adicionar</button>
        </Link>
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Descricao</th>
              <th>Idade</th>
              <th>Especie</th>
              <th>Grupo</th>
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {arvores.map((x,i) =>
              <tr key={x.id}>
                <td>{x.descricao}</td>
                <td>{x.idade}</td>
                <td>{x.especie}</td>
                <td>{x.grupo}</td>
                <td> 
                <Link to={'/arvoresEdicao/'+x.id}>
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
      : ArvoresListComponent.renderArvoresTable(this.state.Arvores,this);

    return (
      <div>
        <h1 id="tabelLabel" >Arvores</h1>
        {contents}
      </div>
    );
  }

  async carregarArvores() {
    const response = await fetch('api/arvores');
    const data = await response.json();
    this.setState({ Arvores: data, loading: false });
  }

  Excluir = async () => {
    await this.ExcluirArvore(this.state.Arvores[this.state.indice]);
  }

  async ExcluirArvore(model){
    console.log(JSON.stringify(model))
    const response = await fetch('api/arvores',{
      method : 'DELETE',
      body : JSON.stringify(model),
      headers:{
        "Content-Type":"application/json"
      }
    });
    this.carregarArvores();
    this.setState({indice : -1,excluir : false})
  }
}
