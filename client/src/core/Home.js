import React, {useState, useEffect} from "react";
import '../styles.css'
import Base from './Base'
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";


export default function Home() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)


  const loadAllProducts = () => {
    getAllProducts().then(data => {
      if(data && data.error)
         setError(data.error)
      else
         setProducts(data)
    })
    .catch(err => console.log(err))
  }


  useEffect(() => {
    loadAllProducts();
  }, [])
  
  return (
   
    <Base title = "Home Page" description = "This is a Home page" className = "container">
      <h2 className = "text-white">Jeans for every1</h2>
       <div className = "row text-center">
         
         
         {products && products.map((product, index) => {
           return (
             <div key ={index} class = "col-4 mb-4">
               <Card product = {product} description = {product.description} title = {product.name} price = {product.price}/>
               </div>
           )
         })}
     
       </div>
       
     
     
    </Base>
  );
}
