import {useState, useEffect} from 'react'

function Usuarios () {

  cont [usuarios, setUsuarios] = useState ([])
  
  useEffect (() => {
    fetch ('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => setUsuarios(data))
    .catch(error => console.error('Erro ao carregar usuarios:', error))
  }, [])


return (
 <ul>
  {usuarios.map((user) => (
    <li key={user.id}>{user.name}</li>
  ))}
 </ul>
)
}

export default Usuarios;