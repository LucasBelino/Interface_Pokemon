import React from "react";

//Mapear todos os id, nomes e imagens da api
const Pokes =({pokemon,loading,infoPokemon})=>{
    console.log(pokemon);
    return(
        <>
            {
                loading ? <h1>Aguarde !</h1>: //Delay de carregamento
                    pokemon.map((item)=>{
                        return(
                            <>
                                <div className="pokes" key={item.id} onClick={()=>infoPokemon(item)}>
                                    <h2>{item.id}</h2> 
                                    <img src={item.sprites.front_default} alt="" />
                                    <h2>{item.name}</h2>
                                </div>
                            </>
                        )
                    })
            }
        </>
    )
}

export default Pokes;