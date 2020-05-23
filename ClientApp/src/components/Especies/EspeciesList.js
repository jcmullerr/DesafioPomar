import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Modal } from 'reactstrap';

export class EspeciesListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { especies: [], loading: true ,excluir : false ,indice : -1  };
  }

  componentDidMount() {
    this.carregarEspecies();
  }

  static renderEspeciesTable(Especies,me) {
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
        <Link to='/EspeciesCadastro'>
          <button className='btn btn-primary' style={{marginTop : 10,marginBottom : 10}}>Adicionar</button>
        </Link>
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Especies.map((x,i) =>
              <tr key={x.id}>
                <td>{x.descricao}</td>
                <td> 
                <Link to={'/EspeciesEdicao/'+x.id}>
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
      : EspeciesListComponent.renderEspeciesTable(this.state.especies,this);

    return (
      <div>
        <h1 id="tabelLabel" >Especies</h1>
        {contents}
      </div>
    );
  }

  async carregarEspecies() {
    debugger;
    const response = await fetch('api/Especies');
    const data = await response.json();
    this.setState({ especies: data, loading: false });
  }

  Excluir = async () => {
    await this.ExcluirEspecie(this.state.especies[this.state.indice]);
  }

  async ExcluirEspecie(model){
    debugger;
    console.log(JSON.stringify(model))
    const response = await fetch('api/Especies',{
      method : 'DELETE',
      body : JSON.stringify(model),
      headers:{
        "Content-Type":"application/json"
      }
    });
    this.carregarEspecies();
    this.setState({indice : -1,excluir : false})
  }
}
