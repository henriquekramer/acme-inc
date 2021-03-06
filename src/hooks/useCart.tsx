import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { setCookie, parseCookies } from "nookies";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  useEffect(()=>{
    const { AcmeIncCart } = parseCookies()

    if(AcmeIncCart){
      setCart(JSON.parse(AcmeIncCart))
    }
  },[])

  const [cart, setCart] = useState<Product[]>([])

  const addProduct = async(productId: number) => {
    try {
      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);
      const stock = await api.get(`/stock/${productId}`);
      const stockAmount = stock.data.amount;
      const currentAmount = productExists ? productExists.amount : 0;
      const amount = currentAmount + 1;

      if ( amount > stockAmount ) {
        toast.error('Quantidade solicitada fora de estoque', { theme: "colored"});
        return;
      }

      if(productExists) {
        productExists.amount = amount;
      } else {
        const product = await api.get(`/products/${productId}`)

        const newProduct = {
          ...product.data,
          amount: 1
        }
        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
      setCookie(null, 'AcmeIncCart', JSON.stringify(updatedCart), {
        maxAge: 60 * 60 * 24 * 30, 
        path: '/' 
      })
      
      toast.success('Produto adicionado ao carrinho 😁',{ theme: "colored"})
    } catch {
      toast.error('Erro na adição do produto',{ theme: "colored"});
    }
  }

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(product => product.id === productId)

      if(productIndex >= 0){
        updatedCart.splice(productIndex, 1)
        setCart(updatedCart);
        setCookie(null, 'AcmeIncCart', JSON.stringify(updatedCart), {
          maxAge: 60 * 60 * 24 * 30, 
          path: '/' 
        })
      } else {
        throw Error();
      }
      toast.success('Produto removido do carrinho 😞',{ theme: "colored"})
    } catch {
      toast.error('Erro na remoção do produto',{ theme: "colored"});
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if(amount <= 0){
        return;
      }

      const stock = await api.get(`/stock/${productId}`);
      const stockAmount = stock.data.amount;

      if(amount > stockAmount){
        toast.error('Quantidade solicitada fora de estoque',{ theme: "colored"});
        return;
      }

      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);
      if(productExists) {
        productExists.amount = amount;
        setCart(updatedCart);
        setCookie(null, 'AcmeIncCart', JSON.stringify(updatedCart), {
          maxAge: 60 * 60 * 24 * 30, 
          path: '/' 
        })
      } else {
        throw Error();
      }

    } catch {
      toast.error('Erro na alteração de quantidade do produto',{ theme: "colored"});
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);
  return context
}