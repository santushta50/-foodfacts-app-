import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
  const navigate = useNavigate()
  const { product_name, brands, nutriments, image_small_url, code } = product

  const handleClick = () => {
    navigate(`/product/${code}`, { state: { product } })
  }

  return (
    <div className="food-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {/* render the product image if it exists */}
      {image_small_url && (
        <img 
          src={image_small_url} 
          alt={product_name || 'Product'} 
          className="food-card-image"
        />
      )}
      
      {/* render the product name */}
      {product_name ? (
        <h2>{product_name}</h2>
      ) : (
        <h2>Unknown Product</h2>
      )}
      
      {/* render the brand */}
      {brands && <p className="brand"><strong>Brand:</strong> {brands}</p>}
      
      {/* render calories, protein, carbs, fat from nutriments */}
      {nutriments && (
        <div className="nutriments">
          {nutriments?.['energy-kcal_100g'] && (
            <p>Calories: {nutriments['energy-kcal_100g']} kcal per 100g</p>
          )}
          {nutriments?.proteins_100g && (
            <p>Protein: {nutriments.proteins_100g}g per 100g</p>
          )}
          {nutriments?.carbohydrates_100g && (
            <p>Carbs: {nutriments.carbohydrates_100g}g per 100g</p>
          )}
          {nutriments?.fat_100g && (
            <p>Fat: {nutriments.fat_100g}g per 100g</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FoodCard