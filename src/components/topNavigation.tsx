'use client';
import { Button, Spin, notification } from 'antd'
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from "@/components/topNavigation.module.css";

const TopNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  console.log("pathname", pathname);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get('/api/user/logout')
      notification.success({ message: 'Logout successful' })
      router.push('/login');
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
      notification.error({ message: error.message })
    } finally {
      setLoading(false);
    }
  }

  const navigateToResourseMagmt = () => {
    router.push("/resources");
  }

  const navigateToDashboard = () => {
    router.push("/dashboard");
  }
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

  return (
    <nav className={styles?.root}>
      <div className={styles?.wrapper}>
        <a href="https://flowbite.com/" className={styles.img_link}>
          <Image src="https://flowbite.com/docs/images/logo.svg" className={styles?.img_logo} width={100} height={100} alt="Flowbite Logo" />
          <span className={styles?.logo_name}>Flowbite</span>
        </a>
        <div className={styles?.menu_wrapper}>
          <Button type="primary" className='bg-[#1677ff] my-auto mx-2' disabled={loading} onClick={logout}>
            Logout
            {loading && <Spin size='small' className='pl-4' />}
          </Button>
          {/* <button data-collapse-toggle="navbar-sticky" type="button" data-toggle="true" className={styles.mobile_menu_toggle_btn} aria-controls="navbar-sticky" aria-expanded="false"> */}
          <button
            className="flex flex-col h-8 w-8 border border-transparent rounded justify-center items-center group md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {/* <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg> */}
            <div
              className={`${genericHamburgerLine} ${isOpen
                ? "rotate-45 translate-y-2 opacity-50 group-hover:opacity-100"
                : "opacity-50 group-hover:opacity-100 mb-0"
                }`}
            />
            <div
              className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100 m-0"
                }`}
            />
            <div
              className={`${genericHamburgerLine} ${isOpen
                ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                : "opacity-50 group-hover:opacity-100 mt-0"
                }`}
            />
          </button>
        </div>
        <div className={`${styles.navigation} test1`} id="navbar-sticky">
          <ul className={styles?.nav_container}>
            <li>
              <p onClick={navigateToDashboard} className={`${styles.navigation_item} ${pathname?.includes("/dashboard") ? "text-blue-800 hover:text-blue-700" : ""}`} aria-current="page">Dashboard</p>
            </li>
            <li>
              <p onClick={navigateToResourseMagmt} className={`${styles.navigation_item} ${pathname?.includes("/resources") ? "text-blue-800 hover:text-blue-700" : ""}`}>Resource Management</p>
            </li>
          </ul>
        </div>

        <div className={`${isOpen ? styles?.navigation_mobile : "hidden"} test2`} id="navbar-sticky">
          <ul className={styles?.nav_container}>
            <li>
              <p onClick={navigateToDashboard} className={`${styles.navigation_item} ${pathname?.includes("/dashboard") ? "text-blue-800 hover:text-blue-700" : ""}`} aria-current="page">Dashboard</p>
            </li>
            <li>
              <p onClick={navigateToResourseMagmt} className={`${styles.navigation_item} ${pathname?.includes("/resources") ? "text-blue-800 hover:text-blue-700" : ""}`}>Resource Management</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default TopNavigation