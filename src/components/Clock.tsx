import React, { useState, useEffect } from 'react'
import '../css/clock.css'

interface ClockProps{
    time?: Date
}

const Clock: React.FC<ClockProps> = (props) => {
    interface HandsObject {
        [key: string]: number; 
    }
    
    const now = new Date(props.time || new Date())
    
    const formatTime = (time:Date)  => {
        const secondOfDay = (time.getHours() * 3600) + (time.getMinutes() * 60) + (time.getSeconds())
        // We can derive hours and minutes by ( ^ / 3600 / 12) and ( ^ / 60 / 60) respectively
        // It's cleaner to just get the seconds from the date object
        const seconds = time.getSeconds()

        // Format the time to degrees on a circle
        const hands: HandsObject ={
            hours:      Math.round(secondOfDay / 3600 / 12 * 360 - 180),
            //minutes:    Math.round(secondOfDay / 60 / 60 * 360 - 180),
            minutes:    (secondOfDay / 60 / 60 * 360 - 180),
            seconds:    Math.round(seconds / 60 * 360 - 180),
            days:       Math.round(secondOfDay / 86400 * 360 - 180)
        }
        return hands
    }

    const firstHands = formatTime(now)
    const [currentHands, setCurrentHands] = useState<HandsObject>(firstHands)

    useEffect(() => {
        const intervalId = setInterval(() => {
            const hands:HandsObject = formatTime(now)
            setCurrentHands(hands);
          }, 1000)
        return() => clearInterval(intervalId);
    })

    //if the value of currentHands is nan, then return null
    if (isNaN(currentHands.seconds)) {
        return(
            <div className="Wait" > <p> Set up the Clock</p> </div>
        )
    } else {
        return(
        <div id='Clock' className="clock">
            <div className="dot12" />
            <div className="dot3" />
            <div className="dot6" />
            <div className="dot9" />
            <div className="second-hand" style={{ transform: `rotate(${currentHands.seconds}deg)` }}></div>
            <div className="minute-hand" style={{ transform: `rotate(${currentHands.minutes}deg)` }}></div>
            <div className="hour-hand" style={{ transform: `rotate(${currentHands.hours}deg)` }}></div>
            <div className="day-hand" style={{ transform: `rotate(${currentHands.days}deg)` }}></div>
            <div className="center-circle" />
        </div>
    )
    }
}
export default Clock