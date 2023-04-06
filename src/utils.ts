import Swal from 'sweetalert2'

// Here we store the methods to reuse them then
export const sortBy = (param: string, items: Array<any>) => {
    return items.sort((item1, item2) => {
        const value1 = item1[param].toUpperCase()
        const value2 = item2[param].toUpperCase()

        if (value1 < value2) {
          return -1
        }
        if (value1 > value2) {
          return 1
        }
      
        return 0
    })
}

// Here we store the methods to reuse them then
export const alertMessage = (title: string = '', subTitle: string = '', typeMessage: any = '') => {
    return Swal.fire(
      title,
      subTitle,
      typeMessage,
    ).then()
}
