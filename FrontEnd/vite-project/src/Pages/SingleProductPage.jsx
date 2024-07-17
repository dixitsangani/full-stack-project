import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SingleProductPage() {
    const { id } = useParams(); // Destructure 'id' from useParams
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/routes/singleproduct/${id}`)
            .then((response) => {
                setProduct(response.data); // Update 'product' state with fetched data
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, [id]); // Include 'id' in the dependency array to re-run effect when 'id' changes

    console.log(product); // Debugging check

    if (!product) {
        return <p>Loading...</p>; // Placeholder for loading state while fetching data
    }

    return (
        <div>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.description}</p>
        </div>
    );
}
