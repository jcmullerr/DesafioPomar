import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class ColheitasCadastroComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      id : null,
      informacoes : '',
      dataColheita : new Date().toISOString().substr(0, 10),
      pesoBruto : 0.00,
      isArvore : true,
      arvoreId : null,
      grupoId : null,
      arvores : [],
      grupos : []
    };
    console.log(this.state.dataColheita);
  }

  async componentDidMount() {
    debugger;
    let id = this.props.match.params.id;
    await this.carregarArvores();
    await this.carregarGrupos();
    if (id != undefined)
        this.buscarColheita(id);
  }

  static renderColheitaCRUD(me) {
    return (
    <div>
        <form>
            <div className='row'>
                <label>Informações</label>
                <input type='text' className='form-control' onChange={me.handleInformacoesChange} value={me.state.informacoes}/>
            </div>
            <div className='row'>
                <label>Data da colheita</label>
                <input type='date' className='form-control' onChange={me.handleDataColheitaChange} value={me.state.dataColheita}/>
            </div>
            <div className='row'>
                <label>Peso bruto</label>
                <input type='number' className='form-control' onChange={me.handlePesoBrutoChange} value={me.state.pesoBruto}/>
            </div>
            <div className='row'>
                { me.renderCombo()}
                <div className='col-2'>
                    <label>Tipo</label>
                    <select className='form-control' onChange={me.handleTipoChange}>
                        <option value='A'>Arvore</option>
                        <option value='G'>Grupo</option>
                    </select>
                </div>
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
      : ColheitasCadastroComponent.renderColheitaCRUD(this);

    return (
      <div>
        <h1 id="tabelLabel" >Colheitas Cadastro</h1>
        {contents}
      </div>
    );
  }

  async buscarColheita(id) {
    const response = await fetch(`api/Colheitas/${Number(id)}`);
    const data = await response.json();
    this.setState({
        id : data.id,
        informacoes : data.informacoes,
        dataColheita : new Date(data.dataColheita).toISOString().substr(0,10),
        pesoBruto : data.pesoBruto,
        arvoreId : data.arvoreId,
        grupoId : data.grupoId,
        isArvore : data.arvoreId != null
    })
  }

  renderCombo = () => {
    if(this.state.isArvore)
        return (
            <div className='row col'>
                <label>Árvores</label>
                <select className='form-control' onChange={this.handleArvoreChange} value={this.state.arvoreId}>
                    {this.state.arvores.map(x => <option key={x.id} value={x.id}>{x.descricao}</option>)}
                </select>
            </div>
        )
    else
        return(
            <div className='row col'>
                <label>Grupos</label>
                <select className='form-control' onChange ={this.handleGrupoChange} value={this.state.grupoId}>
                    {this.state.grupos.map(x => <option key={x.id} value={x.id}>{x.nome}</option>)}
                </select>
            </div>
        );    
  }

  handleInformacoesChange = (e) => {
    this.setState({informacoes : e.target.value})
  }

  handleDataColheitaChange = (e) => {
    this.setState({dataColheita : new Date(e.target.value).toISOString().substr(0, 10)})
  }

  handlePesoBrutoChange = (e) => {
    this.setState({pesoBruto : e.target.value})
  }

  handleArvoreChange = (e) => {
    this.setState({arvoreId : e.target.value})
  }

  handleGrupoChange = (e) => {
    this.setState({grupoId : e.target.value})
  }

  handleTipoChange = (e) => {
    let arvoreId = e.target.value == "A" ? this.state.arvores[0].id : null
    let grupoId = e.target.value == "G" ? this.state.grupos[0].id : null
    this.setState({
        isArvore : e.target.value == "A", 
        arvoreId : arvoreId,
        grupoId : grupoId
    })
  }

  Salvar = async () => {
    if(this.state.id != null)
      await this.Update();
    else
      await this.Insert();  
    
    this.props.history.push('/')
  }

  Insert = async () => {
    let colheita = this.montarColheita();
    console.log(JSON.stringify(colheita))
    const response = await fetch(`api/Colheitas`,{
      method : 'POST',
      body : JSON.stringify(colheita),
      headers:{
        "Content-Type":"application/json"
      } 
    });
    const data = await response.json();
  }

  Update = async () => {
    let colheita = this.montarColheita();
    const response = await fetch(`api/Colheitas`,{
      method : 'PUT',
      body : JSON.stringify(colheita),
      headers:{
        "Content-Type":"application/json"
      } 
    });
  }

  montarColheita = () => {
    debugger;
    let id = this.state.id == null ? this.state.id : Number(this.state.id);
    return {
      id : id,
      informacoes : this.state.informacoes,
      dataColheita : new Date(this.state.dataColheita).toISOString().substr(0,10),
      pesoBruto : Number(this.state.pesoBruto),
      arvoreId :  this.state.arvoreId == null ? null : Number(this.state.arvoreId),
      grupoId : this.state.grupoId == null ? null : Number(this.state.grupoId)
    }
  }

  async carregarGrupos() {
    const response = await fetch('api/grupos');
    const data = await response.json();
    this.setState({ grupos: data });
  }

  async carregarArvores() {
    const response = await fetch('api/arvores');
    const data = await response.json();
    let id = null;
    if(data.length > 0)
        id = data[0].id
    this.setState({ arvores: data, arvoreId : id });
  }
}
