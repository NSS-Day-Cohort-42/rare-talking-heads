import { useContext } from "react";
import React, {useContext} from "react"

import {CategoryContext} from "./CategoryProvider"

export const Category = ({c}) => {
    const {deleteCategory, getCategoryById} = useContext(CategoryContext)

    return (
        <section className="category">
            <div className="category__name">{c.name}</div>

            <button onClick={
                () => {
                deleteCategory(c)
            }
            }>Delete Category</button>
            
            <button onClick={
                () => {
                    getCategoryById(c.id)
                }
            }>Edit Category</button>
        </section>
    )
}