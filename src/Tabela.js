// Tabela.js
// ****************************************************** 

import React from 'react'

// função que devolve o Cabeçalho da tabela
function CabecalhoTabela() {
    return (
        <thead>
            <tr>
                {/* <th>Id do Componente</th> */}
                <th>Nome do Componente</th>
                <th>Foto do Componente</th>
                <th>Descrição </th>
                <th>Preço </th>
                <th>Stock </th>
            </tr>
        </thead>
    )
}

// definição da função que devolve o Corpo da tabela
// faz exatamente o mesmo da linha 7
const CorpoTabela = (props) => {
    // esta função 'interna' irá ler e processar todos
    // os objetos definidos dentro do array 'dadosDosComponentes'
    const rows = props.dadosDosComponentes.map((row) => {
        return (
            <tr key={row.idComponentes}>
                {/* <td>{row.idComponentes}</td> */}
                <td><br></br><br></br>{row.nome}</td>
                <td><img src={'fotos/' + row.foto}
                    alt={'foto do ' + row.nome}
                    height="150" width="120"/>
                </td>
                <td><br></br><br></br>{row.descricao}</td>
                <td><br></br><br></br>{row.preco}</td>
                <td><br></br><br></br>{row.stock}</td>
                <td>
                <br></br><br></br>
                
                </td>
                <td>
                <br></br><br></br>
                <button className="btn btn-secondary" onClick={()=>props.componenteAremover(row)}>Delete</button>
                </td>
            </tr>

        )
    })

    // valor devolvido pela função 'CorpoTabela'
    return (<tbody>{rows}</tbody>)
}

// componente que junta os dois sub-componentes, 
// formando um novo 'componente'
class Tabela extends React.Component {
    render() {

        // estamos a ler os dados que são recebidos pelo componente
        // <=> this.props.dadosAlunos
        const { inDadosComponentes, componentes } = this.props

        return (
            <table className="table table-striped">
                <CabecalhoTabela />
                {/* o parâmetro 'dadoscomponentes' irá receber
                    os dados que vêm da componente 'mãe' */}
                <CorpoTabela dadosDosComponentes={inDadosComponentes} componenteAremover={componentes} />
            </table>
        );
    }
}


export default Tabela

