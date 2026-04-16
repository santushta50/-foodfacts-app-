import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )
        if (!cancelled) {
          setProduct(response.data.product)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load product details.')
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const isSaved = saved.some(p => p.code === barcode)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product: product })
    }
  }

  if (loading) return <div className="page"><p>Loading product details...</p></div>
  if (error) return <div className="page"><ErrorMessage message={error} /></div>
  if (!product) return <div className="page"><p>Product not found.</p></div>

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