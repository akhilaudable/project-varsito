
import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'


class Main extends React.Component {       // Components(here TodoApp) are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

    constructor(props) {
        super(props);
        this.state = { //These are state variables
              root : $.parseJSON(this.props.root),
              children : $.parseJSON(this.props.children)
        };
        this.fetchDataFromServer = this.fetchDataFromServer.bind(this);
      //  this.jstreeFormat = this.jstreeFormat.bind(this);
      this.fetchRoot = this.fetchRoot.bind(this)
      }

        fetchRoot(){
          $(function() {
            $('#jstree').jstree();

            $('#jstree').on("changed.jstree", function (e, data) {
              console.log(data.selected);
            });
          });
        }

      fetchDataFromServer(e){
      //  console.log(e,"eeee")
        $.ajax({
          url: "/emp/:id",
          type: "GET",
          dataType: "json",
          success: function(data){ //Once response is successful
            console.log(data,"here it is")
            this.fetchRoot();
            },
          error: function(httpRequest, status, error){
              console.log(error);
          }
      });
      }

        componentDidMount(){
          var that = this;
          $(function() {
            $('#jstree').jstree();

            $('#jstree').on("changed.jstree", function (e, data) {

                console.log(data.node.id,"data.node.id")
              $.ajax({
                url: "/emp/id/value?name="+data.node.id,
                type: "GET",
                success: function(data){ //Once response is successful
                console.log(data,"data");
                console.log(that.state.children,"this.state.children;")
                that.setState({
                  root: that.state.children,
                  children : data.result
                })

                  },
                error: function(httpRequest, status, error){

                 console.log(error);
                }
            });


            });
          });
        }


    render() {
      // 
      // var roots =  this.state.root;
      // var children = this.state.children;
      return (
          <div>
          <div id="jstree">
          <ul>
              {this.state.root.map((root, i) => {
                    return (<li key={i} id={root["id"]}>{root["name"]}
                      <ul>    {this.state.children.map((child, j) => {
                            return (<li key={j} id={child["id"]}>{child["name"]}</li>)
                          })} </ul>
                    </li>)
              })}
          </ul>
          </div>
      </div>
   );
 }

}

//console.log(document.body.getAttribute("data-user"),"sksdks")


var root = document.body.getAttribute("root");
var children = document.body.getAttribute("children");
ReactDom.render(<Main root={root} children={children}/>, document.getElementById("container"));
