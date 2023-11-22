import express from 'express'
import { productManager } from "./productManager.js"

const app = express();
app.use(express.json())

app.get('/api/products', async (req, res)=>{
    const {limit} = req.query;
    try{
        const products = await productManager.getProducts(req.query);
        if(limit){
            const productLimit = products.slice(0, +limit)
            res.status(200).json({message:"Product found", productLimit})
        } else {
            res.status(200).json({message: "Product found", products})
        }
    } catch (error){
        res.status(500).json({message: error.message})
    }})

app.get('/api/product/:id', async(req, res)=>{
    const {id} = req.params;
    try {
        const product = await productManager.getProductById(parseInt(id));
        if (!product){
            res
            .status(404)
            .json({message: "Product not found with the id provided"});
        }
        res.status(200).json({message:"Product found", product})
    } catch(error){
        res.status(500).json({message: error.message})
    }})

app.listen(8080, ()=>{
    console.log("escuchando al puerto 8080");
})