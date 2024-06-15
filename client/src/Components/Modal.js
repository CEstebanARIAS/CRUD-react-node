import "./Modal.css"
import React from "react";


const Modal =() =>{
    return (
        <>
            <div className="Overlay">
                <div className="ContenedorModal">
                    <div className="Encabezado">
                        
                       <h3>Titulo</h3>
                    </div>
                    <button className="BotonCerrar">X</button>
                </div>
            </div>
        </>
    )
}

export default Modal;

