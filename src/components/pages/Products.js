import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductsContext from '../../context/product/productContext'
import DataGrid, {
  GroupPanel,
  Grouping,
  Paging,
  Column,
} from 'devextreme-react/data-grid'
import { formatProductsList } from '../../utils/formatProductsFields'
import Spinner from '../layout/Spinner'

const Products = () => {
  const productsContext = useContext(ProductsContext)
  const { loading, products, getProducts } = productsContext
  useEffect(() => {
    getProducts()
  }, [])

  const formattedProducts =
    products.entries.length > 0 ? formatProductsList(products.entries) : []

  const renderLink = value => {
    return <Link to={`/products/${value.key.id}`}>{value.key.title}</Link>
  }
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <DataGrid
          dataSource={formattedProducts}
          allowColumnReordering={true}
          showBorders={true}
        >
          <GroupPanel visible={true} />
          <Grouping autoExpandAll={true} />
          <Paging defaultPageSize={10} />
          <Column
            dataField='Title'
            caption='Title'
            alignment='left'
            width={200}
            cellRender={renderLink}
          />
          <Column
            dataField='category'
            caption='Category'
            alignment='left'
            width={200}
          />
          <Column
            dataField='created_at'
            caption='Created At'
            alignment='left'
            width={200}
          />
          <Column
            dataField='picture'
            caption='Picture ID'
            alignment='left'
            width={200}
          />
        </DataGrid>
      )}
    </div>
  )
}

export default Products
