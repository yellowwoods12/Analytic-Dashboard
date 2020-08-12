 
 
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import {withRouter} from 'react-router-dom';




 class PostDonut extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [14,56,78,98,32],

            value : [],
            name : [],
            options: {
            labels: ["Struggling","Remedial","Intermediate","Advanced"],

              chart: {
                type: 'donut',
              
              },
              responsive: [{
                breakpoint: 20,
                options: {
                  chart: {
                    width: 10
                  },
                  legend: {
                      show: true,
                    position: 'top',
                    height : 40,
                    width: 10,
                    markers: {
                        
                        height: 12,
                    },
                  }
                }
              }]
            },
          
          
          };
        }
     progress(val){
         console.log(val);
     }
      

        render() {
            console.log(this.props.data);
            for(var i=0;i<this.props.progress.length;i++){
                  this.state.value.push(Number(this.props.progress[i]));
            }
            console.log(this.props.data);
            
            console.log(this.state.value);
          return (
            


<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.value} type="donut"  />
{this.state.value = []}
</div>


          );
        }
      }

export default withRouter(PostDonut);