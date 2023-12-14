import React from 'react'
import { useGetDiscountQuery } from '../../redux/slice/client/discount'
import { NavLink } from 'react-router-dom'

const DIskount = () => {
  const { data } = useGetDiscountQuery()
  console.log(data, 'diskount');
  return (
    <div>
      <h1>Bugungi aksiyalar</h1>
      <div className='container mx-auto'>
        <div className="col-md-13 py-md-3">
          <div className="row">
            {data?.map((product) => (
              <div className="col-6 col-md-3 col-lg-3 mb-1" key={product?.id}>
                <div className="card h-100">

                  <NavLink to={`/product/${product?.id}`}>
                    <img
                      src={product?.image}
                      className=""
                      style={{ height: "300px", width: "", objectFit: "contain" }}
                      alt={product?.title}
                    />
                  </NavLink>
                  <div className="m-3 mb-0">
                    <small className="card-title">{product?.title}</small>
                  </div>

                  <div style={{ marginTop: "auto" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="m-3"><b>{product?.price}</b></div>
                      <NavLink className="" to={`/product/${product?.id}`}>
                        <button className="btn btn-sm m-3 border-primary">
                          <i className="fa fa-arrow-right text-muted"></i>
                        </button>
                      </NavLink>
                    </div>
                  </div>
                  <button className="btn btn-outline-primary">Add to Cart</button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DIskount