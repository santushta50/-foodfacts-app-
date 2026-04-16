import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addItem, removeItem } from '../store/savedSlice'

function DetailPage() {
  const dispatch = useDispatch()
  const savedItems = useSelector(state => state.saved.items)

  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state?.product

  const isSaved = savedItems.some(p => p.id === product?.id)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch(removeItem(product.id))
    } else {
      dispatch(addItem(product))
    }
  }

  if (!product) {
    return (
      <div className="page">
        <p>Product not found.</p>
        <button onClick={() => navigate('/')}>← Back to Search</button>
      </div>
    )
  }

  const { product_name, brands, nutriments, image_small_url } = product

  return (
    <div className="page detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-header">
        {image_small_url && (
          <img src={image_small_url} alt={product_name} className="detail-image" />
        )}
        <div>
          <h1>{product_name || 'Unknown Product'}</h1>
          {brands && <p className="detail-brand">Brand: {brands}</p>}
        </div>
      </div>

      <div className="nutrition-table">
        <h3>Nutrition per 100g</h3>
        {nutriments ? (
          <div className="nutriment-list">
            {nutriments['energy-kcal_100g'] && (
              <div className="nutriment-item">
                <span className="nutriment-label">Calories:</span>
                <span className="nutriment-value">{nutriments['energy-kcal_100g']} kcal</span>
              </div>
            )}
            {nutriments.proteins_100g && (
              <div className="nutriment-item">
                <span className="nutriment-label">Protein:</span>
                <span className="nutriment-value">{nutriments.proteins_100g}g</span>
              </div>
            )}
            {nutriments.carbohydrates_100g && (
              <div className="nutriment-item">
                <span className="nutriment-label">Carbs:</span>
                <span className="nutriment-value">{nutriments.carbohydrates_100g}g</span>
              </div>
            )}
            {nutriments.fat_100g && (
              <div className="nutriment-item">
                <span className="nutriment-label">Fat:</span>
                <span className="nutriment-value">{nutriments.fat_100g}g</span>
              </div>
            )}
            {nutriments.fiber_100g && (
              <div className="nutriment-item">
                <span className="nutriment-label">Fiber:</span>
                <span className="nutriment-value">{nutriments.fiber_100g}g</span>
              </div>
            )}
            {nutriments.sugars_100g && (
              <div className="nutriment-item">
                <span className="nutriment-label">Sugars:</span>
                <span className="nutriment-value">{nutriments.sugars_100g}g</span>
              </div>
            )}
          </div>
        ) : (
          <p>Nutrition information not available.</p>
        )}
      </div>

      <button onClick={handleSaveToggle} className="save-button">
        {isSaved ? '★ Remove from Saved' : '☆ Save to My List'}
      </button>
    </div>
  )
}

export default DetailPage