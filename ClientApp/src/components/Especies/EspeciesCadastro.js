import React, { Component } from 'react';
import { Button, Row } from 'reactstrap';

export class EspeciesCadastroComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      id : null,
      descricao : ''
    };
  }

  handleDescricaoChange = (e) => {
    this.setState({descricao : e.target.value})
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id != undefined)
        this.buscarEspecie(id);
  }

  static renderEspecieCRUD(me) {
    return (
      <div>
          <form>
              <div className='row'>
                <label>Descricao</label>
                <input type='text' className='form-control' onChange={me.handleDescricaoChange} value={me.state.descricao}/>
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
      : EspeciesCadastroComponent.renderEspecieCRUD(this);

    return (
      <div>
        <h1 id="tabelLabel" >Especies Cadastro</h1>
        {contents}
      </div>
    );
  }

  async buscarEspecie(id) {
    debugger;
    const response = await fetch(`api/Especies/${Number(id)}`);
    const data = await response.json();
    this.setState({
      descricao : data.descricao,
      id : data.id
    })
  }

  Salvar = async () => {
    if(this.state.id != null)
      await this.Update();
    else
      await this.Insert();  
    
    this.props.history.push('/especies')
  }

  Insert = async () => {
    debugger;
    let Especie = this.montarEspecie();
    console.log(JSON.stringify(Especie))
    const response = await fetch(`api/Especies`,{
      method : 'POST',
      body : JSON.stringify(Especie),
      headers:{
        "Content-Type":"application/json"
      } 
    });
    const data = await response.json();
  }

  Update = async () => {
    let Especie = this.montarEspecie();
    const response = await fetch(`api/Especies`,{
      method : 'PUT',
      body : JSON.stringify(Especie),
      headers:{
        "Content-Type":"application/json"
      } 
    });
  }

  montarEspecie = () => {
    let id = this.state.id == null ? this.state.id : Number(this.state.id);
    return {
      id : id,
      descricao : this.state.descricao,
    }
  }
}
