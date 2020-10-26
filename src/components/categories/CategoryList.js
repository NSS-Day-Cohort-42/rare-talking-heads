import React, {useContext, useEffect, useState} from "react"

import {CategoryContext} from "./CategoryProvider"

import {Category} from "./Categories"

export const CategoryList = (props) => {
    const {categories, getAllCategories} = useContext(CategoryContext)

    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <>
        <div>
            <h3>
                Categories
            </h3>
            <div className="addCategorybtn">
                <button onClick={
                    () => 
                        props.history.push("/categories/create")
                
                }>Add Category
                </button>
            </div>
            <div className="categories">
                {
                    categories.map(c => {
                        return <Category key={c.id} c={c} />
                    })
                }
            </div>
        </div>
        </>
    )
}