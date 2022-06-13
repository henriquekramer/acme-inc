import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { setCookie, parseCookies } from "nookies";

interface FavoriteProviderProps {
  children: ReactNode;
}

interface FavoriteContextData {
  favorite: Product[];
  addFavorite: (productId: number) => Promise<void>;
  removeFavorite: (productId: number) => void;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const FavoriteContext = createContext<FavoriteContextData>({} as FavoriteContextData)

export function FavoriteProvider({ children }: FavoriteProviderProps) {
  useEffect(()=>{
    const { AcmeIncFavorite } = parseCookies()

    if(AcmeIncFavorite){
      setFavorite(JSON.parse(AcmeIncFavorite))
    }
  },[])

  const [favorite, setFavorite] = useState<Product[]>([])

  const addFavorite = async(productId: number) => {
    try {
      const updatedFavorite = [...favorite];
      const productExists = updatedFavorite.find(product => product.id === productId)
      
      if(!productExists){
        const product = await api.get(`/products/${productId}`)
        const newProduct = {...product.data}
        updatedFavorite.push(newProduct)
      }

      setFavorite(updatedFavorite);
      setCookie(null, 'AcmeIncFavorite', JSON.stringify(updatedFavorite), {
        maxAge: 60 * 60 * 24 * 30, 
        path: '/' 
      })
      
      toast.success('Produto favoritado')
    } catch {
      toast.error('Erro na adição do produto');
    }
  }

  const removeFavorite = (productId: number) => {
    try {
      const updatedFavorite = [...favorite];
      const productIndex = updatedFavorite.findIndex(product => product.id === productId)

      if(productIndex >= 0){
        updatedFavorite.splice(productIndex, 1)
        setFavorite(updatedFavorite);
        setCookie(null, 'AcmeIncFavorite', JSON.stringify(updatedFavorite), {
          maxAge: 60 * 60 * 24 * 30, 
          path: '/' 
        })
      } else {
        throw Error();
      }

    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  return (
    <FavoriteContext.Provider
      value={{ favorite, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite(): FavoriteContextData {
  const context = useContext(FavoriteContext);
  return context
}