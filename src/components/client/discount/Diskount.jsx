import { NavLink } from 'react-router-dom';
import { useGetDiscountQuery } from '../../../redux/slice/client/discount';
import { useGetProductQuery } from '../../../redux/slice/client/getProduct';
import { useCreateBasketMutation } from '../../../redux/slice/client/basket';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Diskount = () => {

    const { data: discount } = useGetDiscountQuery()
    const { data: product, isLoading, } = useGetProductQuery();
    const [createBasket, { isLoading: createIsloading, isSuccess }] = useCreateBasketMutation()
    console.log(discount);


    const token = localStorage.getItem('user')
    if (token) {
      axios.post('users/check_token/', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
    }
    else {
      axios.get('users/get_token/')
        .then(res => {
          const token = res.data.access_token;
          localStorage.setItem('user', token);
        })
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
  
  
    useEffect(() => {
      setFilter(product);
    }, [product]);
    const [filter, setFilter] = useState(product);
  
    const addData = async (product) => {
      const formData = new FormData();
      formData.append('amount', 1);
      formData.append('product', product.id);
      try {
        await createBasket(formData).unwrap();
        toast.success(`maxsulod  qushildi`);
  
      } catch (error) {
        toast.error(`Failed to add category `);
      }
    };
  

    return (
        <div>

            <div className="col-md-13 py-md-3">
                <div className="row">
                    {discount?.map((product) => {
                                const formatDate = (dateString) => {
                                  const options = {
                                      hour12: false,
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      second: '2-digit',
                                  };
                                  const dateObject = new Date(dateString);
                                  return dateObject.toLocaleString('en-US', options);
                              };

                              const formattedStartDate = product.start_date ? formatDate(product.start_date) : '';
                              const formattedStartDate2 = product.end_date ? formatDate(product.end_date) : '';


                        return (
                            <div className="col-6 col-md-3  col-lg-3 mb-1" key={product?.id}>
                                <div className="card h-100">
                                <div className="m-3 mb-0">
                                  
                                        <h1 className="card-title">{formattedStartDate}</h1>
                                    </div>
                                    <NavLink to={`/product/${product?.id}`}>
                                        <img src={product?.thumbnail_image} className="w-full aspect-square object-cover" style={{ height: "300px", width: "", objectFit: "contain" }} alt={product?.title} />
                                    </NavLink>
                                    <div className="m-3 mb-0">
                                  
                                  <small className="card-title">{formattedStartDate2}</small>
                              </div>
                                    <div className="m-3 mb-0">
                                        <h1 className="card-title">{product?.title}</h1>
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

                                    <button
                                        className="btn  btn-sm m-3 border-primary"
                                    >
                                        Sotib olish
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Diskount