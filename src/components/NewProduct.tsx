import * as React from 'react'
import { AppContext } from '../context/AppContext'
import { mainIcons } from '../assets/SectionIcons'
import { alertMessage } from '../utils'
import { numericValueMessage, emptyFieldMessage } from '../constants'

import './NewProduct.scss'

const NewProduct = ({ cancelAction }: any) => {
    const {
        setProductListContext,
        setProductListCopy,
        setBrandList,
        brandList,
        productList,
    } = React.useContext(AppContext)

    // Create different states to control the card process
    const [title, setTitle] = React.useState('')
    const [brand, setBrand] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [availability, setAvailability] = React.useState('')
    const [file, setFile] = React.useState<File>()

    const srcImage = file
        ? URL.createObjectURL(file)
        : mainIcons.iconProduct

    const fileUploade = React.useRef<HTMLInputElement>(null)

    // Cancel the edit process
    const handleCancel = () => {
        cancelAction(false)
        setTitle('')
        setBrand('')
        setPrice('')
        setAvailability('')
    }
    
    // Save the edit process
    const handleAccept = () => {
        // Search the user to edit using the id
        if(!(title && brand && price && availability)) {
            alertMessage(
                emptyFieldMessage,
                '',
                'error'
            )
            return
        }
        productList.unshift({
            id: Date.now().toString(),
            title: title,
            picture: srcImage,
            price: price,
            count: availability,
            brand: brand,
        })

        brandList.indexOf(brand) === -1 && brandList.push(brand)

        // Set new values
        setBrandList([...brandList])
        setProductListContext([...productList])
        setProductListCopy([...productList])

        cancelAction(false)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
    }
    
    const handleFileChangeClick = () => {
        fileUploade.current?.click()
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
        <div className='newProductContent'>
            <div>
                <input ref={fileUploade} type="file" id="file-upload" style={{display: 'none'}} accept='image/png, image/jpeg, image/jpg' onChange={handleFileChange} />
            </div>
            <div>
                <img className='uploadedImage' src={srcImage}  onClick={handleFileChangeClick} />
            </div>
            <div className='newProductField'>
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
            <div className='newProductField'>
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
            <div className='newProductField'>
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
            <div className='newProductField'>
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

export default NewProduct
