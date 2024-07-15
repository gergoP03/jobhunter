import React from 'react'
import { Provider } from 'react-redux'
import {store} from './state/store'
import Header from './components/Header'


const Layout = ({ children }) => {

    return (
        <div className='bg-base-100'>
                <Provider store={store}>
                    <Header />
                    {children}
                </Provider>

        </div>
    )
}

export default Layout