import React from 'react';

function NavBar(props) {
    const renderButtons = () => {
        return (
            props.buttons.map(button => (
                <button className='h40 button' onClick={button.onClick}>{button.label}</button>
            ))
        )
    }

    return (
        <div className='navbar'>
            <div className='w250 fx-sep fx-row'>
                {renderButtons()}
            </div>
            <div>
                <h4 className='c1'>{localStorage.getItem("nombre")} {localStorage.getItem("apellido")}</h4>
            </div>
        </div>
    );
}

export default NavBar;
