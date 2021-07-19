// *****************************************
// App.js
// *****************************************

import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';


// importar componentes
import Tabela from './Tabela';
import Formulario from './Formulario';

/**
 * Função que irá ler os dados (Componentes) da API
 */
async function getComponentes() {

  // ler os dados da API
  // https://create-react-app.dev/docs/proxying-api-requests-in-development/
  let resposta = await fetch("api/ComponentesAPI/");

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  return await resposta.json();
}

/**
 * invoca a API e envia os dados do novo Componente
 * @param {} dadosNovoComponente 
 */
async function adicionaComponentes(dadosNovoComponente) {
  let formData = new FormData();
  formData.append("Nome", dadosNovoComponente.Nome);
  formData.append("UpFotografia", dadosNovoComponente.UpFotografia);
  formData.append("Descricao", dadosNovoComponente.Descricao);
  formData.append("Preco", dadosNovoComponente.Preco);
  formData.append("Stock", dadosNovoComponente.Stock);
  


  // formData.append("ComponenteFK",dadosNovoComponente.ComponenteFK);
  let resposta = await fetch("api/ComponentesAPI", {
    method: "POST",
    body: formData
  });

  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo Componente. Código= ' + resposta.status);
  }

  //Devolver os dados a seres usados na componente
  return await resposta.json();
}

async function removeComponente(dadoscomponenteremover) {
  let formData = new FormData();
  formData.append("idComponentes", dadoscomponenteremover.idComponentes);

  let resposta = await fetch("api/ComponentesAPI/" + dadoscomponenteremover.idComponentes, {
    method: "DELETE",
    body: formData
  });

  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo Componente. Código= ' + resposta.status);
  }

  //Devolver os dados a seres usados na componente
  return await resposta.json();

}



/**
 * Componente principal do meu projeto
 */
class App extends React.Component {


  /**
   * Construtor da classe -> tem sempre este nome
   */
  constructor(props) {
    super(props); // <--- esta É SEMPRE a primeira instrução

    this.state = {
      /**
       * array que irá conter os dados dos Componentes, vindas da API
       */
       componentes: [],
      /**
       * variável para conter o 'estado' da app, 
       * no carregamento dos dados das Fotografias, da API
       * @type{"carregando dados" | "sucesso" | "erro"}
       */
      loadState: "",
      /**
       * guarda a mensagem de erro, se algo correr mal
       */
      errorMessage: null
    }
  }

  /**
   * Quando o objeto é criado, executa o código aqui escrito
   * Vamos usá-lo para carregar os dados da API
   */
  componentDidMount() {
    // ler os dados dos Componentes e adicioná-los à state 'componentes'
    this.Loadcomponentes();
  }

  /**
   * Carrega os dados dos componentes da API e adiciona-os ao array 'componentes'
   */
  async Loadcomponentes() {
    /* Tarefas:
     *   1. Ler os dados da API (fetch)
         2. atualizar os dados na var. state
     */
    try {
      // 1.
      this.setState({ loadState: "carregando dados" });
      let componentesVindosDaAPI = await getComponentes();

      // 2.
      // esta não é a forma correta: this.state.fotos = fotosVindosDaAPI;
      this.setState({
        componentes: componentesVindosDaAPI,
        loadState: "sucesso"
      });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Erro na leitura dos componentes da API", erro);
    }
  }


  /**
 * método que sabe identificar o 'anime' que deverá ser retirado da tabela
 * @param {*} idComponentes - dados do anime a remover
 */
  handlerremovecomponente = async (idComponentes) => {
    /*
     * Tarefas:
     * 1 - preparar os dados para serem enviados para a API
     * 2 - enviar os dados para a API
     * 3 - efetuar o reload da tabela 
     */
    /**
    * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
    */
    try {
      //Ponto 2
      await removeComponente(idComponentes);

      //Ponto 3
      await this.Loadcomponentes();
    } catch (erro) {
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo componentes; ", erro)
    }
    window.location.reload();
  }


  /**
     * processar os dados recolhidos pelo Formulário
     * @param {*} dadosDoFormulario 
     */

  handlerDadosForm = async (dadosdoFormulario) => {
    /* 
     * Tarefas:
     * 1 - preparar os dados para serem enviados para a API
     * 2 - enviar os dados para a API
     * 3 - efetuar o reload da tabela 
     **/

    /*
     * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
     **/

    try {
      //Ponto 2
      await adicionaComponentes(dadosdoFormulario);

      //Ponto 3
      await this.Loadcomponentes();
    } catch (erro) {
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo Componente; ", erro)
    }
    window.location.reload();
  }


  render() {
    //recuperar os dados do 'state' para usar dentro deste método
    const { componentes } = this.state;

    //determinar o comportamento do 'componente', 
    //em função do seu estado
    switch (this.state.loadState) {
      case "carregando dados":
        return <p>A carregar os dados. Aguarde, por favor.</p>
      case "erro":
        return <p>Ocorreu um erro: {this.state.errorMessage + '.' ?? "Não sabemos qual"}</p>
      case "sucesso":
        return (
          <div className="container">
            <h1>Fotografias dos Componentes</h1>
            {/* adição do Formulário que há-de recolher os dados da nova fotografia */}
            <Formulario inDadosComponentes={componentes} outDadosFotos={this.handlerDadosForm} />

            <div className="row">
              <div className="col-md-20">
                <hr />
                <h4>Tabela com os Componentes</h4>
                {/* Tabela5 tem um 'parâmetro de entrada', chamado 'inDadosFotos'.
                Neste caso, está a receber o array JSON com os dados das fotos dos Componentes,
                lidos da API */}
                <Tabela inDadosComponentes={componentes} componentes={this.handlerremovecomponente} />
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  }
}
export default App;