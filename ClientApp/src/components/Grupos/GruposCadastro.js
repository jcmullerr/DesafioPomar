import React, { Component } from 'react';
import { Button, Row } from 'reactstrap';

export class GruposCadastroComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      nome : '',
      descricao : ''
    };
  }

  handleDescricaoChange = (e) => {
    this.setState({descricao : e.targets.value})
  }
  handleIdadeChange = (e) => {
    this.setState({idade : e.targets.value})
  }

  componentDidMount() {
      debugger;
    let id = this.props.match.params.id;
    if (id != undefined)
        this.buscarGrupo(id);
  }

  static renderGrupoCRUD() {
    return (
      <div>
          <form>
              <div className='row'>
                <label>Nome</label>
                <input type='text' className='form-control'></input>
              </div>
              <div className='row'>
                <label>Descricao</label>
                <input type='text' className='form-control'></input>
              </div>
              <div className='row'>
                <Button className='btn btn-primary col-2' style={{marginTop : 10}} onClick={() => alert(this.descricaoRef.current)}>Salvar</Button>
              </div>
          </form>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : GruposCadastroComponent.renderGrupoCRUD(this.state.grupo);

    return (
      <div>
        <h1 id="tabelLabel" >Grupos Cadastro</h1>
        {contents}
      </div>
    );
  }

  async buscarGrupo(id) {
    const response = await fetch(`api/grupo/${Number(id)}`);
    const data = await response.json();
    this.setState({
      nome : data.nome,
      descricao : data.descricao
    })
  }
}
