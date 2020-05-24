import React, { Component } from 'react';
import { Button, Row } from 'reactstrap';

export class ArvoresCadastroComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      id : null,
      descricao : '',
      idade : 0,
      grupoId : 0,
      especieId : 0,
      grupos : [],
      especies : []
    };
  }

  handleDescricaoChange = (e) => {
    
    this.setState({descricao :e.target.value})
  }

  handleIdadeChange = (e) => {
    this.setState({idade :e.target.value})
  }
  handleGrupoChange = (e) => {
    
    this.setState({grupoId :e.target.value})
  }
  handleEspecieChange = (e) => {
    
    this.setState({especieId :e.target.value})
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    if (id != undefined)
        this.buscarArvore(id);
    await this.getEspecies();
    await this.getGrupos();
  }

  static renderArvoresCRUD( me) {
    return (
      <div>
          <form>
              <div className='row'>
                <label>Descricao</label>
                <input type='text' className='form-control' value ={me.state?.descricao ?? ''} onChange={me.handleDescricaoChange}/>
              </div>
              <div className='row'>
                <label>Idade</label>
                <input type='number' className='form-control' min='0' max='200' value ={me.state?.idade ?? ''} onChange={me .handleIdadeChange}/>
              </div>
              <div className='row'>
                <label>Grupo</label>
                <select className='form-control' onChange={me.handleGrupoChange} value={me.state.grupoId}>
                  {
                    me.state.grupos.map(x => <option value={x.id} key={x.id}>{x.nome}</option>)
                  }
                </select>
              </div>
              <div className='row'>
                <label>Especie</label>
                <select className='form-control' onChange={me.handleEspecieChange} value={me.state.especieId}>
                  {
                    me.state.especies.map(x => <option value={x.id} key={x.id}>{x.descricao}</option>)
                  }
                </select>
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
      : ArvoresCadastroComponent.renderArvoresCRUD(this);

    return (
      <div>
        <h1 id="tabelLabel" >Arvores Cadastro</h1>
        {contents}
      </div>
    );
  }

  getGrupos = async () => {
    const response = await fetch(`api/grupos`);
    const data = await response.json();
    this.setState({grupos : data});
    if (data.length > 0)
      this.setState({grupoId : data[0].id})
  }

  getEspecies = async () => {
    const response = await fetch(`api/especies`);
    const data = await response.json();
    this.setState({especies : data});
    if (data.length > 0)
      this.setState({especieId : data[0].id})
  }

  async buscarArvore(id) {
    
    const response = await fetch(`api/arvores/${Number(id)}`);
    const data = await response.json();
    this.setState({
      id : data.id,
      descricao : data.descricao,
      idade : data.idade,
      grupoId : data.grupoId,
      especieId : data.especieId
    });
  }

  Salvar = async () => {
    if(this.state.id != null)
      await this.Update();
    else
      await this.Insert();  
    
    this.props.history.push('/arvores')
  }

  Insert = async () => {
    
    let arvore = this.montarArvore();
    console.log(JSON.stringify(arvore))
    const response = await fetch(`api/arvores`,{
      method : 'POST',
      body : JSON.stringify(arvore),
      headers:{
        "Content-Type":"application/json"
      } 
    });
    const data = await response.json();
  }

  Update = async () => {
    let arvore = this.montarArvore();
    const response = await fetch(`api/arvores`,{
      method : 'PUT',
      body : JSON.stringify(arvore),
      headers:{
        "Content-Type":"application/json"
      } 
    });
  }

  montarArvore = () => {
    let id = this.state.id == null ? this.state.id : Number(this.state.id);
    return {
      id : id,
      descricao : this.state.descricao,
      idade : Number(this.state.idade),
      grupoId : Number(this.state.grupoId),
      especieId : Number(this.state.especieId),
      especie : '',
      grupo : ''
    }
  }
}
