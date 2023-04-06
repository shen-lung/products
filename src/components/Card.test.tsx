import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { fireEvent } from '@testing-library/react'
import Card from './Card'

const props = {
	id: "ba17e195",
	title: 'Serum Oleo Extraordinario',
	picture: 'http://http2.mlstatic.com/D_943426-MLA54849605926_042023-I.jpg',
	price: '1500',
	count: '2000',
	brand: 'Dove',
}

const productList = [
	{
		id: "ba17e195",
		title: 'Serum Oleo Extraordinario',
		picture: 'http://http2.mlstatic.com/D_943426-MLA54849605926_042023-I.jpg',
		price: '1500',
		count: '2000',
		brand: 'Dove',
	},
	{
		id: "ba17e199",
		title: 'hampoo Head & Shoulders',
		picture: 'http://http2.mlstatic.com/D_785324-MLA46101522878_052021-I.jpg',
		price: '1500',
		count: '2000',
		brand: 'Head & Shoulders',
	},
]

jest.mock('react', () => {
	const ActualReact = jest.requireActual('react')
  
	return {
	  ...ActualReact,
	  useContext: () => ({
		setProductListContext: jest.fn(),
        setProductListCopy: jest.fn(),
        productList: productList,
	  }),
	}
  })

describe('Card', () => {
	let container: any = null

	beforeEach(() => {
		container = document.createElement('div')
		document.body.appendChild(container)
	})

	afterEach(() => {
		unmountComponentAtNode(container)
		container.remove()
		container = null
		jest.restoreAllMocks()
	})

	it('render component', () => {
		act(() => {
			render(<Card item={props} />, container)
		})

		const card = document.querySelector('.card')

		expect(card).toBeTruthy()
	})
	
	it('card info', () => {
		act(() => {
			render(<Card item={props} />, container)
		})

		const cardChangeInfo = document.querySelector('.cardChangeInfo')

		expect(cardChangeInfo).toBeFalsy()
	})
	
	it('edit process', () => {
		act(() => {
			render(<Card item={props} />, container)
		})

		const editButton = document.querySelector('.editButton')
		expect(editButton).toBeTruthy()

		fireEvent.click(editButton)

		const cardChangeInfo = document.querySelector('.cardChangeInfo')

		expect(cardChangeInfo).toBeTruthy()
	})
})
