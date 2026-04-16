import { useNavigate } from 'react-router-dom'

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate()

  if (saved.length === 0) {
    return (
      <div className="page">
        <h2>Saved Items</h2>
        <p>You haven't saved anything yet. Search for a food and save it from the detail page.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Saved Items ({saved.length})</h2>
      <div className="food-list">
        {saved.map((product) => (
          <div key={product.code} className="saved-item">
            {product.image_small_url && (
              <img src={product.image_small_url} alt={product.product_name} />
            )}
            <h3>{product.product_name}</h3>
            {product.brands && <p className="brand">{product.brands}</p>}
            <div className="saved-actions">
              <button 
                className="view-button"
                onClick={() => navigate(`/product/${product.code}`)}
              >
                View Details
              </button>
              <button 
                className="remove-button"
                onClick={() => dispatch({ type: 'REMOVE', code: product.code })}
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