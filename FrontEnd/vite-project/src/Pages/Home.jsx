import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Home() {
    const [product, setProduct] = useState({ name: "", price: "", description: "" })
    const [productData, setProductData] = useState([]);
    const [EditId, setIditId] = useState(null);


    const handleProduct = (e) => {

        e.preventDefault();

        if (EditId) {
            // console.log(EditId,"edit id is id")
            axios.patch(`http://localhost:8080/routes/edit/${EditId}`, { name: product.name, price: product.price, description: product.description })
                .then((res) => console.log(res))
            console.log("data added successfully")
            alert("data added successfully")

        } else {
            axios.post(`http://localhost:8080/routes/post`, { name: product.name, price: product.price, description: product.description })
                .then((res) => console.log(res))
            console.log("data added successfully")
            alert("data added successfully")
        }

        setProduct({ name: "", price: "", description: "" })
        getData();
        setIditId(null)
    }
    // get data

    const getData = () => {
        axios.get(`http://localhost:8080/routes/`)
            .then((data) => {
                setProductData(data.data)
                console.log(data.data)
            })
    }

    useEffect(() => {
        getData();
    }, [])



    // delete functin 
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8080/routes/${id}`)
            .then((res) => {
                console.log(res)
                setProductData(productData.filter((item) => item._id !== id))
                alert("data deleted successfully")
            })
    }



    // Edit function

    const handleEdit = (item) => {
        setIditId(item._id)
        setProduct({ name: item.name, price: item.price, description: item.description })
    }


    return (
        <div>
            <form onSubmit={handleProduct} >

                <input placeholder='enter name' type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} /> <br /><br />
                <input placeholder='enter price' type="text" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} /><br /><br />
                <input placeholder='enter description' type="text" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} /> <br /><br />
                <button>{EditId ? "Update" : "Add Product"}</button>
            </form>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "auto", }} >
                {
                    productData.map((item) => {
                        return <div style={{ border: '1px solid black', width: "300px", padding: "10px", margin: "10px" }} key={item._id}>

                            <Link to={`/singleproduct/${item._id}`} >
                                <p>{item.name}</p>
                            </Link>

                            <p>{item.price}</p>
                            <p>{item.description}</p>
                            <button onClick={() => handleDelete(item._id)} >Delete</button>
                            <button onClick={() => handleEdit(item)} >  Edit</button>
                            <div>
                                <button> Add to Cart</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
