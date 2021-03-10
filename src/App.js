import React, {useState} from 'react'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import './App.css'
import Carregando from '../src/images/Spinner-1s-200px.svg'
import { MdClear, MdMoveToInbox } from "react-icons/md";

//JSX Java script eXtension
//Hook - useState
function App(){
  const [pessoas, setPessoas] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [idade, setIdade] = useState('')
  const [etnia, setEtnia] = useState('')
  // const estiloIcone = {} estilos para o icone

  function ListaPessoas(){
    const listagemPessoas = pessoas.map((pessoa)=>
    <img key={pessoa.id} src= {pessoa.urls[4][512]} title="Gerada por IA"
      alt= "Pessoa Gerada por IA" />
      )
      return (
        <> {listagemPessoas} </>
      )
  }

  async function obterFoto(){
    setCarregando(true)
    let chaveAPI = process.env.REACT_APP_APIKEY
    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''
    const filtraIdade = idade.length > 0 ? `&age=${idade}` : ''

    let url= 
`https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraEtnia}${filtraIdade}&order_by=random`
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setPessoas(data.faces)
      console.log('Dados carregados com sucesso!')
    } )
    .catch(function(error) {
      console.error('Houve um problema na requisição: '+ error.message)
    })
    setCarregando(false)
}

  return (
  <div className="App">
    <h1> Gerador de Fotos via IA</h1>
    {carregando && 
      <img src={Carregando} title="Aguarde..." alt="Aguarde, dados sendo carregados" />
    }
    <Robot />
    {
    
    }
    <div className="fotos">
       <ListaPessoas />


    </div>
   
   <div className="linha">
      <label>Idade:</label>
      <select onChange = {event => setIdade(event.target.value)}>
      <option value="">Todas</option>
      <option value="infant">infantil</option>
      <option value="child">Criança</option>
      <option value="young-adult">Jovem</option>
      <option value="adult">Adulto</option>
      <option value="elderly">Idoso</option>
      </select>
    <label>Etnia:</label>
    <select onChange = {e => setEtnia(e.target.value)}> 
    <option value="">Todas</option>
      <option value="white">Branca</option>
      <option value="latino">Latina</option>
      <option value="asian">Asiática</option>
      <option value="black">Negra</option>
    </select>

   </div>


  <div className="linha"></div>
    <button type='button' onClick={obterFoto}>

         <MdMoveToInbox/> OBTER IMAGENS
    </button>
    {pessoas.length > 0 &&
    <button type ='button' onClick={() => setPessoas ([])}>
      <MdClear/> Limpar imagens
      {/* <MdClear style  {estiloIcone} />  */}
    </button>
    }
    
  
   
  </div>
  )
}

export default App 