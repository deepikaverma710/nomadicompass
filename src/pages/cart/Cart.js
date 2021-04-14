import React, {useState} from 'react';
import Navigation from '../../components/navigation/Navigation';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const Cart = () => {
    const tourPackages= [{
        "_id": "60760e8143090445b5f0811f",
        "packageName": "new package",
        "packageDescription": "Description",
        "packageHighlights": "Highlights",
        "startLocation": "start here",
        "finishLocation": "finish here",
        "groupSize": 5,
        "activityLevel": "Easy",
        "duration": "5",
        "budget": 10000,
        "meals": "Breakfast, Lunch",
        "transport": "Bus",
        "accommodation": "Hotel, Camps",
        "dates": [
            {
              "numberOfPersonJoined": 1,
                "_id": "60760e8143090445b5f08120",
                "departureDate": "2021-04-13T21:34:57.104Z",
                "tripStatus": "Active"
            },
            {
                "numberOfPersonJoined": 2,
                  "_id": "60760e8143090445b5f08121",
                  "departureDate": "2021-05-13T21:34:57.104Z",
                  "tripStatus": "Active"
              },
              {
                "numberOfPersonJoined": 3,
                  "_id": "60760e8143090445b5f08122",
                  "departureDate": "2021-06-13T21:34:57.104Z",
                  "tripStatus": "Active"
              }]
    },
    {
        "_id": "60760e8143090445b5f0811g",
        "packageName": "new package 2",
        "packageDescription": "Description 2",
        "packageHighlights": "Highlights",
        "startLocation": "start here",
        "finishLocation": "finish here",
        "groupSize": 6,
        "activityLevel": "Easy",
        "duration": "5",
        "budget": 10000,
        "meals": "Breakfast, Lunch",
        "transport": "Bus",
        "accommodation": "Hotel, Camps",
        "dates": [
            {
              "numberOfPersonJoined": 1,
                "_id": "60760e8143090445b5f08120",
                "departureDate": "2021-04-13T21:34:57.104Z",
                "tripStatus": "Active"
            },
            {
                "numberOfPersonJoined": 2,
                  "_id": "60760e8143090445b5f08121",
                  "departureDate": "2021-05-13T21:34:57.104Z",
                  "tripStatus": "Active"
              },
              {
                "numberOfPersonJoined": 3,
                  "_id": "60760e8143090445b5f08122",
                  "departureDate": "2021-06-13T21:34:57.104Z",
                  "tripStatus": "Active"
              }]
    }]
    const [qty, setQty] = useState(1)
    const [minusButton, setMinusButton] = useState(false)
    const [plusButton, setPlusButton] = useState(false)
    const qtyAddtion =() => {
        setMinusButton(false)
        const newQty= qty+1;
        setQty(newQty);
    }

    const qtySubtraction=()=>{
        if (qty<2){
            setMinusButton(true)
        }
        else{
        const newQty=qty-1;
        setQty(newQty);
        }
    }



  return (
      <div className="hero-image">  
        <Navigation/>
        <table className="table bg-white">
  <thead>
    <tr>
      <th scope="col">Package</th>
      <th scope="col">Destination</th>
      <th scope="col">Activity</th>
      <th scope="col">Qty</th>
      <th scope="col">Price/Person</th>
      <th scope="col">Total Price</th>
    </tr>
  </thead>
  <tbody>
  {tourPackages.map (a=>
    <tr>
      <th scope="row">{a.packageName}</th>
      <td>Manali</td>
      <td>Camping</td>
      <td>
          <button 
          disabled={minusButton} 
          className= "pb-1 border-0 bg-white" 
          onClick={qtySubtraction}>
              <FaMinusCircle />
              </button >
              {qty}
              <button 
              disabled={plusButton}
              className="border-0 bg-white" 
              onClick={qtyAddtion}>
                  <FaPlusCircle />
                  </button>
                  </td>
      <td>{a.budget}</td>
      <td>{qty*a.budget}</td>
      <td className="text-right"><button>See details</button><button>Remove</button></td>
    </tr>
    )}
  </tbody>
</table>
       
      </div>
  );

};

export default Cart;

