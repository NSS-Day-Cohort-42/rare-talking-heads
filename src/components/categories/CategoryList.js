import React, {useContext, useEffect, useState} from "react"

import {CategoryContext} from "./CategoryProvider"

import {Category} from "./Categories"

export const CategoryList = () => {
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