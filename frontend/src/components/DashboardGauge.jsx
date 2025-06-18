import { Box } from '@mui/material'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'

const settings = {
    width: 300,
    height: 300,
    value: 60
}

const DashboardGauge = () => {

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Gauge
              {...settings}
              cornerRadius="50%"
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 50,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: '#365e8c',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: '#f1f1f1',
                },
              })}
            />
        </Box>
      );
}

export default DashboardGauge