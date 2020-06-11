import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// components
import Menu from './Menu'
// page
import Usuarios from './Usuarios'
import Publicaciones from './Publicaciones'
import Tareas  from './Tareas'
import TareasGuardar from './Tareas/Guardar'

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="marge">
      <Route exact path='/' component={Usuarios} />
      <Route exact path='/tareas' component={Tareas} />
      <Route exact path='/publicaciones/:key' component={Publicaciones} />
      <Route exact path='/tareas/guardar' component={TareasGuardar} />
      <Route exact path='/tareas/guardar/:usu_id/:tar_id' component={TareasGuardar} />

    </div>

  </BrowserRouter>
)

export default App;