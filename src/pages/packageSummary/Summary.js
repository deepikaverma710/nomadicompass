import React, {useContext, useEffect, useState} from 'react';
import Navigation from '../../components/navigation/Navigation';
import "./Summary.css";
import { useParams, useHistory } from 'react-router-dom';
import {getPackages, insertCartItem} from "../../network";
import { firebaseAuth } from '../../context/ContextIndex';

const Summary = () => {
    let history = useHistory();
    const { token} = useContext(firebaseAuth)
    const {  dateid, selectedActivity, selectedDestination } = useParams()
    const [ tourPackage, setTourPackage ] = useState([])

    const addToCart = async(e)=>{
        e.preventDefault()
        await insertCartItem(token, dateid, selectedActivity, selectedDestination)
        setTimeout(() => { history.push("/cart"); ; }, 1000);
    }

    // const tourPackage = {
    //     "_id": "60760e8143090445b5f0811f",
    //     "packageName": "Temple Tiger",
    //     "packageDescription": "A flurry of construction is underway on land just outside Thailand’s infamous Tiger Temple, a monastery formally known as Wat Pa Luangta Bua Yannasampanno that doubled as a popular tiger tourism venue until last year",
    //     "packageHighlights": "Highlights",
    //     "startLocation": "Thailand",
    //     "finishLocation": "Mayanmar",
    //     "groupSize": 5,
    //     "activityLevel": "Easy",
    //     "duration": "5",
    //     "budget": 10000,
    //     "meals": "Breakfast, Lunch",
    //     "transport": "Bus",
    //     "accommodation": "Hotel, Camps", 
    //     "dates":
    //         {
    //             "numberOfPersonJoined": 4,
    //             "_id": "60760e8143090445b5f08120",
    //             "departureDate": "2021-04-13T21:34:57.104Z",
    //             "tripStatus": "Active"
    //         }
    //     }


        useEffect(() => {
            if (token != null) {
              (async () => {
                const res =  await getPackages(token, dateid)
                setTourPackage(res[0])
              })()
           
          }else{}}, []);

  return (
    <div className="summary-image">
        <Navigation></Navigation>
        <h1 className= "summary-heading text-center">Package Summary</h1>
    <div className="trip-overview row">
            <div class="col-md-6">
            <div className="trip-info-left-text">
                <div className="section-title text-center">
                    <div className="title-border">
                        <h1>{tourPackage.packageName}</h1>
                    </div>   
                    <p>{tourPackage.packageDescription}</p>   
                </div>  
                <ul className="details-info">
                    <li className=""><span>Start- </span>{tourPackage.startLocation}</li>
                    <li className=""><span>Finish- </span>{tourPackage.finishLocation}</li>
                    <li className=""><span>Min group size- </span>{tourPackage.groupSize}</li>
                    <li className=""><span>Level- </span>{tourPackage.activityLevel}</li>
                </ul>
            </div>
        </div>
        <div className="highlights col-md-6">
                <div className="trip-booking-info text-center">
                    <h3>Duration</h3>
                    <p> {tourPackage.duration} Days</p>
                </div>
                <div className="trip-booking-info text-center">
                    <h3>Budget</h3>
                    <p> {tourPackage.budget} per person</p>
                </div>
        </div>        
    </div>
        <div className="highlights text-center">
            <button  onClick = {addToCart}>Add to Cart  </button>
        </div>     
    </div>
  );

};

export default Summary;