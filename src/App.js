

import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";
import React, { useState, useEffect } from 'react';
import palavras from "./palavras"

const forcas = [
    forca0,
    forca1,
    forca2,
    forca3,
    forca4,
    forca5,
    forca6,
]



const alfabeto = [
    {letra: "a"},
    {letra: "b"},
    {letra: "c"},
    {letra: "d"},
    {letra: "e"},
    {letra: "f"},
    {letra: "g"},
    {letra: "h"},
    {letra: "i"},
    {letra: "j"},
    {letra: "k"},
    {letra: "l"},
    {letra: "m"},
    {letra: "n"},
    {letra: "o"},
    {letra: "p"},
    {letra: "q"},
    {letra: "r"},
    {letra: "s"},
    {letra: "t"},
    {letra: "u"},
    {letra: "v"},
    {letra: "w"},
    {letra: "x"},
    {letra: "y"},
    {letra: "z"}

]


const p = palavras[Math.floor(Math.random() * palavras.length)]
const pSemAcento = p.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace("ç", "c")
const pSplited = pSemAcento.split("");
const pSplitedComAcento = p.split("")
let semRepetidos = pSplited.filter((este, i) => pSplited.indexOf(este) === i);
console.log(p)
console.log(pSemAcento)


function TeclasPadrao(props){
    
    return(
        <button disabled = {(props.boolerrou === true) ? true : props.bool2} onClick = {() => props.teclageral(props.letra)} class="teclas">{props.letra}</button>
    )
}

function TeclasDesabilitadas(props){
    return(
        <button disabled class="teclas">{props.letra}</button>
    )
}

function Tecla(props) {

    
    let [bool2, setBool2] = React.useState(false);

    

    function teclaGeral(index){
        setBool2(true)
        props.function(index)
    }

    return (
        <>
        {(props.boolescolhe === true) ? <TeclasPadrao boolerrou = {props.boolerrou} bool2 = {bool2} teclageral = {teclaGeral} letra = {props.letra} /> : <TeclasDesabilitadas letra = {props.letra}/>}      
        </>
    )
        
}

function GeraTecla(props){
    
    return (
        <>
            {alfabeto.map((fator) => <Tecla boolerrou = {props.boolerrou}letra={fator.letra} function={props.function} boolescolhe={props.boolescolhe}/>)}
        </>
    )
    
}

function TeclaDesativada(props){
    return (
        <button disabled class="teclas">{props.letra}</button>
    )
}

function GeraTeclaDesativada(){
    return(
        <>
            {alfabeto.map((fator) => <TeclaDesativada letra={fator.letra}/>)}
        </>
    )
}


function Englobapalavra(props) {

    

    function Apenaspalavra(props) {

        
        const boolean = props.letrasescolhidas.includes(props.letradapalavra)

        return (
            
            <>
                <p class={(boolean=== true) ? "escolhida" : "hidden"}>{props.letradapalavra}</p>

                <p class={(boolean=== true) ? "hidden" : "escolhida"} >_</p>
            </>
        )
    }

    function Gerapalavra(props){
        return(
            <>{pSplited.map((fator) => <Apenaspalavra letradapalavra={fator} letrasescolhidas = {props.letrasescolhidas}/>)}</>
        )
    }



    function Palavranormal(props){
        return (
            <Gerapalavra letrasescolhidas = {props.letrasescolhidas}/>
        )
    }

    function Acertou(props){
        return(
            <>
                <p class="green">{props.letradapalavra}</p>

            </>
        )
    }

    function Palavraverde(){
        return(
            <>{pSplitedComAcento.map((fator) => <Acertou letradapalavra={fator}/>)}</>
        )
    }
    
    return (
        <div class="palavra">
            <button onClick = {(props.boolAcertou === true) ? props.recomeca : props.function} class="botao-escolher">Escolher palavra</button>
            <div class={(props.boolEscolhe === true) ? "engloba-letras" : "hidden"}>
                {(props.boolAcertou === true) ? <Palavraverde/> : <Palavranormal letrasescolhidas = {props.letrasescolhidas}/>}
            </div>
        </div>
    )

}

export default function App() {

    let [arrForcas, setArrForcas] = React.useState([forca0, forca1, forca2, forca3, forca4, forca5, forca6]);
    let [imgForca, setImgForca] = React.useState(arrForcas[0]);
    let [letrasescolhidas, setLetrasescolhidas] = React.useState([]);
    let [contadorAcertos, setContadorAcertos] = React.useState(0);
    let [contadorErros, setContadorErros] = React.useState(0);
    let [boolEscolhe, setBoolEscolhe] = React.useState(false);
    let [boolChute, setBoolChute] = React.useState(true);
    let [boolAcertou, setBoolAcertou] = React.useState(false);
    let [boolErrou, setBoolErrou] = React.useState(false);
    let [chute, setChute] = React.useState("");



    function comecaJogo() {

        setBoolEscolhe(true)
        setBoolChute(false)

        setImgForca(arrForcas[0])
    }

    function printaIndex(index) {

        console.log(semRepetidos)
        console.log(semRepetidos.length)

        if (pSplited.includes(index) === true) {
            setLetrasescolhidas([...letrasescolhidas, index])
            setContadorAcertos(contadorAcertos += 1)
            console.log(contadorAcertos)
            console.log(p)
        } else {
            console.log(arrForcas)
            setContadorErros(contadorErros += 1)
            arrForcas.shift()
            setImgForca(arrForcas[0])
            console.log(arrForcas)
            console.log(imgForca)
        }

        if (contadorAcertos === semRepetidos.length) {
            setBoolAcertou(true)
        }

        if (contadorErros === 6) {
            setBoolErrou(true)
        }
    }

    function chutando() {
        if ((chute === p) || (chute === pSemAcento)) {
            setBoolAcertou(true)
        } else {
            setBoolErrou(true)
        }
    }

    function recomeca() {


        setLetrasescolhidas([]);
        setContadorErros(0);
        setContadorAcertos(0);
        setBoolChute(false);
        setBoolAcertou(false);
        setBoolEscolhe(false);
        setArrForcas([forca0, forca1, forca2, forca3, forca4, forca5, forca6]);

    }

    function Palavrajogo(){
        return(
            <Englobapalavra letrasescolhidas={letrasescolhidas} boolEscolhe={boolEscolhe} function={comecaJogo} boolAcertou={boolAcertou} recomeca={recomeca} />
        )
    }

    function Palavraperdeu(){

        return(
            <p class="red">{p}</p>
        )
    }



    return (
        <>
            <div class="cima">
                <img src={imgForca} class="imagem-forca" />
                {(boolErrou === true) ? <Palavraperdeu/> : <Palavrajogo/>}
            </div>
            <div class="baixo">
                <div class="teclado">

                    {(boolAcertou === false) ? <GeraTecla boolerrou = {boolErrou} function={printaIndex} boolescolhe={boolEscolhe} /> : <GeraTeclaDesativada />}

                </div>
                <div class="chute">
                    <p>Já sei a palavra!</p>
                    <input disabled={boolChute} value={chute} onChange={e => setChute(e.target.value)}></input>
                    <button disabled={boolChute} onClick={chutando}><div class="chutar">Chutar</div></button>
                </div>
            </div>
        </>
    )
}




