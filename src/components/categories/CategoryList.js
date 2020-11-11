import React, {useContext, useEffect} from "react"

import {CategoryContext} from "./CategoryProvider"

import {Category} from "./Categories"

import "./CategoryList.css"
export const CategoryList = (props) => {
    const {categories, getAllCategories, deleteCategory} = useContext(CategoryContext)
    

    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <>
            <div className="category-container">
                <div className="category_heading">
                    <div className="col-4"></div>
                    <h3 >
                        Categories
                    </h3>
                    <div className="addCategorybtn col-4">
                    <button className="btn btn-primary" onClick={
                        () => 
                            props.history.push("/categories/create")
                    
                    }>Add Category
                    </button>
            </div>
                </div>
                <div className="categories">
                    <table>
                        <tbody>
                            {categories.map(c =>
                                <tr>
                                    <td>
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
                                    </td>
                                    <td>
                                        <Category key={c.id} c={c} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </>
    )
}



