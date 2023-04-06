import axiosClient from '../network/apiClient'
import { crudResponse } from '../network/response'

export const getProducts = async(resultsValue: string) => {
    try {
        // Using axiosClient metod created with default url
        const response = await axiosClient({
            method: 'get',
            url: `sites/MLA/search?q=${resultsValue}`,
        })
        
        // Create mapping data when the status is 200 (Success) 
        if(response.status === 200) {
            let brand: string = ''

            const mappedData = response?.data?.results.map((item: any) => {
                item.attributes.forEach((att: any) => {
                    if(att.id === 'BRAND') {
                        brand = att.value_name
                    }
                })
                
                return {
                    id: item.id,
                    title: item.title,
                    picture: item.thumbnail,
                    price: item.price,
                    count: item.available_quantity,
                    brand: brand ? brand : 'Nombre del Brand'
                }
            })

            // // Return custom response
            return crudResponse(true, mappedData, 'Success')
        } else {
            return crudResponse(false, null, 'Failed to call')
        }
    } catch (error) {
        return crudResponse(false, null, 'Failed to call')
    }
}