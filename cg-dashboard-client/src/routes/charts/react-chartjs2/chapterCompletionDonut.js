 
 
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import {withRouter} from 'react-router-dom';




 class Donut extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [14,56,78,98,32],

            value : [],
            name : [],
            options: {
            labels: ["Completed", "Not Yet Started", "In Progress","Revision"],

              chart: {
                type: 'donut',
                events: {
                    dataPointSelection: (event, chartContext, config) => {
                

                            console.log(this.props.usageStats);
                            console.log(this.props.chapter);
                            //	var point = getElementsAtEvent(evt);12
                            //completed - 0, not_yet_started - 1 , in_progress - 2, rhistoryevision - 3
                            if (config.dataPointIndex !=null) {
                                fetch('https://impact-api.convegenius.com/api/chapterProgressStudentList' , {
                                mode :"cors",
                                method: "POST",
                                headers: {
                                    'Content-type': 'application/json'
                                },
                                body: JSON.stringify({school : this.props.school,index : config.dataPointIndex, student_id: this.props.usageStats[4], chapter: this.props.chapter})
                            })
                        .then((result) => result.json())
                        .then((list) => { 
                          console.log(list);
                        //  if(info.success == "login sucessfull"){
                          this.props.history.push({
                             pathname: '/app/ui-components/chapterProgressStudentList',
                             state: {
                                 list : list,
                                school : this.props.school,
                                chapter : this.props.chapter,
                                user: this.props.user,
                                usageStats : this.props.usageStats
                             }
                          }); 
                        
                        //}
                        })
                             }
                           
                            
                      console.log(config);
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
            console.log(this.props.usageStats);
            for(var i=0;i<this.props.progress.length;i++){
                  this.state.value.push(Number(this.props.progress[i]));
            }
            console.log(this.props.data);
            
            console.log(this.state.value);
          return (
            


<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.value} type="donut" height={400} />
{this.state.value = []}
</div>


          );
        }
      }

export default withRouter(Donut);