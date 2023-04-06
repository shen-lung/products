import * as React from 'react'

interface IAppContext {
  setProductListContext: Function,
  setProductListCopy: Function,
  setBrandList: Function,
  productListCopy: Array<any>,
  productList:  Array<any>,
  brandList:  Array<string>,
}

type Props = {
  children: React.ReactNode;
}

export const AppContext = React.createContext<IAppContext>({} as IAppContext)

// @ts-ignore
const AppContextProvider = ({ children }: Props) => {
  // Create app context to create comunication between components.
  // Is used to control the app's states
  const [productList, setProductList] = React.useState<Array<any>>([])
  const [brandList, setBrandList] = React.useState<Array<string>>([])
  const [productListCopy, setProductListCopy] = React.useState<Array<any>>([])

  const setProductListContext = (value: Array<any>): void => {
    setProductList(value)
  }

  const contextValues = React.useMemo(
    () => ({
      setProductListContext,
      setProductListCopy,
      setBrandList,
      productListCopy,
      productList,
      brandList,
    }),
    [
      setProductListContext,
      setProductListCopy,
      setBrandList,
      productListCopy,
      productList,
      brandList,
    ]
  )
  
  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
