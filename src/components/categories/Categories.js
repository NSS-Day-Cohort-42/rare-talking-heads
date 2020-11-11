
import React from "react"

import {Link} from "react-router-dom"

export const Category = ( {c} ) => {

    return (
                <Link to={`/posts/category/${c.id}`}>
                    <div className="category__name">{c.label}</div>
                </Link> 
    )
}