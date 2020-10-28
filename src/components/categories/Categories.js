
import React, {useContext} from "react"

import {Link} from "react-router-dom"

import {CategoryContext} from "./CategoryProvider"

export const Category = ( {c} ) => {
    const {deleteCategory} = useContext(CategoryContext)

    return (
        <section className="category">
            <Link to={`/posts/category/${c.id}`}>
                <div className="category__name">{c.name}</div>
            </Link>

            <button className="btn categoryDeleteBtn" onClick={
                () => {
                deleteCategory(c)
            }
            }><i className="fas fa-trash-alt fa-sm" id="delete-category-button" size="sm"/></button>
            
            {/* <button onClick={
                () => {
                   props.history.push(`/categories/edit/${c.id}`)
                    
                }
            }> Edit Category</button> */}
        </section>
    )
}