import Link from "next/link";
import { AiFillHeart, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { useCart } from "../../hooks/useCart";
import { useFavorite } from "../../hooks/useFavorite";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  priceFormatted: string;
}

interface HomeItemsProps {
  products: Product[];
}

interface CartItemsAmount {
  [key: number]: number;
}

export function HomeItems({products}: HomeItemsProps){
  const { addProduct,cart  } = useCart();
  const { addFavorite, isFavorited } = useFavorite()

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = {...sumAmount};
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount)

  
  function handleAddProduct(id: number) {
    addProduct(id)
  }

  function handleAddFavorite(id: number){
    addFavorite(id)
  }

  return <>
    {products.map(product => (
      <li key={product.id}>
        <Link href={`/products/${product.id}`}>
          <a>
            <img src={product.image} alt={product.title}/>
          </a>
        </Link>
        <strong>{product.title}</strong>
        <span>
          {product.priceFormatted}
          <button 
            type="button"
            data-testid="add-favorite-button"
            onClick={() => handleAddFavorite(product.id)}
          >
            {isFavorited(product.id)}
          </button>
        </span>
        <button
          type="button"
          data-testid="add-product-button"
          onClick={() => handleAddProduct(product.id)}
        >
          <div data-testid="cart-product-quantity">
            <AiOutlineShoppingCart size={20} color="#FFF" />
            {cartItemsAmount[product.id] || 0} 
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    ))}
  </>
}