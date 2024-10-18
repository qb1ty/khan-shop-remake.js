import { Alert } from 'antd';

import axios from "axios";
import { Outlet, Routes, Route, useLocation } from "react-router"
import { BrowserRouter } from "react-router-dom"

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { setIsCloseAlert, setIsCloseProfileMenu } from "./redux/redux-slice/menuSlice.js";
import { isClear } from "./redux/redux-slice/registerSlice.js";
import { isClear as isClearPasswordChange } from './redux/redux-slice/profileSlice.js';
import { url } from "./redux/store.js";

import Cart from './pages/CartPage/Cart.jsx';

import Header from "./components/Headers/Header";
import ContactPage from "./pages/ContactPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Footer from "./components/Footer/Footer.jsx";

import Personal from './pages/AccountPage/Personal.jsx';
import CloseBtn from './components/Aside/CloseBtn.jsx';

import Gamepads from "./pages/CategoriesPage/Gamepads.jsx";
import Cameras from "./pages/CategoriesPage/Cameras.jsx";
import Peripherals from "./pages/CategoriesPage/Peripherals.jsx";
import Furniture from "./pages/CategoriesPage/Furniture.jsx";
import Components from "./pages/CategoriesPage/Components.jsx";
import Clothes from "./pages/CategoriesPage/Clothes.jsx";
import Bags from "./pages/CategoriesPage/Bags.jsx";
import Shoes from "./pages/CategoriesPage/Shoes.jsx";
import Notebooks from "./pages/CategoriesPage/Notebooks.jsx";
import PlayStation from "./pages/CategoriesPage/PlayStation.jsx";
import Smartphones from "./pages/CategoriesPage/Smartphones.jsx";
import HealthBeauty from "./pages/CategoriesPage/HealthBeauty.jsx";
import Medecine from "./pages/CategoriesPage/Medecine.jsx";
import Toys from "./pages/CategoriesPage/Toys.jsx";
import PersonalProduct from './pages/ProductPage/PersonalProduct.jsx';

const componentsMap = {
  Gamepads: (props) => <Gamepads {...props} />,
  Cameras: (props) => <Cameras {...props} />,
  Peripherals: (props) => <Peripherals {...props} />,
  Furniture: (props) => <Furniture {...props} />,
  Components: (props) => <Components {...props} />,
  Clothes: (props) => <Clothes {...props} />,
  Bags: (props) => <Bags {...props} />,
  Shoes: (props) => <Shoes {...props} />,
  Notebooks: (props) => <Notebooks {...props} />,
  PlayStation: (props) => <PlayStation {...props} />,
  Smartphones: (props) => <Smartphones {...props} />,
  Health: (props) => <HealthBeauty {...props} />,
  Medecine: (props) => <Medecine {...props} />,
  Toys: (props) => <Toys {...props} />,
};

function App() {
  const categories = useSelector((store) => store.categories.categories)
  const isOpenProfileMenu = useSelector((store) => store.menu.isProfileMenu)
  const isAlert = useSelector((store) => store.menu.isAlert)
  const errorMessage = useSelector((store) => store.register.errorMessage)
  const timeoutId = useSelector((store) => store.sales.timeoutId)
  const theme = useSelector((state) => state.theme.darkMode)
  const location = useLocation()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const registerMessage = {
    "sign_up": t('success_sign_up'),
    "log_in": t('success_log_in'),
    "update": t('success_update'),
    "exit": t('success_exit'),
    "isAdded": t('success_added'),
    "error": errorMessage,
    "error_rating_unauthorized": t('error_not_looged'),
    "error_rating_assigned": t('error_rated')
  }

  const registerType = {
    "sign_up": "success",
    "log_in": "success",
    "update": "success",
    "exit": "success",
    "isAdded": "success",
    "error": "error",
    "error_rating_unauthorized": "error",
    "error_rating_assigned": "error"
  }

  // const str = "user=%7B%22id%22%3A1119616684%2C%22first_name%22%3A%22%D0%90%D1%80%D1%82%D1%91%D0%BC%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22MrArlian%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2881384825832073265&chat_type=private&auth_date=1729152562&hash=52986a5f70b379d04fa97fd53018262be94ea919ca886e59ea48837fccfe5d56"
  // const obj = Object.fromEntries(new URLSearchParams(str).entries())


  const lng = JSON.parse(localStorage.getItem("lang")) || "en";
  const register = JSON.parse(localStorage.getItem("register"))

  const handleClose = () => {
    dispatch(setIsCloseAlert())
  }

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme]);
  
  useEffect(() => {
    dispatch(isClear(lng))
    dispatch(isClearPasswordChange(lng))
    clearInterval(timeoutId)
  }, [location.pathname, location.hash])

  
  useEffect(() => {
    
    let intervalId

    if (localStorage.getItem("refresh") !== null) {
      intervalId = setInterval(async () => {
        try {
          const refreshToken = JSON.parse(localStorage.getItem("refresh"));

          if (!refreshToken) {
            clearInterval(intervalId)
            return;
          }

          const response = await axios.post(url + "/api/account/refresh/", {
            refresh: JSON.parse(localStorage.getItem("refresh"))
          })
    
          localStorage.setItem("access", JSON.stringify(response.data.access))

          return response.data
        } catch (error) {
          return error
        }
      }, 30000)
    }
    
    return;
  }, [])

  return (
    <div className="flex flex-col bg-white dark:bg-[#1a1a1a]">
      {isOpenProfileMenu && <div className="absolute top-0 right-0 left-0 bottom-0 bg-transparent z-40" onClick={() => dispatch(setIsCloseProfileMenu())}></div>}
      {isAlert && <Alert message={registerMessage[register] || "Неизвестная ошибка"} type={registerType[register] || "warning"} showIcon description={<CloseBtn click={handleClose} />} className="fixed top-10 left-1/2 -translate-x-1/2 w-1/2 z-[60] pt-2 pb-0" />}
      <Header />
      <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="contact" element={ <ContactPage /> } />
          <Route path="about" element={ <AboutPage /> } />
          <Route path="cart" element={ <Cart /> } />

          <Route path="account">
            <Route path="personal" element={<Personal />}/>
            <Route path="settings" element={<Personal />}/>
            <Route path="orders"/>
          </Route>

          <Route path="registration">
            <Route path="login" element={ <LogInPage /> } />
            <Route path="signup" element={ <SignUpPage /> } />
          </Route>

          <Route path="product">
            <Route path=":category/:id" element={ <PersonalProduct /> }/>
          </Route>

          <Route path="categories">
            {categories.map((category) => {
              const Component = componentsMap[category.component];
              return (
                <Route 
                  key={category.id} 
                  path={category.slug} 
                  element={Component ? <Component path={category.slug} /> : <></>} 
                />
              );
            })}
          </Route>

          {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
      </Routes>
      <Footer />
    </div>
  )
}

function Root() {
  return (
    <>
      <BrowserRouter>
        <App />
        <Outlet />
      </BrowserRouter>
    </>
  )
}

export default Root