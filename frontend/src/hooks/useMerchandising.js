import axios from "axios";
import AppContext from "../../contexts/AppContext";
import { useContext, useState } from "react";
export  function useMerchandising() {
  const { setShowMessageModal } = useContext(AppContext);
  const [products, setProducts] = useState();
  const getProducts = async () => {
    const res = await fetch('http://localhost:3001/api/products');
    const products = await res.json();
    return setProducts(products);
  };
    const handlerDelete = async (id) => {
        try {
          await axios.delete(
            `http://localhost:3001/api/products/${id}`
          );
          setShowMessageModal('Producto eliminado con éxito')
          getProducts()
        } catch (error) {
          setShowMessageModal(`Ha ocurrido un error: ${error} `)
        }
      };
    
      const handlerCreate = async (product) => {
        try {
          const { data } = await axios.post(
            `http://localhost:3001/api/products`,
            product
          );
          setShowMessageModal('Producto agregado con éxito')
          getProducts()
        } catch (error) {
          setShowMessageModal(`Ha ocurrido un error: ${error} `)
        }
      };
    
      const handlerModify = async (post) => {
        try {
          const { data } = await axios.put(
            `http://localhost:3001/api/products/${post.id}`,
            post
          );
          setShowMessageModal('Producto actualizado con éxito')
          getProducts()
        } catch (error) {
          setShowMessageModal(`Ha ocurrido un error: ${error} `)
        }
      };
    
      return {
        handlerDelete,
        handlerCreate,
        handlerModify,
        getProducts,
        products
      };
}