import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeItem } from '../store/savedSlice'

function SavedPage() {
  const dispatch = useDispatch()
  const savedItems = useSelector(state => state.saved.items)

  const navigate = useNavigate()

  if (savedItems.length === 0) {
    return (
      <div className="page">
        <h2>Saved Items</h2>
        <p>You haven't saved anything yet. Search for a food and save it from the detail page.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Saved Items ({savedItems.length})</h2>
      <div className="food-list">
        {savedItems.map((product) => (
          <div key={product.id} className="saved-item">
            {product.image_small_url && (
              <img src={product.image_small_url} alt={product.product_name} />
            )}
            <h3>{product.product_name}</h3>
            {product.brands && <p className="brand">{product.brands}</p>}
            <div className="saved-actions">
              <button
                className="view-button"
                onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
              >
                View Details
              </button>
              <button
                className="remove-button"
                onClick={() => dispatch(removeItem(product.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedPage