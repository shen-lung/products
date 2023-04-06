import * as React from 'react'
import Search from './Search'
import Button from './Button'
import NewProduct from './NewProduct'
import Filter from './Filter'

import './Header.scss'

const Header = () => {
    // Header section
    const [newProduct, setNewProduct] = React.useState(false)

    return (
        <div className='headSection'>
            <div className='headContent'>
                <Search />
                <div>
                    <Button action={setNewProduct} />
                    { newProduct && <NewProduct cancelAction={setNewProduct}/> }
                </div>
            </div>
            <div className='headContent'>
                <Filter />
            </div>
        </div>
    )
}

export default Header