import React, { Component } from 'react';

import { Table, Button, Alert } from 'react-bootstrap';
import { Input } from "semantic-ui-react";
import DatePicker from "react-datepicker";   
import moment from "moment"
import { Link } from 'react-router-dom';


    class Report_shift extends Component {
      constructor(props){
        super(props);
        this.state={
          selectedFile: null,
          searchInput: "",
          searchInput1: "",
          selectedFile1:null,
          selectedFile2:null,
          Status:"",
          startDate:null,
          path:""
        }
      }


      

    submitHandler = async(e) => {  
      e.preventDefault(); 

      function importAll(r) {
           
        return r.keys().map(r);
       }

       let startDate = moment(this.state.startDate).format('DD-MM-YYYY');
       console.log(startDate)
       console.log(this.state.Status+"_"+startDate)

       //D:\Unical\shift\shift_14-09-2021
       var testPath =this.state.Status+"_"+startDate
       this.setState({
         searchInput:testPath
       },()=>{
         console.log(this.state.searchInput)
         this.globalSearch();
       })

          //Based on Location importAll Files ---   Location /src/Pictures
          var Pdf = importAll(require.context('C:/webreport/shift', false, ));
          var Array = [];
          Pdf.map((a)=>Array.push(a.default))
          var temp=[]
          Array.map((a)=>temp.push(a.split("/")[3]))
          console.log(temp)
          var temp1=[]
          temp.map((b)=>temp1.push(b.split('.')[0]))
          console.log(temp1)
          //Setting ListFiles to state
          this.setState({
            selectedFile:temp },() => {
              console.log(this.state.selectedFile)
            })    
            this.setState({
              selectedFile1:temp },() => {
                console.log(this.state.selectedFile)
                
              }) 
          
          
          
   } 


   

///..........status handking..........
changeHandler = e => {

  const name = e.target.name;
  const value = e.target.value;
  console.log(name)
  console.log(value)
  this.setState({
    Status: value   
},()=>{
  console.log(this.state.Status)
});
}
handleChange1 = date => {
  this.setState({
      startDate: date
  });
}

        //...........................
        handleChange = e =>{ 
          console.log(e.target.value)
          this.setState({ searchInput: e.target.value }, () => {
            console.log("................")
            this.globalSearch();
          });
        };

        handleChange2 = e =>{ 
          console.log(e.target.value)
          this.setState({ searchInput1: e.target.value }, () => {
            console.log("................")
            this.globalSearch();
          });
        };
//...............................
globalSearch = () => {
  let { searchInput } = this.state;
  console.log( this.state.selectedFile1)
  
  let filteredData = this.state.selectedFile1.filter(value => {
    return (
      value.toString().toLowerCase().includes(searchInput.toLowerCase()) 
    );
  });
  
  this.setState({ selectedFile: filteredData });
let {searchInput1} = this.state; 
let filteredData1 = filteredData.filter(value=>{
  return (
    value.toString().toLowerCase().includes(searchInput1.toLowerCase()) 
  );
});
this.setState({ selectedFile: filteredData1 });
};
    
    
      render() {
        
        //console.log(this.state.selectedFile[0]==null?ECE:this.state.selectedFile[0])
    
        return (
          <div className="page">
              <div className="card-body">
                    <ul class="nav nav-tabs page-header-tab">
                      <li class="nav-item">
                        <Link to="/Report_daily" class="nav-link inactive show">
                          Dialy Wise Reports
                        </Link>
                      </li>

                      <li class="nav-item">
                        <Link to="/Report_shift" class="nav-link active show">
                          Shift Wise Reports
                        </Link>
                      </li>
                    </ul>
                  </div>
            
              <div>
              <div className="row clearfix">
                <div className="col-xl-12 col-lg-12">
                  <div className="row"></div>
                  <form onSubmit={this.submitHandler}>
                    <div class="row">
                    <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                 <label class="form-label" style={{ color: "black" }}>Shift</label>
                                    <select name="RoleID"
                                        className="form-control" style={{ width: "40%" }} value={this.state.Status} onChange={this.changeHandler}>
                                        <option value=""></option>
                                        <option value="shift1">shift1</option>
                                        <option value="shift2">shift2</option>
                                        <option value="shift3">shift3</option>

                                    </select>     
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                <label class="form-label" style={{ color: "black" }}>Please Choose The Date:</label>
                               
                        <DatePicker
                          wrapperClassName="datepicker"
                          className="form-control"
                          autoComplete="off"
                          selected={this.state.startDate}
                          onChange={this.handleChange1}
                          name="startDate"
                          maxDate={new Date()}
                          dateFormat="MM/dd/yyyy"
                        />
                                </div>
                            </div>
                      
                      
                      <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ background: "blue" ,height:"40px"}}
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <br />
        
        <Input
          size="large"
          
          name="searchInput1"
          value={this.state.searchInput1 || ""}
          onChange={this.handleChange2}
          label="Search"
        />
        <Input
          size="large"
          type="hidden"
         
          value={this.state.searchInput || ""}
          onChange={this.handleChange}
        
        />
      

        <br />
        <br />
           
            <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
          <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
          <Table> 
          <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
              <tr >
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Report Name</th>
               
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Action</th>
                 {/* <th style={{textTransform:"none", color:"#E5E5E5"}}>Delete</th>*/}
                                                            
              </tr>
            </thead>
            <tbody>
              {
                this.state.selectedFile==null?"":this.state.selectedFile.map((data=>
                  <tr style={{textAlign:"-webkit-center"}}>
                  <td style={{color:"black"}}>{data}</td>
                  <td><button className="btn btn-primary"style={{background:"blue"}} ><a href={"/static/media/"+data} target="_blank">Download</a></button></td>
                  

                  </tr>
            ))}
           
           
                  
            </tbody>
            </Table>
          </table>
          </table>
          </div>
        );
      }
    }
    
    export default Report_shift;