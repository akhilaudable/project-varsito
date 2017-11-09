
import React from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import axios from 'axios'


class Main extends React.Component {       // Components(here TodoApp) are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

    constructor(props) {
        super(props);
        this.state = { //These are state variables
              data : this.props.data
        };
      //  this.fetchDataFromServer = this.fetchDataFromServer.bind(this);
      //  this.jstreeFormat = this.jstreeFormat.bind(this);
      }


      fetchDataFromServer(){
        // axios({
        //     method:'get',
        //     url:'/',
        //     responseType:'stream'
        //   })
        //     .then(function(response) {
        //     console.log(response)
        //   });

      //   $.ajax({
      //     url: "/emp/:id",
      //     type: "GET",
      //     dataType: "json",
      //     success: function(data){ //Once response is successful
      //       console.log(data,"here it is")
      //       },
      //     error: function(httpRequest, status, error){
      //         console.log(error);
      //     }
      // });
      }

        componentDidMount(){

          $(function() {
            $('#jstree').jstree();

            $('#jstree').on("changed.jstree", function (e, data) {
              console.log(data.selected);
            });

          });


        }


    render() {

      var roots =  $.parseJSON(this.state.data);
      return (
          <div>
          <div id="jstree">
          <ul>
              {roots.map((root, i) => {
                    return (<li key={i}>{root["name"]}</li>)
                })}
          </ul>
          </div>
      </div>
        );
 }

}

console.log(document.body.getAttribute("data-user"),"sksdks")
var data = document.body.getAttribute("data-user");
ReactDom.render(<Main data={data}/>, document.getElementById("container"));
