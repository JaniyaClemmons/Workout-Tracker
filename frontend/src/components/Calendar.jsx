import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CalendarComp = ({ onDateChange }) => {
    const { user } = useAuthContext();



    const mark = [
        'Fri Apr 07 2023 00:00:00 GMT+0200 (Central European Summer Time)'
    ]
    const [date, onChange] = useState(new Date());
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkout = async () => {
            //fetch data and store response = array of objects/db docs
            //address will get proxied
            const response = await fetch("/api/workouts/", {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            //pass the json into something we can work with - array of obj
            const json = await response.json();
            setWorkouts(json);


        }
        //only fetchExercises if there is a user logged in 
        if (user) {
            fetchWorkout()
        }
        //we add user to the dependency array since we use it in here now 
    }, [user, date]); //dispatch wont trigger this everytime but we have to add to depend. array 





    const handleClick = (event) => {
        console.log(event);
        onChange(event);
        onDateChange(event);
    }
    function trimedDate(dateObj) {
        dateObj = (dateObj.toString().substring(0, 15)).replaceAll(' ', '');
        return dateObj;
    }

    return (
        <div >
            <Calendar
                //onChange={onChange} 
                value={date}
                onClickDay={handleClick}
                tileClassName={({ date, view }) => {


                    if (workouts && workouts.find((x) =>
                        (x.date == trimedDate(date)))) {


                        return 'highlight'
                    }
                    else {
                        return 'black'
                    }

                }}

            />
        </div>

    );
}

export default CalendarComp;