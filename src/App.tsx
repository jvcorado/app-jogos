import {useEffect, useState} from 'react';
import { Jogos } from './types/Jogos'

function App() {

  const [jogos, setJogos] = useState<Jogos[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    handleLoadButton();
  },[]);

  const handleLoadButton = () => {
    setLoading(true)
    fetch('https://api.rawg.io/api/platforms?key=c53ad660948b4344b61cb7214fb1b380').then((response)=>{
      setLoading(false)
      return response.json();
      
    })
    .then(data => setJogos(data.results))
    .catch((e) =>{
    setLoading(false);
    setJogos([]);
    console.error(e);
    });
  }

  return (
    <div>
        {loading &&
          <div className='load'>Carregando...</div>
        }
        {!loading && jogos.length > 0 &&
          <>
            <h1>Jogos</h1>
            {jogos.map((item,index)=>(
              <div className='card'>
                  <img src={item.image_background}/>
                  <h1>Plataforma:{item.name}</h1>
                  <div key={index}>
                    <h1>0s {item.games.length} jogos mais jogados:</h1>
                    {item.games.map((item,index)=>(
                      <div><h2>{item.name}</h2></div>))}
                  </div>
              </div>
            ))}
          </>
        }
        {!loading && jogos.length === 0 && 
          <div>Tente novamente mais tarde</div>
        }
    </div>
  )
}

export default App;
