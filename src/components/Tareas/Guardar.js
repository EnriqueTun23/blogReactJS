import React, { Component } from 'react'
import { connect } from 'react-redux'

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import { Redirect } from 'react-router-dom';

import  *  as tareasActions from '../../actions/tareasActions'

class Guardar extends Component {
    componentDidMount() {
        // destructuracion de los props
        const {
            match: {params: {usu_id, tar_id}},
            tareas,
            cambioUsuarioID,
            cambioTitulo,
            limpiarForma
        } = this.props;
        // validacion si existe usu_id y tar_id
        if (usu_id && tar_id) {
            const tarea = tareas[usu_id][tar_id]
            // ejecutar props 
            cambioUsuarioID(tarea.userId);
            cambioTitulo(tarea.title);
        } else {
            limpiarForma()
        }
    }

    cambioUsuarioId = (event) => {
        this.props.cambioUsuarioID(event.target.value)

    }
    cambioTitulo = (event) => {
        this.props.cambioTitulo(event.target.value)
    }
    guardar = () => {
        const { 
        match: {params: {usu_id, tar_id}},
        tareas,
        usuario_id, 
        titulo, 
        agregar,
        editar 
        } = this.props
        // para guardar array
        const nueva_tarea = {
            userId: usuario_id,
            title: titulo,
            completed: false
        };

        // validar si existen los ides
        if (usu_id && tar_id) {
            const tarea = tareas[usu_id][tar_id];
            const tarea_editada = {
                ...nueva_tarea,
                completed: tarea.completed,
                id: tarea.id
            };
            editar(tarea_editada)
        } else {
            // funcion para agregar del action
            agregar(nueva_tarea)
        }
    }
    deshabilitar = () => {
        const { usuario_id, titulo, cargando } = this.props
        if (cargando) {
            return true
        }
        if (!usuario_id || !titulo) {
            return true
        }
        return false
    };
    mostrarAccion = () => {
        const { error, cargando } = this.props;
        if (cargando){
            return <Spinner />;
        }
        if (error) {
            return <Fatal mensaje={error}/>
        }
    }
    render() {
        return (
            <div>
                {
                    // redireccionar al template
                    (this.props.regresar) ? < Redirect to='/tareas' /> : ''
                }
                <h1>Guardar tarea </h1>
                usuario id:
                <input type="number" value={this.props.usuario_id} onChange={this.cambioUsuarioId} />
                <br /> <br />
                Título:
                <input value={this.props.titulo} onChange={this.cambioTitulo} />
                <br /> <br />
                <button onClick={this.guardar} disabled={this.deshabilitar()}>
                    Guardar
                </button>
                { this.mostrarAccion() }
            </div>
        );
    }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar)