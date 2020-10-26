import React, {useState} from 'react';

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})


    const getAllCategories = () => {
        return fetch("http://localhost:8088/categories")
        .then(r => r.json())
        .then(setCategories)
    }

    const getCategoryById = id => {
        return fetch(`http:localhost:8088/categories/${id}`)
        .then(r => r.json())
        .then(setCategory)
    }

    const createCategory = (newCategory) => {
        return fetch("http://localhost:8088/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategory)
        }).then(getAllCategories)
    }


    const deleteCategory = (c) => {
        return fetch(`http://localhost:8088/categories/${c.id}`, {
            method : "DELETE"
        }).then(getAllCategories)
    }

    const updatedCategory = (c) => {
        return fetch(`http://localhost:8088/categories/${c.id}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
        }).then(getAllCategories)
    }

    return (
        <CategoryContext.Provider
            value={{
                categories, getAllCategories, createCategory, deleteCategory, updatedCategory, getCategoryById, category, setCategory 
            }} 
        >
            {props.children}
        </CategoryContext.Provider>
    )


 }