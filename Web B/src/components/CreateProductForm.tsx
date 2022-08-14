import React, { MouseEventHandler, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { graphQLClient, createProduct } from '../queries/Queries'
import { socket } from '../features/socketConnection/connection';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface props {
    close: any
}

const CreateProductForm = ({ close }: props) => {


    const [input, setInput] = useState({
        name: "",
        description: "",
        price: "",
        img: "",
    })

    const handleSumbit = (e: any) => {
        e.preventDefault()
        graphQLClient.request(createProduct, {
            name: input.name,
            description: input.description,
            price: Number(input.price),
            img: input.img,
        }).then(() => {
            setInput({
                name: "",
                description: "",
                price: "",
                img: "",
            })
            close()
            socket.emit("create product")
        })
    }

    const handleChange = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleCancel = () => {
        setInput({
            name: "",
            description: "",
            price: "",
            img: "",
        })
        close()
    }

    useEffect(() => {
        console.log(input)
    }, [input])

    return (
        <Box sx={style}>
            <form className='createProductForm' >
                <TextField
                    required
                    id="standard-required"
                    label="Name"
                    name="name"
                    value={input.name}
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="standard-required"
                    label="Description"
                    multiline
                    rows={4}
                    name="description"
                    value={input.description}
                    variant="standard"
                    onChange={handleChange}
                />

                <TextField
                    required
                    id="standard-required"
                    label="Price"
                    name="price"
                    value={input.price}
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="standard-required"
                    label="Image"
                    name="img"
                    value={input.img}
                    variant="standard"
                    onChange={handleChange}
                />

                <div className='createProductFormBtnContainer'>
                    <Button variant="contained" size="small" onClick={handleSumbit}>
                        Create
                    </Button>

                    <Button variant="contained" size="small" onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Box>
    )
}

export default CreateProductForm