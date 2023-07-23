import TopNavigation from '@/components/topNavigation'
import { Skeleton } from 'antd'

export default function Home() {
  return (
    <>
      <TopNavigation />
      <main className="mt-20 flex min-h-screen flex-col items-center justify-between p-24">
        <Skeleton active />;
      </main>
    </>
  )
}
