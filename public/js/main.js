
import React from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import axios from 'axios'


class Main extends React.Component {       // Components(here TodoApp) are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

    constructor(props) {
        super(props);
        this.state = { //These are state variables

        };
        //this.fetchDataFromServer = this.fetchDataFromServer.bind(this);
      }

      sendData(){

        axios({
            method:'post',
            url:'/emp/:id',
            responseType:'stream'
          })
            .then(function(response) {
            console.log(response)
          });
      }

      fetchDataFromServer(){
        axios({
            method:'get',
            url:'/',
            responseType:'stream'
          })
            .then(function(response) {
            console.log(response)
          });
      }

     componentDidMount() {                       // componentDidMount is executed after first render only on the client side.

       axios({
           method:'get',
           url:'/',
           responseType:'stream'
         })
           .then(function(response) {
           console.log(response,"response")
         });
    }


    render() {

        return (
          <div>

          </div>
        );
 }

}

 //var data = document.body.getAttribute("data-name");

ReactDom.render(<Main/>, document.getElementById("container"));
