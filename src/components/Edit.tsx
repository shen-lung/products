import * as React from 'react'
import { AppContext } from '../context/AppContext'
import { mainIcons } from '../assets/SectionIcons'
import { alertMessage } from '../utils'
import { numericValueMessage, emptyFieldMessage } from '../constants'

import './Edit.scss'

type Item = {
    item: {
        id: string,
        title: string,
        picture: string,
        price: string,
        count: string,
        brand: string,
    },
    setVisible: Function,
}

const Edit = ({item, setVisible}: Item) => {
    const {
        setProductListContext,
        setProductListCopy,
        productListCopy,
    } = React.useContext(AppContext)

    // Create different states to control the card process
    const [title, setTitle] = React.useState(item.title)
    const [brand, setBrand] = React.useState(item.brand)
    const [price, setPrice] = React.useState(item.price)
    const [availability, setAvailability] = React.useState(item.count)

    // Cancel the edit process
    const handleCancel = () => {
        setVisible(false)
        setTitle(item.title)
        setBrand(item.brand)
        setPrice(item.price)
        setAvailability(item.price)
    }
    
    // Save the edit process
    const handleAccept = () => {
        // Search the product to edit using the id
        if(!(title && brand && price && availability)) {
            alertMessage(
                emptyFieldMessage,
                '',
                'error'
            )
            return
        }
        const newProductList = [...productListCopy]
        newProductList.forEach((product) => {
            // Asing the new values
            if(product.id === item.id) {
                product.title = title
                product.brand = brand
                product.price = price
                product.count = availability
            }
        })

        // Set new values
        setProductListContext([...newProductList])
        setProductListCopy([...newProductList])

        setVisible(false)
    }
    
    // Handle title input change
    const handleTitle = (e: { target: HTMLInputElement; }) => {
        setTitle(e.target.value)
    }

    // Handle brand input change
    const handleBrand = (e: { target: HTMLInputElement; }) => {
        setBrand(e.target.value)
    }

    // Handle price input change
    const handlePrice = (e: { target: HTMLInputElement; }) => {
        const value: any = e.target.value

        if(isNaN(value)) {
            alertMessage(
                numericValueMessage,
                '',
                'error'
            )
            return
        }

        setPrice(value)
    }
    
    // Handle availability input change
    const handleAvailability = (e: { target: HTMLInputElement; }) => {
        const value: any = e.target.value
        
        if(isNaN(value)) {
            alertMessage(
                numericValueMessage,
                '',
                'error'
            )

            return
        }

        setAvailability(e.target.value)
    }

    return (
        <div className='editContent'>
            <div>
                <label>Nombre: <span className='fieldRequired'>*</span></label><br></br>
                <input
                    className='cardChangeInfo'
                    type='text'
                    id='title'
                    name='title'
                    value={title}
                    onChange={handleTitle}
                />
            </div>
            <div>
                <label>Brand: <span className='fieldRequired'>*</span></label><br></br>
                <input
                    className='cardChangeInfo'
                    type='text'
                    id='brand'
                    name='brand'
                    value={brand}
                    onChange={handleBrand}
                />
            </div>
            <div>
                <label>Precio $: <span className='fieldRequired'>*</span></label><br></br>
                <input
                    className='cardChangeInfo'
                    type='text'
                    id='price'
                    name='price'
                    value={price}
                    onChange={handlePrice}
                />
            </div>
            <div>
                <label>Disponibilidad: <span className='fieldRequired'>*</span></label><br></br>
                <input
                    className='cardChangeInfo'
                    type='text'
                    id='availability'
                    name='availability'
                    value={availability}
                    onChange={handleAvailability}
                />
            </div>
            <div className='iconEditSection'>
                <img className='iconEdit' src={mainIcons.iconCancel} alt='Cancel' onClick={handleCancel} />
                <img className='iconEdit' src={mainIcons.iconAccept} alt='Accept' onClick={handleAccept} />
            </div>
        </div>
    )
}

export default Edit
