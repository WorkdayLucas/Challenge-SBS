import React, { MouseEventHandler, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { graphQLClient, createProduct, updateProduct } from '../queries/Queries'
import { socket } from '../features/socketConnection/connection';
import { useSelector } from 'react-redux';
import { selectCurrentProduct, selectIsEditing } from '../features/slices/productSlice';
import zIndex from '@mui/material/styles/zIndex';

const style = {
    position: 'absolute' as 'absolute',
    top: '90%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: "90vh",
    overflow: "auto",
    '&::-webkit-scrollbar': {
        width: "8px",
    },
    '&::-webkit-scrollbar-track': {
        background: "rgb(236, 239, 240)",
    },

    '&::-webkit-scrollbar-thumb': {
        backgroundColor: "rgb(153, 153, 153)",
        borderRadius: "20px",
    },

};

interface props {
    close: any
}

interface productInput {
    name: String,
    description: String,
    price: String,
    img: String,
}

const CreateProductForm = ({ close }: props) => {


    const isEditing = useSelector(selectIsEditing)
    const currentProduct = useSelector(selectCurrentProduct)

    const [input, setInput] = useState<productInput>({
        name: "",
        description: "",
        price: "",
        img: "",
    })

    const [errInput, setErrInput] = useState({
        nameErr: "",
        descriptionErr: "",
        priceErr: "",
        imgErr: "",
    })

    useEffect(() => {
        setInput({
            name: `${currentProduct.name}`,
            description: `${currentProduct.description}`,
            price: `${currentProduct.price}`,
            img: `${currentProduct.img}`,
        })
    }, [currentProduct])

    const handleSumbit = (e: any) => {
        e.preventDefault()


        setErrInput({
            nameErr: input.name === "" ? "Name required" : "",
            descriptionErr: input.description === "" ? "Description required" : "",
            priceErr: input.price === 'null' || input.price === '' ? "Price required" : "",
            imgErr: input.img === "" ? "Image required" : "",
        })

        if (errInput.nameErr === "" &&
            errInput.descriptionErr === "" &&
            errInput.priceErr === "" &&
            errInput.imgErr === "" &&
            input.name !== "" &&
            input.description !== "" &&
            input.price !== "" &&
            input.img !== "") {
            if (!isEditing) {
                graphQLClient.request(createProduct, {
                    name: input.name,
                    description: input.description,
                    price: Number(input.price),
                    img: input.img,
                }).then(() => {
                    setInput({
                        name: "",
                        description: "",
                        price: `${currentProduct.price}`,
                        img: "",
                    })
                    close()
                    socket.emit("create product")
                }).catch((err) => { })
            } else {
                graphQLClient.request(updateProduct, {
                    _id: currentProduct._id,
                    name: input.name,
                    description: input.description,
                    price: Number(input.price),
                    img: input.img,
                }).then(() => {
                    setInput({
                        name: "",
                        description: "",
                        price: `${currentProduct.price}`,
                        img: "",
                    })
                    socket.emit("update product")
                    close()

                })
            }
        }


    }

    const handleChange = (e: any) => {
        if (e.target.name !== "price") {
            setInput({ ...input, [e.target.name]: e.target.value.trimStart() })
        }
        switch (e.target.name) {
            case "name":
                if (e.target.value === "") {
                    setErrInput({ ...errInput, nameErr: "Name required" })
                } else if (e.target.value.length > 50) {
                    setErrInput({ ...errInput, nameErr: "50 characters max" })
                }else if (e.target.value !== "") {
                    setErrInput({ ...errInput, nameErr: "" })
                }
                break
            case "description":
                if (e.target.value === "") {
                    setErrInput({ ...errInput, descriptionErr: "Description required" })
                }else if (e.target.value.length > 500) {
                    setErrInput({ ...errInput, descriptionErr: "500 characters max" })
                } else if (e.target.value !== "") {
                    setErrInput({ ...errInput, descriptionErr: "" })
                }
                break
            case "price":
                if (e.target.value >= 0) {
                    setInput({ ...input, price: e.target.value })
                }
                if (e.target.value === "") {
                    setErrInput({ ...errInput, priceErr: "Price required" })
                } else if (e.target.value !== "") {
                    setErrInput({ ...errInput, priceErr: "" })
                }
                break
            case "img":
                if (e.target.value === "") {
                    setErrInput({ ...errInput, imgErr: "Image required" })
                } else if (!(/\.(jpg|png|gif)$/i).test(e.target.value)) {
                    setErrInput({ ...errInput, imgErr: "Url no contiene un archivo valido" })
                } else if (e.target.value !== "") {
                    setErrInput({ ...errInput, imgErr: "" })
                }
                break
            default:

        }
    }

    const handleCancel = () => {
        setInput({
            name: "",
            description: "",
            price: "",
            img: "",
        })
        setErrInput({
            nameErr: "",
            descriptionErr: "",
            priceErr: "",
            imgErr: "",
        })
        close()
    }

    // useEffect(() => {


    // }, [input])

    return (
        <Box sx={style}>
            <form className='createProductForm' >

                <TextField
                    required
                    error={errInput.nameErr === "" ? false : true}
                    id="standard-error-helper-text-required"
                    label="Name"
                    name="name"
                    value={input.name}
                    helperText={errInput.nameErr}
                    variant="standard"
                    onChange={handleChange}
                />

                <TextField
                    required
                    error={errInput.descriptionErr === "" ? false : true}
                    id="standard-error-helper-text-required"
                    label="Description"
                    multiline
                    rows={4}
                    name="description"
                    value={input.description}
                    helperText={errInput.descriptionErr}
                    variant="standard"
                    onChange={handleChange}
                />

                <TextField
                    required
                    error={errInput.priceErr === "" ? false : true}
                    id="standard-error-helper-number-required"
                    label="Price"
                    name="price"
                    type="number"
                    value={input.price}
                    helperText={errInput.priceErr}
                    variant="standard"
                    onChange={handleChange}
                />
                {input.img !== "" && errInput.imgErr === "" ?
                    <img src={`${input.img}`} /> : ""
                }
                <TextField
                    required
                    error={errInput.imgErr === "" ? false : true}
                    id="standard-error-helper-text-required"
                    label="Image"
                    name="img"
                    value={input.img}
                    helperText={errInput.imgErr}
                    variant="standard"
                    onChange={handleChange}
                />

                <div className='createProductFormBtnContainer'>
                    <Button variant="contained" size="small" onClick={handleSumbit}>
                        {isEditing ? "Update" : "Create"}
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