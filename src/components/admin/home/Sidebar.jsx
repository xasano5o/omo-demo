import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SidebarAdmin } from '../../../mock/adminSidebar.jsx';

const Sidebar = () => {

    const navigate = useNavigate()
    return (
        <div>
            <div class="row  w-100"  >
                <div class="col-30" style={{ width: '400px' }}>
                    <div class="list-group" id="list-tab" role="tablist" style={{ height: '100vh' }} >

                        {
                            SidebarAdmin?.map((value, index) => (
                                <a
                                    key={index} // Make sure to add a unique key for each item
                                    className={`d-flex px-4 align-items-center justify-content-between list-group-item list-group-item-action ${index === 0 ? 'active' : ''}`}
                                    data-bs-toggle="list"
                                    href={`list-${value?.id}`}
                                    role="tab"
                                    // aria-controls={`list-${value?.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // navigate(`admin/${value.title}`)
                                    }}
                                >
                                    {/* <img
                                        style={{
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            border: '1px solid #ccc', // You can add a border if needed
                                        }}
                                        src={value.thumbnail_image} alt="as" /> */}
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