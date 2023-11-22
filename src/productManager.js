import fs from 'fs'


let products = [];
class ProductManager {
    constructor(){
       this.path = 'Products.json'  
    } 
    async getProducts(){
      try {
        if(fs.existsSync(this.path)){ 
          const productsFile = await fs.promises.readFile(this.path, 'utf-8')
          return JSON.parse(productsFile)
      } else {
          return []
    }
    } catch (error) {
        return error
    }}
    
    async addProduct(productoCreado){
      
        try {  
            let id
            if(!products.length){
                id = 1
            } else {
                id = products[products.length-1].id+1
            }
            products.push({id,...productoCreado}) 
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        }
        catch(error){
            return error
        }
        }
    async getProductById(id){ 
      try {
        const products = await this.getProducts();
        const product = products.find(u=>u.id === id)
      if(!product){
        return 'no product'
    } else {
        return product
    }
    } catch (error){
        return error
    }}
    
    async deleteProduct(id){
        const products = await this.getProducts()
        const newProducts = products.filter(u=>u.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
    }

    async updateProduct({id, ...producto}){
      const products = await this.getProducts()
      if(products.find(e=> e.id === id)) {
        await this.deleteProduct(id);
        const newProducts1= await this.getProducts();
        const newProducts2 = [{id, ...producto}, ...newProducts1];
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts2))  
    } else {
      console.log(`el ID ${id} que deseas actualizar no existe`)
      return
    }}}

const producto1 = {
    title: 'Empanadas',
    description: 'Comida',
    price: 500,
    thumbnail: 'http://...',
    code: 'Codigo001',
    stock: 250
}
const producto2 = {
    title: 'Gaseosa',
    description: 'Bebida',
    price: 600,
    thumbnail: 'http://...',
    code: 'Codigo002',
    stock: 500
}
const producto3 = {
    title: 'Pizza',
    description: 'Comida',
    price: 215,
    thumbnail: 'http://...',
    code: 'Codigo003',
    stock: 400
}
const producto = new ProductManager();
producto.addProduct(producto1);
producto.addProduct(producto2);
producto.addProduct(producto3);

console.log(products);

export const productManager = new ProductManager()
