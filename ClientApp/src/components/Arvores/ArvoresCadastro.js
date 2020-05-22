import React, { Component } from 'react';
import { Button, Row } from 'reactstrap';

export class ArvoresCadastroComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      descricao : '',
      idade : 0,
      grupo : '',
      especie : ''
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
        this.buscarArvore(id);
  }

  static renderArvoresCRUD() {
    return (
      <div>
          <form>
              <div className='row'>
                <label>Descricao</label>
                <input type='text' className='form-control' value ={this.state?.descricao ?? ''} onChange={this.handleDescricaoChange}></input>
              </div>
              <div className='row'>
                <label>Idade</label>
                <input type='number' className='form-control' min='0' max='200' value ={this.state?.descricao ?? ''} onChange={this.handleIdadeChange}></input>
              </div>
              <div className='row'>
                <label>Grupo</label>
                <select className='form-control'></select>
              </div>
              <div className='row'>
                <label>Especie</label>
                <select className='form-control'></select>
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
      : ArvoresCadastroComponent.renderArvoresCRUD(this.state.Arvores);

    return (
      <div>
        <h1 id="tabelLabel" >Arvores Cadastro</h1>
        {contents}
      </div>
    );
  }

  async buscarArvore(id) {
    const response = await fetch(`api/arvores/${Number(id)}`);
    const data = await response.json();
    this.setState({
      descricao : data.descricao,
      idade : data.idade,
      grupo : data.grupo,
      especie: data.especie
    })
  }
}
