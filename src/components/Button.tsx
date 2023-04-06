import * as React from 'react'

import './Button.scss'

type Button = {
    action: any,
    style?: string,
}

const Button = ({action, style}: Button) => {
    const handleClick = () => {
        action(true)
    }
    return (
        <div>
            <button className='button' type='button' onClick={action}>Crear producto</button>
        </div>
    )
}

export default Button
