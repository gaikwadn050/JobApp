import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/ChartsContainer'
import BartChart from './BartChart'
import AreaChartComponent from './AreaChartComponent'

const ChartContainer = ({ data }) => {
    const [barChart, setBarChart] = useState(false)
    return (
        <Wrapper>
            <button onClick={() => setBarChart(!barChart)}>
                {barChart ? 'Area Chart' : 'Bar Chart'}</button>
            {barChart ? <BartChart data={data} /> : <AreaChartComponent data={data} />}
        </Wrapper>
    )
}

export default ChartContainer
