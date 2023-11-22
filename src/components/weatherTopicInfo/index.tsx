import { useState } from "react";
import "./index.css"

interface props {
    data: any
    type: string
}

export default function WeatherTopicInfo (props:props) {

    switch (props.type){
        case "temp_c":
            return(
                <div className="weatherTopicHour">
                    <h4>Resumo da previsão ao longo do dia:</h4>
                    <div className="weatherTopicHourRow">
                        {props.data.map((item:any, key:any) => (
                            <div className="weatherTopicHourItem" key={key}>
                                <p className="data">{item.temp_c.data}C°</p>
                                <p>{item.temp_c.hour}</p>
                            </div>
                        ))}
                    </div> 
                </div>
            )
        case "temp_f":
            return(
                <div className="weatherTopicHour">
                    <h4>Resumo da previsão ao longo do dia:</h4>
                    <div className="weatherTopicHourRow">
                        {props.data.map((item:any, key:any) => (
                            <div className="weatherTopicHourItem" key={key}>
                                <p className="data">{item.temp_f.data}F°</p>
                                <p>{item.temp_f.hour}</p>
                            </div>
                        ))}
                    </div> 
                </div>
            )
        case "feels_c":
            return(
                <div className="weatherTopicHour">
                    <h4>Resumo da sensação térmica ao longo do dia:</h4>
                    <div className="weatherTopicHourRow">
                        {props.data.map((item:any, key:any) => (
                            <div className="weatherTopicHourItem" key={key}>
                                <p className="data">{item.feelslike_c.data}C°</p>
                                <p>{item.feelslike_c.hour}</p>
                            </div>
                        ))}
                    </div> 
                </div>
            )
        case "feels_f":
            return(
                <div className="weatherTopicHour">
                    <h4>Resumo da sensação térmica ao longo do dia:</h4>
                    <div className="weatherTopicHourRow">
                        {props.data.map((item:any, key:any) => (
                            <div className="weatherTopicHourItem" key={key}>
                                <p className="data">{item.feelslike_f.data}F°</p>
                                <p>{item.feelslike_f.hour}</p>
                            </div>
                        ))}
                    </div> 
                </div>
            )
        case "rain":
            return(
                <div className="weatherTopicHour">
                    <h4>Chance de chuva ao longo do dia:</h4>
                    <div className="weatherTopicHourRow">
                        {props.data.map((item:any, key:any) => (
                            <div className="weatherTopicHourItem" key={key}>
                                <p className="data">{item.data}%</p>
                                <p>{item.hour}</p>
                            </div>
                        ))}
                    </div> 
                </div>
            )
        case "wind":
            return(
                <div className="weatherTopicHour">
                    <h4>Velocidade do vento ao longo do dia:</h4>
                    <div className="weatherTopicHourRow">
                        {props.data.map((item:any, key:any) => (
                            <div className="weatherTopicHourItem" key={key}>
                                <p className="data">{item.data}Km/h</p>
                                <p>{item.hour}</p>
                            </div>
                        ))}
                    </div> 
                </div>
            )
        default:
            return null
    }
  };