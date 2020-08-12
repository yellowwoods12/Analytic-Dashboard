
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";




export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);


    const arr= [4,5,7,8,9];
      this.state = {
      
        series: [
          {
            name: 'Bob',
            data: [
              {
                x: 'Maths',
                y: [ 12,23]
              },
              {
                x: 'Code',
                y: [
                 45, 56
                ]
              },
              {
                x: 'Test',
                y: [
                  23,78
                ]
              }
            ]
          },
          {
            name: 'Joe',
            data: [
              {
                x: 'Design',
                y: [
                 56,88
                ]
              },
              {
                x: 'Code',
                y: [
                  10,45
                ]
              },
              {
                x: 'Test',
                y: [
               6,60
                ]
              }
            ]
          }
        ],
        options: {
          chart: {
            height: 800,
            type: 'rangeBar'
          },
          plotOptions: {
            bar: {
              horizontal: true,
             
          },
        },
        
         dataLabels: {
            enabled: true,
          
            formatter: function(val) {
                console.log(val)
                //console.log(val3)
                var a = val[0]
                var b = val[1]
               var diff = (b-a)/2
              
              return a+diff
            },
            offsetX: 10,
           },
           annotations: {
            xaxis: [
              {
                  x : (this.props.series[0].data[0].y[1] + this.props.series[0].data[0].y[0])/2,
                borderColor: '#000',
                borderWidth : 2,
                opacity : 0.8,
                label: {
                  borderColor: '#00E396',
               
                  position: 'bottom',
                  style: {
                    color: '#fff',
                    background: '#000'
                  },
                  text: ''+(this.props.series[0].data[0].y[1] + this.props.series[0].data[0].y[0])/2
                }
              },
              {
                x : (this.props.series[1].data[0].y[1] + this.props.series[1].data[0].y[0])/2,
              borderColor: '#000',
              borderWidth : 2,
              opacity :0.8,
              label: {
                borderColor: '#00E396',
                position: 'bottom',
                style: {
                  color: '#fff',
                  background: '#000'
                },
                text: ''+(this.props.series[1].data[0].y[1] + this.props.series[1].data[0].y[0])/2
              }
            },
            {
              x : 0,
              x2 : 15,
            borderColor: ' #fc2103 ',
            fillColor: ' #fc2103 ',
            opacity: 0.1,

            label: {
              borderColor: ' #fc2103 ',
              style: {
                color: '#000',
                background: '#fc2103 '
              },
              text: "Struggling"
            }
          },
          {
            x : 15,
            x2 : 40,
          borderColor: '  #edfc03  ',
          fillColor: '  #edfc03  ',
          opacity: 0.1,
          label: {
            borderColor: ' #edfc03 ',
            style: {
              color: '#000',
              background: ' #edfc03  '
            },
            text: "Remedial"
          }
        },
        {
          x : 40,
          x2 : 70,
        borderColor: ' #03fc5a  ',
        fillColor: ' #03fc5a ',
        opacity : 0.1,
        label: {
          borderColor: ' #03fc5a ',
          style: {
            color: '#000',
            background: ' #03fc5a  '
          },
          text: "Intermediate"
        }
      },
      {
        x : 70,
        x2 : 100,
      borderColor: ' #035efc ',
      fillColor: ' #035efc  ',
      opacity : 0.1,
      label: {
        borderColor: '  #035efc  ',
        style: {
          color: '#000',
          background: ' #035efc  '
        },
        text: "Advanced"
      }
    },
            
            ]
          },
        
        
           xaxis: {
            type: 'datetime',
            
       
          
        },
          legend: {
            position: 'top'
          },
          tooltip: {
            x: {
                  formatter: function (value) {
                     // console.log(value);
                    return value // The formatter function overrides format property
                  }, 
                
              }
               
          },
       
        subtitle: {
          text: undefined,
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '12px',
            fontWeight:  'normal',
            fontFamily:  undefined,
            color:  '#9699a2'
          },
      },
        }
        
     
      
      
      };
    }

  

    render() {
      console.log(this.props.series[0].data[0].y[1]);
      return (
        


  <div id="chart">
<ReactApexChart options={this.state.options} series={this.props.series} type="rangeBar"/>
</div>



      );
    }
  }