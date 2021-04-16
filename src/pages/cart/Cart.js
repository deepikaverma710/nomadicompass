import React, { useState, useContext, useEffect } from 'react';
import Navigation from '../../components/navigation/Navigation';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import {firebaseAuth} from '../../context/ContextIndex';
import { getPackages, getCartByUid } from '../../network';



const Cart = () => {
  
    // const tourPackage = [
    //     {
    //         _id: "60760e8143090445b5f0811d",
    //         activityName: "New activiity ",
    //         destinations: [
    //             {
    //                 _id: "60760e8143090445b5f0811e",
    //                 destinationName: "new",
    //                 tourPackages: [
    //                     {
    //                         _id: "60760e8143090445b5f0811f",
    //                         packageName: "new package",
    //                         packageDescription: "Description",
    //                         packageHighlights: "Highlights",
    //                         startLocation: "start here",
    //                         finishLocation: "finish here",
    //                         groupSize: 5,
    //                         activityLevel: "Easy",
    //                         duration: "5",
    //                         budget: 10000,
    //                         inclusions: "ABC, DEF",
    //                         dates: [
    //                             {
    //                                 noOfPackageAdded: 2,
    //                                 _id: "60760e8143090445b5f08120",
    //                                 departureDate: "2021-04-13T21:34:57.104Z",
    //                                 tripStatus: "Active"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ],
    //     },
    //     {
    //         _id: "60760e8143090445b5f0811e",
    //         activityName: "New activiity 2",
    //         destinations: [
    //             {
    //                 _id: "60760e8143090445b5f0811e",
    //                 destinationName: "new dest 2",
    //                 tourPackages: [
    //                     {
    //                         _id: "60760e8143090445b5f0811f",
    //                         packageName: "new package 2",
    //                         packageDescription: "Description",
    //                         packageHighlights: "Highlights",
    //                         startLocation: "start here",
    //                         finishLocation: "finish here",
    //                         groupSize: 5,
    //                         activityLevel: "Easy",
    //                         duration: "5",
    //                         budget: 20000,
    //                         inclusions: "ABC, DEF",
    //                         dates: [
    //                             {
    //                                 noOfPackageAdded: 3,
    //                                 _id: "60760e8143090445b5f08120",
    //                                 departureDate: "2021-04-13T21:34:57.104Z",
    //                                 tripStatus: "Active"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ],
    //     }
    // ]

    const { token, dates} = useContext(firebaseAuth)
    let total = 0
    const [show, setShow] = useState(false);
    const [tourPackages, setTourPackages] =useState([])
    // const [tourPackage, setTourPackages] =useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [qty, setQty] = useState(1)
    const [totalPrice, setTotalPrice] = useState()
    const [minusButton, setMinusButton] = useState(false)
    const [plusButton, setPlusButton] = useState(false)
    const qtyAddtion = () => {
        setMinusButton(false)
        const newQty = qty + 1;
        setQty(newQty);
    }

    const qtySubtraction = () => {
        if (qty < 2) {
            setMinusButton(true)
        }
        else {
            const newQty = qty - 1;
            setQty(newQty);
        }
    }

    // const getpkgs= async()=>{
    //     const pkgs=  await getPackages("8K3y9NSUnVZGqWeeBX8uA8ENYxu2", "6077ff89a172bb2908d9e6a7");
    //     console.log(pkgs)
    //     setTourPackage(pkgs)
    // }

    // useEffect(() => {
    //   (async()=>{
    //     const pkgs=  await getPackages(token, "6077d4221ba51400043c02f8");
    //     console.log(pkgs)
    //     console.log(`ssss${token}`)
    //     setTourPackages(pkgs)
    // })()
    // }, []);




    useEffect(() => {
      if(token != null ){
          (async () => {
         const newCart= await getCartByUid(token)
      //    setCart(newCart)
         const dateId = [newCart.map(a=>a.cartList.map(b=> { return b.dateId}))]
         
      //    newCart.map(a=>a.cartList.map(b=>setCartQty(cartQty+b.quantity)))
         console.log(`Cart ${newCart}`)
         const abc=[1,2,3]

         const newpackages= await Promise.all(abc.map(async (a)=>{if (!!a){
           return await getPackages(token, "6077d4221ba51400043c02f8");
      } else{}}))

        //  const newpackages=dateId[0][0].map(a=>{if (!!a){
        //      return  getPackages(token, "6077d4221ba51400043c02f8");
        //  } else{}})
         
         setTimeout(() => { setTourPackages(newpackages) }, 7000);
      })()
        }
  }, []);

    return (
        <div>
            <div className="hero-image">
                <Navigation />
            </div>
            {/* {cart.map(a=>a.cartList.map(b=>b.dateId))} */}
            {/* <button onClick={getpkgs}></button> */}

{/* { tourPackage.map(a=>{if (!!a){console.log(`fromapi ${a[0].packageName}`)} else{}} )} */}
{/* {tourPackage.map(a=>{if (!!a){console.log(`fromapi ${a[0].packageName}`)} else{}} )} */}


            <div className="table-responsive-lg">
        <table className="table">
        
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
      {console.log(`helloo ${tourPackages}`)}
  {tourPackages.map (a=> 
  
    <tr key={a[0]._id}>
      <th scope="row">{a[0].packageName}</th>
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
      <td>{a[0].budget}</td>
      <td>{qty*a[0].budget}</td>
      <td className="d-none">{total = total + a[0].budget}</td>
      <td className="text-right"><button>See details</button><button>Remove</button></td>
    </tr>
    )}
  </tbody>
</table>
</div>



            
            {/* <div className=" text-center font-weight-bold">
               <button>Checkout</button>
            </div> */}
            <div className="border p-5 text-center font-weight-bold">
                <div className=" pb-5">Total: ${total}</div>
   <Button variant="secondary" onClick={handleShow}>
   Checkout
      </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ul className="list-unstyled">
            {tourPackages.map(a =>
            <li key={a[0]._id}>
                {a[0].packageName}
                </li>
                )}
                <li className= "font-weight-bold">Total Price= {total}</li>
                </ul>
                </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        </div>
    );

};

export default Cart;

