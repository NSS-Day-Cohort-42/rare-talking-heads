import React from "react"
import { Route } from "react-router-dom"

import {CategoryProvider} from "./categories/CategoryProvider"
import {CategoryList} from "./categories/CategoryList"
import {CategoryForm} from "./categories/CategoryForm"

export const ApplicationViews = (props) => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            
        </main>
        
        <CategoryProvider>
                <Route exact path = "/categories" render={
                    props => {
                        return <CategoryList history={props.history} />
                    }
                } />

                <Route exact path ="/categories/create" render={
                    props => {
                        return <CategoryForm {...props} />
                    }
                } />
        </CategoryProvider>
        
        
    </>
}
