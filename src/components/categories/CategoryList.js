import React, {useContext, useEffect} from "react"

import {CategoryContext} from "./CategoryProvider"

import {Category} from "./Categories"

import "./CategoryList.css"
export const CategoryList = (props) => {
    const {categories, getAllCategories} = useContext(CategoryContext)

    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <>
        <div className="category-container">
            <h3 className="category_heading">
                Categories
            </h3>
            <div className="addCategorybtn">
                <button className="btn btn-primary" onClick={
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



