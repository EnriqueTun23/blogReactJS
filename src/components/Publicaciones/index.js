import React, { Component } from 'react'
import { connect } from 'react-redux'

import Spinner  from '../General/Spinner';
import Fatal from '../General/Fatal';
import Comentarios from './Comentarios';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions'

// destructurar los actions
const { traerTodos: usuarios } = usuariosActions
const { traerPorUsuario: publicacionesPorUsuario, 
    abrirCerrar, 
    traerComentarios
} = publicacionesActions


class Publicaciones extends Component {
    async componentDidMount() {
        // destructurar props
        const {
            usuarios,
            publicacionesPorUsuario,
            match: { params: { key }}
        } = this.props
        // este this de abajo no se puede destructurar por que es un estado y se actualiza 
        if(!this.props.usuariosReducer.usuarios.length) {
           await usuarios();
        }
        if (this.props.usuariosReducer.error) {
            return;
        }
        if(!('publicaciones_key' in  this.props.usuariosReducer.usuarios[key])) {
            publicacionesPorUsuario( key );
        }
    }

    ponerUsuario = () => {
        const { usuariosReducer,
        match: { params: {key} } 
        } = this.props;
        if (usuariosReducer.error) {
            return <Fatal mensaje={ usuariosReducer.error } />
        }

        if ( !usuariosReducer.usuarios.length || usuariosReducer.cargando) {
            return <Spinner/>
        }
        const nombre = usuariosReducer.usuarios[key].name

        return ( 
            <h1>
                    Publicaciones de { nombre }
                </h1>
        )
    };
    ponerPublicaciones = () => {
        const { 
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: {key} } 
         } = this.props;
         if (!usuarios.length) return;
         if (usuariosReducer.error) return;
         if (publicacionesReducer.cargando) {
             return <Spinner />
            }
         if (publicacionesReducer.error) {
             return <Fatal mensaje={publicacionesReducer.error} />
         }
         if (!publicaciones.length) return;

         if (!('publicaciones_key' in  usuarios[key])) return ;

         const { publicaciones_key } = usuarios[key];
         return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key)

    }
    mostrarInfo = (publicaciones, pub_key) => (
        publicaciones.map((publicacion, com_key) => (
            <div className="pub_titulo" key={publicacion.id} onClick={ () => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios) } >
                 <h2>{ publicacion.title }</h2>
                 <h4> { publicacion.body } </h4>
                 {
                     (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios}/> : ''
                 }
             </div>
         ))
    );
    mostrarComentarios = (pub_key, com_key, comentarios) => {
        this.props.abrirCerrar(pub_key, com_key);
        if (!comentarios.length) {
            this.props.traerComentarios(pub_key, com_key)
        }
    }
    render () {
        console.log(this.props)
        return (
            <div>
                { this.ponerUsuario() }
                { this.ponerPublicaciones() }
            </div>   
        );
    };
}
const mapStateToProps = ({usuariosReducer, publicacionesReducer}) => {
    return {
        usuariosReducer,
        publicacionesReducer
    };
}

const mapDispatchToProps = {
    usuarios,
    publicacionesPorUsuario,
    abrirCerrar,
    traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);