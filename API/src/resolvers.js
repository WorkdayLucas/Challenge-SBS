import Product from './models/product.js'

export const resolvers = {
    Query: {
        products: async()=> await Product.find()
    },

    Mutation: {
        createProduct: async (_, {input})=> {
          const products = await Product.find()
          input.key = products.length
          const newProduct = new Product(input)
          await newProduct.save()
          return newProduct
        },
        deleteProduct: async(_, {_id})=> await Product.findByIdAndDelete(_id),
        updateProduct: async(_, {_id, input})=> await Product.findByIdAndUpdate(_id, input)
    }
}