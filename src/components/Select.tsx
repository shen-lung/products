import * as React from 'react'
import { AppContext } from '../context/AppContext'

import './Select.scss'

type Options = {
    options: Array<any>,
    filterType: string,
}

const Select = ({options, filterType}: Options) => {
    const {
        setProductListContext,
        productList,
        productListCopy,
    } = React.useContext(AppContext)

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const valueSelected = e.target.value
        // sortBy is method to sort the list

        if(valueSelected) {
            const copyProductList = [...productListCopy]

            switch(filterType) {
                case 'brand':
                    const filtered = copyProductList.filter((item) => {
                        return item.brand === valueSelected
                    })
                    setProductListContext(filtered)
                    break;
                case 'minmax':
                    switch(valueSelected) {
                        case 'min a max':
                            copyProductList.sort((item1, item2) => item1.price - item2.price)
                            setProductListContext(copyProductList)
                            break;
                        case 'max a min':
                            copyProductList.sort((item1, item2) => item2.price - item1.price)
                            setProductListContext(copyProductList)
                            break;
                    }
                    break;
                case 'available':
                    switch(valueSelected) {
                        case 'min a max':
                            copyProductList.sort((item1, item2) => item1.count - item2.count)
                            setProductListContext(copyProductList)
                            break;
                        case 'max a min':
                            copyProductList.sort((item1, item2) => item2.count - item1.count)
                            setProductListContext(copyProductList)
                            break;
                    }
                    break;
                default:
                    setProductListContext([...productListCopy])
            }
        } else {
            setProductListContext([...productListCopy])
        }
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLSelectElement, Element>) => {
        // @ts-ignore
        e.target[0].selected = true
    }

    return (
        <select
            className='select'
            name="filter"
            id="filter"
            defaultValue={''}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            disabled={productList.length === 0}
        >
            {options.map((value) => (
                <option key={value} value={value}>{value}</option>
            ))}
        </select>
    )
}

export default Select
