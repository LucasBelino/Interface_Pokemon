import React from "react";
import Pokes from "./Pokes";
import Info from "./Info";
import axios from "axios";
import "./Style.css";
import { useState } from "react";
import { useEffect } from "react";

const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();

    //Adicionar novos pokemons
    const [nome, setNome] = useState()
    const armazenar = (chave, valor) => {

        localStorage.setItem(chave, valor) //armazenar no navegador
    }

    //Consultar pokemons
    const consultar = (chave) => {

        alert(localStorage.getItem(chave))
    }

    //Vender pokemons
    const vender = (chave) => {

        localStorage.removeItem(chave)
    }


    const pokeFun = async () => {
        setLoading(true)
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
    }
    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url)
            setPokeData(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1) //retirar o aleatorio
                return state;
            })
        })
    }

    useEffect(() => {
        pokeFun();
    }, [url])

    return (
        <>
            <div>
                <h1 className="Titulo-Home">Pokémons Existentes</h1>
            </div>

            <div className="btn-group">
                {prevUrl && <button onClick={() => {
                    setPokeData([])
                    setUrl(prevUrl)
                }}>Anterior</button>}

                {nextUrl && <button onClick={() => {
                    setPokeData([])
                    setUrl(nextUrl)
                }}>Próximo</button>}

            </div>
            <div className="container">
                <div className="left-content">
                    <Pokes pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
                </div>
                <div className="right-content">
                    <Info data={pokeDex} />
                </div>
            </div>
            <h1 className="Titulo-Home">Operações</h1>
            <div className="container2">
                <div className="Compra">
                <input placeholder="Digite o Pokémon desejado" type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                <button className="compraButton" onClick={() => armazenar('pk_nome', nome)}>Adquirir Pokémon</button>
                <button className="compraButton" onClick={() => consultar('pk_nome')}>Consultar Pokémon</button>
                <button className="compraButton" onClick={() => vender('pk_nome', nome)}>Vender Pokémon</button>
                </div>
            </div>
        </>
    )

}
export default Main;