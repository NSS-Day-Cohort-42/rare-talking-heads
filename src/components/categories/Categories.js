
import React, {useContext} from "react"

import {Link} from "react-router-dom"

import {CategoryContext} from "./CategoryProvider"

export const Category = ( {c} ) => {
    const {deleteCategory, getCategoryById } = useContext(CategoryContext)

    return (
        <section className="category">
            <Link to={`/posts/category/${c.id}`}>
                <div className="category__name">{c.name}</div>
            </Link>

            <button onClick={
                () => {
                deleteCategory(c)
            }
            }>Delete Category</button>
            
            {/* <button onClick={
                () => {
                   props.history.push(`/categories/edit/${c.id}`)
                    
                }
            }> Edit Category</button> */}
        </section>
    )
}