import React, {useState} from 'react';

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})


    const getAllCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(r => r.json())
        .then(setCategories)
    }

    const getCategoryById = id => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(r => r.json())
        .then(setCategory)
    }

    const createCategory = (newCategory) => {
        return fetch("http://localhost:8000/categories", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(newCategory)
        }).then(getAllCategories)
    }


    const deleteCategory = (c) => {
        return fetch(`http://localhost:8000/categories/${c.id}`, {
            method : "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
        }).then(getAllCategories)
    }

    const updateCategory = (c) => {
        return fetch(`http://localhost:8000/categories/${c.id}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
        }).then(getAllCategories)
    }

    

    return (
        <CategoryContext.Provider
            value={{
                categories, getAllCategories, createCategory, deleteCategory, updateCategory, getCategoryById, category, setCategory 
            }} 
        >
            {props.children}
        </CategoryContext.Provider>
    )


 }