import * as React from 'react'
import { AppContext } from '../context/AppContext'
import Card from './Card'

import './Products.scss'

const Products = () => {
    // Products is the section where we show all user information like card
    const {
        productList,
    } = React.useContext(AppContext)

    // Scroll to top of page. Is good approach when we have big list to show
    const handleGoTop = () => (
        window.scrollTo({ top: 0, behavior: 'smooth' })
    )

    return (
        <div className='cardSection'>
            <div className='cardItems'>
                {productList.map((item) => (
                   <Card key={item.id} item={item} />
                ))}
            </div>
            <button className="arrowUp" onClick={handleGoTop}>&uarr;</button>
        </div>
    )
}

export default Products