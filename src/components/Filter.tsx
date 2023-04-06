import * as React from 'react'
import { AppContext } from '../context/AppContext'
import Select from './Select'

import {
    sortByMinMax,
} from '../constants'

const Filter = () => {
    // Filter section where we filter the products
    const {
        brandList,
    } = React.useContext(AppContext)
    
    if (brandList.length > 0 && brandList[0] !== '') brandList.unshift('')

    return (
        <>
            <div>
                <label>Marca: </label>
                <Select options={brandList} filterType={'brand'} />
            </div>
            <div>
                <label>Precio: </label>
                <Select options={sortByMinMax} filterType={'minmax'} />
            </div>
            <div>
                <label>Cantidad: </label>
                <Select options={sortByMinMax} filterType={'available'} />
            </div>
        </>
    )
}

export default Filter
