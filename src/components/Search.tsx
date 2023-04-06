import * as React from 'react'
import { AppContext } from '../context/AppContext'
import { mainIcons } from '../assets/SectionIcons'
import { getProducts } from '../api/getProducts'
import { alertMessage } from '../utils'
import { emptySearchValueMessage } from '../constants'

import './Search.scss'

const Search = () => {
    // Search element to find products

    const defaultValue = 'Buscar un producto ...'
    const [value, setValue] = React.useState(defaultValue)
    const {
        setProductListContext,
        setProductListCopy,
        setBrandList,
        productList,
        brandList,
    } = React.useContext(AppContext)

    // Handle the input text
    const handleOnChange = async (e: { target: HTMLInputElement; }) => {
        setValue(e.target.value.toLowerCase())
    }
    
    const handleOnFocus = () => {
        setValue('')
    }
    
    // Restore the list on focus out
    const handleSearch = async() => {
        if(value.length === 0 || value === defaultValue) {
            alertMessage(
                emptySearchValueMessage,
                '',
                'question'
            )
            setValue(defaultValue)

            return
        }

        // Calling the API to get the products
        const allAsersResponse = await getProducts(value)

        // We store the information if the response status is ok 
        if(allAsersResponse.status) {
            const data: any = allAsersResponse.data
            const brandListToFilter: Array<string> = []

            data.forEach((item: any) => {
                !brandListToFilter.includes(item.brand) && brandListToFilter.push(item.brand)
            })

            setBrandList([...brandListToFilter])
            setProductListContext(data)
            setProductListCopy([...data])
            setValue(defaultValue)
        } else {
            alertMessage(
                allAsersResponse.mensaje,
                '',
                'error'
            )
        }
    }

    return (
        <div className='searchContent'>
            <input
                className='find'
                type='text'
                id='find'
                name='find'
                value={value}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
            />
            <img className='findIcon' src={mainIcons.iconSearch} alt='Edit product' onClick={handleSearch} />
        </div>
    )
}

export default Search
