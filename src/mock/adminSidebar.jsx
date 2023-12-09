import { MdOutlineShoppingBag } from 'react-icons/md';
import ProductTable from '../components/admin/productCrud/Table';
import { AiOutlineHome } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

export  const SidebarAdmin = [
    {
        id: 1,
        title: 'Dashbbord',
        path: '/dashbord',
        element: 'dssas',
        icon:<AiOutlineHome />
    },
    {
        id: 2,
        title: 'Product',
        path: '/product',
        element: <ProductTable/>,
        icon:<BiCategory />

    },
    {
        id: 3,
        title: 'Categorie',
        path: '/categorie',
        element: 'dssa',
        icon:<MdOutlineShoppingBag  />

    },
    {
      id: 3,
      title: 'SubCategorie',
      path: '/subcategorie',
      element: 'dssa',
      icon:<MdOutlineShoppingBag  />
  },
    {
        id: 4,
        title: 'Order',
        path: '/order',
        element: 'sdasa',
        icon:<MdOutlineShoppingBag  />

    },
    {
      id: 3,
      title: 'Order',
      path: '/discount',
      element: 'sdasa',
      icon:<MdOutlineShoppingBag  />

  },
]






const menuItems = [
  {
    id: 1,
    element: 'component',
    title: "Boshsahifa",
    path: "/",
    private: true,
    hidden: true,
    icon: <MdOutlineShoppingBag />,
  },
  {
    id: 1,
    title: "Analiytika",
    path: '/analiytics',
    admins: ['Tasischi', 'Manager'],
    private: true,
    icon: <MdOutlineShoppingBag />,
  },

  {
    id: 2,
    title: "O'qituvchilar",
    path: "/teachers",
    private: true,
    hidden: true,
    element: 'component',
    icon: <MdOutlineShoppingBag />,
  },
  {
    id: 3,
    title: "O'quvchilar",
    path: "/students",
    private: true,
    hidden: true,
    element: 'jksd',
    icon: <MdOutlineShoppingBag />,
  },
  {
    id: 4,
    title: "Ota-Onalar",
    path: "/parents",
    private: true,
    hidden: true,
    element: 'j',
    icon: <MdOutlineShoppingBag />,
  },
  {
    id: 5,
    title: "Vazifalar",
    path: "/tasks",
    private: true,
    hidden: true,
    element: 'kk',
    icon: <MdOutlineShoppingBag />,
  },
  {
    id: 6,
    title: "Davomat",
    path: "/attandance",
    private: true,
    hidden: true,
    element: 'component',
    icon: <MdOutlineShoppingBag />,
  },

];

export default menuItems;


