import React from 'react'
import UsersChart from '../Charts/UsersChart'
import MonthlyIncome from '../Charts/MonthlyIncome'
import Card from '../Charts/Card'


function Dashboard() {
  return (
    <div>
      <UsersChart />
      <div className='xl:flex'>
        <MonthlyIncome />
        <Card />
      </div>
    </div>
  )
}

export default Dashboard