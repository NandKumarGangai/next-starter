'use client';
import React from 'react'
import styles from "@/app/[locale]/dashboard/page.module.css";
import TopNavigation from '@/components/topNavigation';

const Dashboard = () => {
  return (
    <>
    <TopNavigation />
    <main className={styles?.root}>
      Dashboard
    </main>
    </>
  )
}

export default Dashboard