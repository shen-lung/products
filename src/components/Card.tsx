import * as React from 'react'
import { AppContext } from '../context/AppContext'
import { mainIcons } from '../assets/SectionIcons'
import { shortTitleLength } from '../constants'

import Edit from './Edit'

import './Card.scss'

type Item = {
    item: {
        id: string,
        title: string,
        picture: string,
        price: string,
        count: string,
        brand: string,
    }
}

const Card = ({item}: Item) => {
    const {
        setProductListContext,
        setProductListCopy,
        setBrandList,
        productListCopy,
        brandList,
    } = React.useContext(AppContext)

    const [isEdit, setIsEdit] = React.useState(false)

    // Activate the edit process
    const handleEdit = () => {
        if(isEdit) return

        setIsEdit(!isEdit)
    }
    
    // Remove the element
    const handleRemove = (e: any) => {
        let brand: string = ''
        let countBrands: number = 0
        const productKey = e.target.getAttribute('data-key')
        const data = [...productListCopy.filter((item: any) => {
            // Get values differents to removed element
            if(item.id === productKey) {
                brand = item.brand 
            }

            return item.id !== productKey
        })]

        productListCopy.forEach((item: any) => {
            if(item.brand === brand) countBrands = countBrands + 1
        })

        if (countBrands === 1) {
            const brandIndex = brandList.indexOf(brand)
    
            if(brandIndex > -1) brandList.splice(brandIndex, 1)

            setBrandList([...brandList])
        }

        // Set new values
        setProductListContext([...data])
        setProductListCopy([...data])
    }

    const title = item.title.length > shortTitleLength
        ? `${item.title.slice(0, shortTitleLength)} ...`
        : item.title

    return (
        <div key={item.id} className='card'>
            <div className='editButton' onClick={handleEdit}>
                <img className={isEdit ? 'userEditDesactivate' : 'userEdit'} src={mainIcons.iconEditUser} alt='Edit user' />
            </div>
            <div onClick={handleRemove}>
                <img data-key={item.id} className='productRemove' src={mainIcons.iconCancel} alt='Edit user' />
            </div>
            <div className='cardHeader'></div>
            <div className='userName'>{item.brand}</div>
            <img className='userImage' src={item.picture} alt={item.brand} />
            <div className='cardContent'>
                <div>{title}</div>
                <div>Precio: ${item.price}</div>
                <div>Cantidad: {item.count}</div>
            </div>
            {isEdit && <Edit item={item} setVisible={setIsEdit} />}
        </div>
    )
}

export default Card