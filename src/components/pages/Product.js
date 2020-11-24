import React, { useEffect, useContext } from 'react'
import ProductsContext from '../../context/product/productContext'
import Spinner from '../layout/Spinner'
import './styles/productStyles.scss'

const Product = props => {
  const productContext = useContext(ProductsContext)
  const { getSingleProduct, currentProduct, getMedias } = productContext
  const productId = props.match.params.productId

  useEffect(() => {
    getSingleProduct(productId)
  }, [productId])
  return (
    <div>
      {currentProduct.loading ? (
        <Spinner />
      ) : (
        <div className='product'>
          <div className='field-group'>
            <span className='field-title'>Title:</span>
            <p>{currentProduct.data?.title}</p>
          </div>
          <div className='field-group'>
            <span className='field-title'>Name:</span>
            <p>{currentProduct.data?.name}</p>
          </div>
          <div className='field-group'>
            <span className='field-title'>Category:</span>
            <p>{currentProduct.data?.category?.name}</p>
          </div>
          <div className='field-group'>
            <span className='field-title'>Description:</span>
            <div
              dangerouslySetInnerHTML={{
                __html: currentProduct.data?.description,
              }}
            />
          </div>
          <div>
            {/* there is probably something wrong with api, despite getting url, it is not a valid image address */}
            {currentProduct.imageUrl.url ? (
              <img src={currentProduct.imageUrl.url} alt='product image' />
            ) : (
              <code>image is loading...</code>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Product
