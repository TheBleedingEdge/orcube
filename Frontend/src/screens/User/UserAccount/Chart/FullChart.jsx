import React from 'react'
import UsersChart from './userChart'
import IncomeChart from './incomeChart'

function FullChart() {
    return (
        <div>
            <UsersChart />
            <div>
                <IncomeChart />
            </div>
        </div>
    )
}

export default FullChart