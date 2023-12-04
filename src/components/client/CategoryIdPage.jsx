import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryId = () => {
    const { id } = useParams()
 console.log(useParams,'useParams');
    console.log(id, 'id');
    return (
        <div>
            <h1>Category ID: {id}</h1>
            <h1>Category ID: {id}</h1>
            <h1>Category ID: {id}</h1>
            <h1>Category ID: {id}</h1>
            <h1>Category ID: {id}</h1>
            <h1>Category ID: {id}</h1>
            <h1>Category ID: {id}</h1>
            <h1>Category ID: {id}</h1>
            <h1>Category ID: {id}</h1>
            <h1>Category ID: {id}</h1>
            <h1>Category ID: {id}</h1>
        </div>
    )
}

export default CategoryId