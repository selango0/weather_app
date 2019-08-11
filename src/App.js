import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"

const API_KEY = "27012a992bc064789d9384b56e6c7fc5";

//create an instance of app - child class of react 
class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    //http api call 
    e.preventDefault(); //prevents default behavior (refresh)
    const city = e.target.elements.city.value; //city value for url
    const country = e.target.elements.country.value; //country value for url

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}, ${country}&appid=
                                  ${API_KEY}&units=metric`);
    const data = await api_call.json(); //convert api call into json format

    if (city && country) { 
      
      console.log(data);
      this.setState({
        temperature: data.main.temp, 
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weater[0].description,
        error: ""
    });
    } else {
      this.setState({
        temperature: undefined, 
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value."
    });
    }

  }
  render() { //reads in jsx
    return (
    <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                <Titles></Titles>
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}></Form>
                  <Weather temperatture={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}>        
                  </Weather>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    );
  }
};

      
export default App;