import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'

import React from 'react'

const page = () => {
  return (
    <main className="bg-gray-200">
      <section className="flex">
        <LeftSidebar />
        <h1>Activity</h1>
         
      </section>
    </main>
  )
}

export default page