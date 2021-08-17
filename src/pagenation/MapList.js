import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import "./styles.css";

class MapList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      users: [],
      response: {},
      offset: 0,
      data: [],
      perPage:5,
      currentPage: 0
}
this.handlePageClick = this
      .handlePageClick
      .bind(this);
}
componentDidMount(){
  this.receivedData()
}

  receivedData = async () => {
    const apiUrl = 'http://localhost/ScadaClient/api/UsersMapToProjects';

    await  fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            users: result
          });
          const data = this.state.users;
          console.log(data)
          const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          );
          const postData = slice.map((data) => (
            <React.Fragment>
             
             <tr >
                  
                  <td style={{color:"black"}}>{data.ProjectName}</td>
                  <td style={{color:"black"}}>{data.UserFullName}</td>
                  <td style={{color:"black"}}>{data.Role}</td>
                  <td style={{color:"black"}}>{data.ActiveStatus.toString()}</td>
                  
                  <td>
                    <Button variant="info" onClick={() => this.props.editProduct(data.UserMapID)}>Edit</Button>
                    {/* &nbsp;<Button variant="danger" onClick={() => this.deleteProduct(data.ProjectID)}>Delete</Button> */}
                  </td>
                </tr>
              
               </React.Fragment>
      ));

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),

        postData
      });
          console.log(this.state.users)
        },
        (error) => {
          this.setState({ error });
        }
      )
  }



 ///// pagenation
 handlePageClick = (e) => {
  const selectedPage = e.selected;
  const offset = selectedPage * this.state.perPage;

  this.setState(
    {
      currentPage: selectedPage,
      offset: offset
    },
    () => {
      this.receivedData();
    }
  );
}; 


  deleteProduct(ProjectID) {
    const { users } = this.state;

    const apiUrl = 'http://localhost/ScadaWebApi/api/projectdetail?projectid='+ProjectID;
  //   const formData = new FormData();
  //   formData.append('ProjectID', ProjectID);

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  // };
  
  fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            users: this.state.users.filter(user => user.ProjectID !== ProjectID)
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    const { error, users} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(

        <div>
          <h2>User Map to Project List</h2>
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
          <Table>
          <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
                                    <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
                                    
            <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
              <tr >
                
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Project Name</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>User Name</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Role</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Active Status</th>
              
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Action</th>
                 {/* <th style={{textTransform:"none", color:"#E5E5E5"}}>Delete</th>*/}
                                              
                                            
                                        
              </tr>
            </thead>
            <tbody>
                     
         {this.state.postData}
            </tbody>
            </table>
            </table>
          </Table>
          <div class="center">
          <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        /></div>
   
        </div>
      )
    }
  }
}

export default MapList;