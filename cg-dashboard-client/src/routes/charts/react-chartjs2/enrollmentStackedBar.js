

import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";




export default class StackedBar extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [{
              name: 'Marine Sprite',
              data: [44, 55, 41, 37, 22, 43, 21]
            }, {
              name: 'Striking Calf',
              data: [53, 32, 33, 52, 13, 43, 32]
            }, {
              name: 'Tank Picture',
              data: [12, 17, 11, 9, 15, 11, 20]
            }, {
              name: 'Bucket Slope',
              data: [9, 7, 5, 8, 6, 9, 4]
            }, {
              name: 'Reborn Kid',
              data: [25, 12, 19, 32, 25, 24, 10]
            }],
            value : [],
            options: {
              chart: {
                type: 'bar',
                height: 350,
                stacked: true,
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
              stroke: {
                width: 1,
                colors: ['#fff']
              },
             
              xaxis: {
                categories: [],
                labels: {
                  formatter: function (val) {
                    return val
                  }
                }
              },
              yaxis: {
                title: {
                  text: undefined
                },
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val 
                  }
                }
              },
              fill: {
                opacity: 1,
               
              },
              legend: {
                position: 'top',
                horizontalAlign: 'center',
                offsetX: 40
              }
            },
          
          
          };
        }

      

        render() {
            console.log(this.props.data);
            
            this.state.value.push({name : "CREATED", data : []});
            this.state.value.push({name : "NOT CREATED", data : []});

            for(var i=0;i<this.props.data.length;i++){
                  this.state.value[0].data.push(this.props.data[i].created);
                  this.state.value[1].data.push(this.props.data[i].not_created);

            }
            for(var i=0;i<this.props.data.length;i++){
                this.state.options.xaxis.categories.push(this.props.data[i].grade);
            }
          return (
            


<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.value} type="bar" height={500} />
</div>


          );
        }
      }