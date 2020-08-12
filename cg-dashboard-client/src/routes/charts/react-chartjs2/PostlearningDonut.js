 
 
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
                events: {
                    dataPointSelection: (event, chartContext, config) => {
                

                      if (config.dataPointIndex!=null) {
                        fetch('https://impact-api.convegenius.com/api/posttestStudents' , {
                        mode :"cors",
                        method: "POST",
                        headers: {
                          'Content-type': 'application/json'
                        },
                        body: JSON.stringify({school : this.props.school,index : config.dataPointIndex, score: this.props.defaultScore[0]})
                      })
                    .then((result) => result.json())
                    .then((info) => { 
                      console.log(info);
                    //  if(info.success == "login sucessfull"){
                      this.props.history.push({
                       pathname: '/app/ui-components/learning-students',
                       state: {
                        info : info,
                        defaultScore : this.props.defaultScore,
                        school : this.props.school,
                        user: this.props.user
                  
                  
                       }
                      }); 
                    
                    //}
                    })
                       }
                       
                      
                    }
                  }
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