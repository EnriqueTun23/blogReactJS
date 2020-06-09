import React, { Component } from 'react'
import { connect } from 'react-redux'

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import { Redirect } from 'react-router-dom';

import  *  as tareasActions from '../../actions/tareasActions'

class Guardar extends Component {
    cambioUsuarioId = (event) => {
        this.props.cambioUsuarioID(event.target.value)

    }
    cambioTitulo = (event) => {
        this.props.cambioTitulo(event.target.value)
    }
    guardar = () => {
        const { usuario_id, titulo, agregar } = this.props
        const nueva_tarea = {
            userId: usuario_id,
            title: titulo,
            completed: false
        };
        agregar(nueva_tarea)
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