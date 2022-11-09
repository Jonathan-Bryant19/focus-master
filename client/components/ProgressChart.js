import React from 'react'
import { View, processColor, StyleSheet } from 'react-native'
import { LineChart } from 'react-native-charts-wrapper'

export default function ProgressChart( {userScores} ) {
    return (
        <View style={styles.chartContainer}>
                <LineChart 
                    style={styles.chart}
                    data={
                        {dataSets: [{
                            label: "On Task %", 
                            values: userScores,
                            config: {
                                circleRadius: 5,
                                circleColor: processColor('red'),
                                drawCircles: true,
                                lineWidth: 2,
                                drawCircleHole: false,
                                colors: [processColor('white')], // line color
                                drawValues: false,
                                valueFormatter: 'integer'
                            },
                        }],
                            
                        }
                    }
                    legend={ 
                        {
                            enabled: true,
                            horizontalAlignment: 'CENTER',
                            fontFamily: 'rexlia',
                            textColor: processColor('red')
                        } 
                    }
                    marker={
                        {
                            enabled: true,
                            digits: 2,
                            markerColor: processColor('black'),
                            textColor: processColor('red'),
                            textSize: 15
                        }
                    }
                    chartBackgroundColor={processColor('blue')}
                    drawBorders={true}
                    borderColor={processColor('red')}
                    borderWidth={2}
                    xAxis={
                        {
                            enabled: true,
                            position: 'BOTTOM',
                            fontFamily: 'rexlia',
                            drawGridLines: false,
                            textSize: 12,
                            granularityEnabled: true,
                            granularity: 1,
                            textColor: processColor('white')
                        }
                    }
                    yAxis={
                        {
                            left: {
                                enabled: true,
                                fontFamily: 'rexlia',
                                textSize: 12,
                                granularity: 1,
                                textColor: processColor('white'),
                                axisMinimum: 0,
                                axisMaximum: 100
                            },
                            right: {
                                enabled: false
                            }
                        }
                    }
                    animation={
                        {
                            durationX: 0,
                            durationY: 1500,
                            easingY: 'EaseInOutQuart'
                        }
                    }
                />
            </View>
    )
}

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        maxHeight: 240,
        width: 375,
        marginTop: 20,
        marginBottom: 20
    },
    chart: {
        flex: 1
    }
});