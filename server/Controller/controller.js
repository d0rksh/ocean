const { validationResult } = require("express-validator");

var products = []
const addProducts = (req,res)=>{
   const result = validationResult(req);
   if(!result.isEmpty()){
     return res.status(400).json({status:'failed',data:result.array()[0].msg})
   }
   const {name,phone,email,amount,size,color} = req.body
   color.forEach((s,index) => {
         size.forEach((c,index2) => {
             const data = {name,phone,email,amount,size,color:s,size:c}
             data.id = products.length + 1
             products.push(data)
         })
   });

   res.json({status:'success',data:'products has been added'})
}

const deleteProducts = (req,res)=>{
   const {id} = req.body
   const index = products.findIndex(product => product.id === id)
   if(index !== -1){
      const copy = [...products]
      copy.splice(index,1)
      products = copy
   }
   res.json({status:'success',data:'products has been deleted'})
}

const editProduct  =(req,res)=>{
    const result = validationResult(req);
   if(!result.isEmpty()){
     return res.status(400).json({status:'failed',data:result.array()[0].msg})
   }
   const {name,phone,email,amount,id} = req.body
   const index = products.findIndex(product => product.id === id)
   if(index!== -1){
        const copy = [...products]
        const product = {name,phone,email,amount,id,size:copy[index].size,color:copy[index].color}
        copy[index] = product
        products = copy
        res.json({status:'success',data:'products has been updated'})

    }else{
    res.status(400).json({status:'failed',data:'product not found'})
   }
}
const getProducts  = (req,res)=>{
    res.json({status:'success',data:products})
}



module.exports = {
    addProducts,
    deleteProducts,
    editProduct,
    getProducts
}
