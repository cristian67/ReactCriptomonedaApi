import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import axios from 'axios';

class App extends Component {

  state = {
    monedas:[],
    cotizacion: {},
    monedaCotizada: '',
    cargando: false
  }

  async componentDidMount(){
    this.ObtenerMonedas();

  }



  //--------------------------------------
  //  Obtener id monedas - enviar a Form
  //--------------------------------------
  ObtenerMonedas = async() => {
    const url = `https://api.coinmarketcap.com/v2/ticker/`;

    await axios.get(url)
                .then(respuesta => {
                  //console.log(respuesta.data.data);
                  this.setState({
                    monedas: respuesta.data.data
                  })
                }) 
                .catch(error => {
                  console.log(error);
                });

  }

  //--------------------------------------
  //  Cotizar crypto en base a una mondeda
  //--------------------------------------
  obtenerValoresCrypto = async(monedas) => {
    
    const {moneda,crypto} = monedas;

    const url = `https://api.coinmarketcap.com/v2/ticker/${crypto}/?convert=${moneda}`;

    await axios.get(url)
                .then(respuesta =>{
                  //console.log(respuesta.data.data);
                  this.setState({
                    cargando: true
                  })
                  setTimeout(()=>{
                    this.setState({
                      cotizacion: respuesta.data.data,
                      monedaCotizada: moneda,
                      cargando:false
                    });
                  },3000);
                })
                .catch(error=>{
                  console.log(error);
                });   
    
  }

  render() {
    //CARGANDO...
    const cargando = this.state.cargando;
    let resultadoDeCarga;

    if(cargando){
      resultadoDeCarga =  <div class="sk-folding-cube">
                            <div className="sk-cube1 sk-cube"></div>
                            <div className="sk-cube2 sk-cube"></div>
                            <div className="sk-cube4 sk-cube"></div>
                            <div className="sk-cube3 sk-cube"></div>
                          </div>
    }else{
      resultadoDeCarga = <Resultado 
                      cotizacion = {this.state.cotizacion}
                      monedaCotizada = {this.state.monedaCotizada}
                  />
    }



    return (
      <div className="App">
          <Header 
              titulo = "Cotizar Criptomoneda"
          />
          <div className="row justify-content-center">
              <div className="col-md-6 bg-light pb-4 contenido-principal">
                <Formulario 

                  monedas = {this.state.monedas}
                  obtenerValoresCrypto = {this.obtenerValoresCrypto}
                />

                {resultadoDeCarga}

              </div>
          </div>
      </div>
    );
  }
}

export default App;
