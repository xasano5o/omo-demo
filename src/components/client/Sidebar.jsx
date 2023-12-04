import React from 'react'
import { useGetCategoryQuery } from '../../redux/slice/client/category/index.js'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const { data } = useGetCategoryQuery();
    const navigate = useNavigate()
    return (
        <div>
            <div class="row  w-1">
                <div class="col-100%">
                    <div class="list-group" id="list-tab" role="tablist">
                 
                        {
                            data?.map((value, index) => (
                                <a
                                    key={index} // Make sure to add a unique key for each item
                                    className={`d-flex px-4 align-items-center justify-content-between list-group-item list-group-item-action ${index === 0 ? 'active' : ''}`}
                                    data-bs-toggle="list"
                                    href={`#list-${value?.id}`}
                                    role="tab"
                                    aria-controls={`list-${value?.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/categories/${value?.slug}`)
                                    }}
                                >
                                    <img
                                        style={{
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            border: '1px solid #ccc', // You can add a border if needed
                                        }}
                                        src={value.thumbnail_image} alt="as" />
                                    {value?.title}
                                    <span></span>
                                </a>
                            ))
                        }
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#scrollspyHeading3">Third</a></li>
                            <li><a class="dropdown-item" href="#scrollspyHeading4">Fourth</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#scrollspyHeading5">Fifth</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar