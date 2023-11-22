import { useEffect, useState } from "react";
import "./index.css"
import WeatherTopicInfo from "../weatherTopicInfo";

interface props {
    data: any
}

function formatDateTime (data:any) {
    var dateAndHour = data.split(" ")
    var date = dateAndHour[0].split("-")
    var formatedDate = date[2]+" / "+date[1]+" / "+date[0]
    var result = {
        date: formatedDate,
        time: dateAndHour[1]
    }
    return result
}

function getDetailedInfoOfTheDay (data:any) {
    var temperatureList:Array<any> = []
    var feelsLikeList:Array<any> = []
    var rainList:Array<any> = []
    var windList:Array<any> = []
    data.map((item:any, key:any) => {
        if(key % 2 == 0){
            var dateTime = item.time.split(" ")
            var hour = dateTime[1]
            temperatureList.push(
                {   
                    temp_c : {
                        data : item.temp_c,
                        hour : hour
                    },
                    temp_f : {
                        data : item.temp_f,
                        hour : hour
                    }
                }
            )
            feelsLikeList.push(
                {
                    feelslike_c : {
                        data : item.feelslike_c,
                        hour : hour
                    },
                    feelslike_f : {
                        data : item.feelslike_f,
                        hour : hour
                    }
                }
            )
            rainList.push(
                {
                    data: item.chance_of_rain,
                    hour: hour
                }
            )
            windList.push(
                {
                    data: item.gust_kph,
                    hour: hour
                }
            )
        }
    })
    
    var result = {
        temperatureList: temperatureList,
        feelsLikeList: feelsLikeList,
        rainList: rainList,
        windList: windList
    }

    console.log(result)

    return result
}

export default function Main (props:props) {
    const[temperature, setTemperature] = useState(props.data.current.temp_c+"°C")
    const[currentDate, setCurrentDate] = useState<any>(formatDateTime(props.data.current.last_updated))
    const[weatherTopic, setWeatherTopic] = useState("temperature")
    const[weatherTopicType, setWeatherTopicType] = useState("temp_c")
    const[weatherInfo, setWeatherInfo] = useState(getDetailedInfoOfTheDay(props.data.forecast.forecastday[0].hour))

    const handleTemperatureScale = (scale:string) => {
        if(scale == "c"){
            if(temperature != props.data.current.temp_c+"°C"){
                setTemperature(props.data.current.temp_c+"°C")
            }
        }

        if(scale == "f"){
            if(temperature != props.data.current.temp_f+"°F"){
                setTemperature(props.data.current.temp_f+"°F")
            }
        }
    }

    useEffect(function(){
        if(weatherTopic == "temperature"){
            if(temperature == props.data.current.temp_c+"°C"){
                setWeatherTopicType("temp_c")
            }else{
                setWeatherTopicType("temp_f") 
            }
        }else if(weatherTopic == "feelslike"){
            if(temperature == props.data.current.temp_c+"°C"){
                setWeatherTopicType("feels_c")
            }else{
                setWeatherTopicType("feels_f") 
            }
        }else if(weatherTopic == "rain"){
            setWeatherTopicType("rain")
        }else if(weatherTopic == "wind"){
            setWeatherTopicType("wind")
        }
    },[weatherTopic, handleTemperatureScale])

    return (
      <div className="weatherCard">
        <main className="mainInfoCard">
            <div className="temperatureCard">
                <h3 className="temperature">{temperature}</h3>
                <div className="changeScaleButtons">
                    <button className="btn btn-dark" id="changeTemperatureScaleCelsius" onClick={event => handleTemperatureScale("c")}>C°</button><br/>
                    <button className="btn btn-dark" id="changeTemperatureScaleFahrenheit" onClick={event => handleTemperatureScale("f")}>F°</button>
                </div>
                <div className="temperatureDetails">
                    <span className="humidity"><strong>Umidade: </strong><span className="temperatureDetailInfo">{props.data.current.humidity} %</span></span><br/>
                    <span className="rain"><strong>Chance de chuva: </strong><span className="temperatureDetailInfo">{props.data.forecast.forecastday[0].day.daily_chance_of_rain}%</span></span><br/>
                    <span className="gust"><strong>Velocidade do vento: </strong><span className="temperatureDetailInfo">{props.data.current.gust_kph} Km/h</span></span>
                </div>
            </div>
            <div className="weatherInfo">
                <h3 className="weatherTitle">Clima</h3>
                <p className="dateTime">{currentDate.date + " às " + currentDate.time}</p>
                <p className="description">{props.data.current.condition.text} <img src={props.data.current.condition.icon}/></p>
            </div>
        </main>
        <div className="weatherTopicChange">
            <button className="topicChangeButton" id="temperatureTopicChange" onClick={event => setWeatherTopic("temperature")}>Temperatura</button>
            <button className="topicChangeButton" id="feelslikeTopicChange" onClick={event => setWeatherTopic("feelslike")}>Sensação Térmica</button>
            <button className="topicChangeButton" id="rainTopicChange" onClick={event => setWeatherTopic("rain")}>Chuva</button>
            <button className="topicChangeButton" id="windTopicChange" onClick={event => setWeatherTopic("wind")}>Vento</button>
        </div>
        {weatherTopic=="temperature"&&(weatherTopicType=="temp_c"||weatherTopicType=="temp_f")?<WeatherTopicInfo data={weatherInfo.temperatureList} type={weatherTopicType} />:null}
        {weatherTopic=="feelslike"&&(weatherTopicType=="feels_c"||weatherTopicType=="feels_f")?<WeatherTopicInfo data={weatherInfo.feelsLikeList} type={weatherTopicType} />:null}
        {weatherTopic=="rain"&&weatherTopicType=="rain"?<WeatherTopicInfo data={weatherInfo.rainList} type={weatherTopicType} />:null}
        {weatherTopic=="wind"&&weatherTopicType=="wind"?<WeatherTopicInfo data={weatherInfo.windList} type={weatherTopicType} />:null}
      </div>
    );
  };