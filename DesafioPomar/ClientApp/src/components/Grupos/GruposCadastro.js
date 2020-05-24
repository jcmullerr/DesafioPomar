import React, { Component } from 'react';
import { Button, Row } from 'reactstrap';

export class GruposCadastroComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      id : null,
      nome : '',
      descricao : ''
    };
  }

  handleNomeChange = (e) => {
    this.setState({nome : e.target.value})
  }
  handleDescricaoChange = (e) => {
    this.setState({descricao : e.target.value})
  }

  componentDidMount() {
      
    let id = this.props.match.params.id;
    if (id != undefined)
        this.buscarGrupo(id);
  }

  static renderGrupoCRUD(me) {
    return (
      <div>
          <form>
              <div className='row'>
                <label>Nome</label>
                <input type='text' className='form-control' onChange={me.handleNomeChange} value={me.state.nome}></input>
              </div>
              <div className='row'>
                <label>Descricao</label>
                <input type='text' className='form-control' onChange={me.handleDescricaoChange} value={me.state.descricao}></input>
              </div>
              <div className='row'>
                <Button className='btn btn-primary col-2' style={{marginTop : 10}} onClick={me.Salvar}>Salvar</Button>
              </div>
          </form>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : GruposCadastroComponent.renderGrupoCRUD(this);

    return (
      <div>
        <h1 id="tabelLabel" >Grupos Cadastro</h1>
        {contents}
      </div>
    );
  }

  async buscarGrupo(id) {
    const response = await fetch(`api/grupos/${Number(id)}`);
    const data = await response.json();
    this.setState({
      id : data.id,
      nome : data.nome,
      descricao : data.descricao
    })
  }

  Salvar = async () => {
    
    if(this.state.id != null)
      await this.Update();
    else
      await this.Insert();  
    
    this.props.history.push('/grupos')
  }

  Insert = async () => {
    
    let Grupo = this.montarGrupo();
    console.log(JSON.stringify(Grupo))
    const response = await fetch(`api/grupos`,{
      method : 'POST',
      body : JSON.stringify(Grupo),
      headers:{
        "Content-Type":"application/json"
      } 
    });
    const data = await response.json();
  }

  Update = async () => {
    let Grupo = this.montarGrupo();
    const response = await fetch(`api/grupos`,{
      method : 'PUT',
      body : JSON.stringify(Grupo),
      headers:{
        "Content-Type":"application/json"
      } 
    });
  }

  montarGrupo = () => {
    let id = this.state.id == null ? this.state.id : Number(this.state.id);
    return {
      id : id,
      descricao : this.state.descricao,
      nome : this.state.nome
    }
  }
}
