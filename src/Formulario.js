//Formulario.js
//este ficheiro irá conter o código para representar o formulário no ecrã
//********************************* */

import React from 'react'


// /**
//  * Mostra uma lista com os Componentes existentes,
//  * para o utilizador escolher um
//  */
//  const EscolheComponente = (props) => {
//     // vamos recuperar os dados do parâmetro de entrada: inListaComponentes
//     // o 'map' funciona como um 'foreach' que irá iterar todos os items dos dados lidos
//     const opcoes = props.inListaComponentes.map((componente) => {
//         return (
//             <option key={componente.idComponentes}
//                 required
//                 value={componente.idComponentes}>{componente.titulo}
//             </option>
//         );
//     }
//     )

//     return (
//         <select required className="form-select" onChange={props.outIdComponenteEscolhido}>
//             <option value="">Escolha um Componente</option>
//             {opcoes}
//         </select>
//     );
// }




/**
 * Formulário para adicionar (fazer upload) de um Componente
 */
 class Formulario extends React.Component{

    constructor(props){
        super(props);

        //variáveis para guardar os dados introduzidos pelo utilizador, no formulário
        this.state = {
            nome:"",
            foto:null,
            descricao:"",
            preco:"",
            stock:"",
        } 
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Componente
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerComponenteChange = (evento) =>{
        //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
            evento.target.setCustomValidity("Nome do Componente Inválido");
            return;
        }else {
            evento.target.setCustomValidity("");
        }

        //guardar os dados recolhidos
        this.setState({
            nome: evento.target.value
        });
    }


    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Componente
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerDescricaoChange = (evento) =>{
        //guardar os dados recolhidos
        this.setState({
            descricao: evento.target.value
        });
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Componente
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerPrecoChange = (evento) =>{
        //guardar os dados recolhidos
        this.setState({
            preco: evento.target.value
        });
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Componente
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerStockChange = (evento) =>{
       
        //guardar os dados recolhidos
        this.setState({
            stock: evento.target.value
        });
    }


        // //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        // if(/\d/.test(evento.target.value)){
        //     evento.target.setCustomValidity("Nome do Componente Inválido");
        //     return;
        // }else {
        //     evento.target.setCustomValidity("");
        // }

        // //guardar os dados recolhidos
        // this.setState({
        //     nome: evento.target.value
        // });
    
    /**
     * processar os dados fornecidos pelo utilizador no upload da foto do Componente
     * @param {} evento - dados adicionados pelo utilizador
     */
    handlerFotoChange = (evento) => {
        //guardar os dados recolhidos 
        this.setState({
            foto: evento.target.files[0]
        });
    }

    /**
     * handler para processar os dados fornecidos pelo Formulário
     * @param {*} evento 
     */
    handlerSubmitForm = (evento) =>{
        //impedir o formulário de autoenviar os dados para o servidor
        //essa tarefa cabe ao componente App.js
        evento.preventDefault();
        
        //prepração dos dados para serem enviados para a App.js
        //podemos já enviar os dados prontos para serem adicionados à API
        let dadosFormulario = {
            Nome: this.state.nome,
            UpFotografia: this.state.foto,
            Descricao: this.state.descricao,
            Preco: this.state.preco,
            Stock: this.state.stock
        };

        //concretizar a exportação dos dados para a App.js
        this.props.outDadosFotos(dadosFormulario);
    }

    render(){
        // ler os dados que foram/são fornecidos à Tabela5,
        // como parâmetro de entrada/saída
        //const { inDadosComponentes } = this.props;

        return(
            //o 'return' só consegue devolver um objeto
            <form onSubmit={this.handlerSubmitForm} encType="multipart/form-data">
                <div className="row">
                <div className="col-md-4">
                        {/* Componente: <EscolheComponente inListaComponentes={inDadosComponentes}
                        outIdComponenteEscolhido={this.handlerComponenteChange}/><br /> */}
                        Nome do Componente: <input type="text"
                                value={this.state.nome}
                                onChange={this.handlerComponenteChange}
                                className="form-control btn btn-outline-secondary" /><br />
                </div>
                <div className="col-md-4">  
                        Foto do Componente: <input type="file" 
                                        required
                                        accept=".jpg,.png,.JPG,.PNG"
                                        onChange={this.handlerFotoChange}
                                        className="form-control" /><br />  
                </div>
                <div className="col-md-4">  
                        Descrição: <input type="text"
                                value={this.state.descricao}
                                onChange={this.handlerDescricaoChange}
                                className="form-control btn btn-outline-secondary" /><br />  
                </div>
                <div className="col-md-4">  
                        Preço: <input type="text"
                                value={this.state.preco}
                                onChange={this.handlerPrecoChange}
                                className="form-control btn btn-outline-secondary" /><br />  
                </div>
                <div className="col-md-4">  
                        Stock: <input type="text"
                                value={this.state.stock}
                                onChange={this.handlerStockChange}
                                className="form-control btn btn-outline-secondary" /><br />  
                </div>
                </div>
                <br />
                <br />
                    <input type="submit" value="Adicionar Componente" className="btn btn-secondary" /><br /><br /> 
            </form>
            
        )
    }
}

export default Formulario;