import React, {useContext, useEffect, useState} from "react"

import {CategoryContext} from "./CategoryProvider"

import {Category} from "./Categories"

export const CategoryList = (props) => {
    const {categories, getAllCategories, deleteCategory} = useContext(CategoryContext)

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


// {
//     categories.map(c => {
//         return <Category key={c.id} c={c} />
//     })
    
// }



// categories.map(c => {
//     return <section className="category" key={c.id}>
//         <div className="category__name">{c.name}</div>
//         <button onClick={
//             () => {
//             deleteCategory(c)
//             }
//     }>Delete Category</button>
//     <button onClick={
//         () => {
//         props.history.push(`/categories/edit/${c.id}`)

//         }
//         }> Edit Category</button>
//     </section>
// })

