import React, { useEffect, useState } from 'react';
import './styles.css';
import { Card } from '../../components/card';

export function Home() {
  const [convidadoName, setconvidadoName ] = useState("");
  const [convidado, setconvidado] = useState([]);
  const [user, setUser ] = useState({ name: '', avatar: ''})

  function handleAddConvidado() {
    const newConvidado = {
      name: convidadoName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
      })
    }
    setconvidado(prevState => [...prevState, newConvidado]);
  }

  useEffect(() => {
    fetch("https://api.github.com/users/igwbriel")
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }, [])

  return (
    <div className='container'>
      <header>
      <h1>Lista de convidados </h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="profile" />
      </div>
      </header>


      <input
       type="text" 
       placeholder="Adicione o convidado"
       onChange={e => setconvidadoName(e.target.value)}
       />

      <button type="button" onClick={handleAddConvidado}>
        Adicionar
        </button>
    {
      convidado.map(convidado => (
      <Card 
      key= {convidado.time}
      name={convidado.name} 
      time={convidado.time} />
      ))
    }

    </div>
  )
}