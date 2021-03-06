import React, { Component } from 'react';

import { Table, Button, Alert } from 'react-bootstrap';
import { Input } from "semantic-ui-react";
    
    class Download extends Component {
      constructor(props){
        super(props);
        this.state={
          selectedFile: null,
          searchInput: "",
          selectedFile1:null,
        }
      }
componentDidMount(){
  this.importingFiles()
}

  importingFiles(){

          function importAll(r) {
           return r.keys().map(r);
          }
  
          //Based on Location importAll Files ---   Location /src/Pictures
          var Pdf = importAll(require.context('D:/BADDEPURI/Family and frnds Photos/PDF/', false, ));
          var Array = [];
          Pdf.map((a)=>Array.push(a.default))
          var temp=[]
          Array.map((a)=>temp.push(a.split("/")[3]))
          console.log(temp)

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
        //...........................
        handleChange = e =>{ 
          console.log(e.target.value)
          this.setState({ searchInput: e.target.value }, () => {
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
  console.log(filteredData)
  this.setState({ selectedFile: filteredData });
};
    
    
      render() {
        
        //console.log(this.state.selectedFile[0]==null?ECE:this.state.selectedFile[0])
    
        return (
          <div className="page">
            <br />
        <Input
          size="large"
          name="searchInput"
          value={this.state.searchInput || ""}
          onChange={this.handleChange}
          label="Search"
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
    
    export default Download;