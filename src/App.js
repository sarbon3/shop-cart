import { useState } from 'react';
import { data } from './data';
import { dataTwo } from './dataTwo';
import back from './back.png'
import next from './next.png'
import './App.css';

function App() {
  const [cart, setCart] = useState(data);
  
  const removeItem = (id) => {
    let newBook = cart.filter((item => 
      item.id !== id )) 
      setCart(newBook)

  }
  const DeleteAll = () => {
    setCart([]);
  }
  
  const cartTotalPrice = cart.reduce((totalPrice, item) => totalPrice + item.price, 0);
  
  const [readMoreText,setReadMoreText] =  useState(false);
  const readMoreClick = (item) => {
    item.readMore = !item.readMore
    setReadMoreText(!readMoreText)
  }

  const [viewed, setViewed] = useState(0);
  const {id, name, image, price} = dataTwo[viewed]
  
  const nextItem = () => {
    setViewed ((viewed =>{
      viewed ++;
      if (viewed > dataTwo.length-1){
        viewed = 0
      }
    return viewed
    })) 
  }
  const previousItem = () => {
    setViewed (( viewed => {
      viewed --;
      if(viewed < 0){
        return dataTwo.length - 1;
      }
      return viewed
    }))
  }

  return ( 
    <div key={id}>
      <div className="top">
        <h1>Story Street</h1>    
    </div>
    <div className="header">
        <h2>SHOPPING CART</h2>
        <div className='subtotal'>
          <p>Subtotal: {cart.length} items</p>
          <p>Subtotal price: $ {cartTotalPrice}</p>
        </div>
        <div className=''>
          <button className='btn' onClick={DeleteAll}> Remove from cart </button>
        </div>
        <hr></hr>  
    </div>
    {cart.map ((item => {
      const {id, name, image, price, description, readMore} = item;
      return (
        <div className='mainContainer'>
          <div className='containers'>
            <img src = {image} alt = "book" width = "90px"/>
          </div>
          <div className='containers name'>
            <h4> {name} </h4>
            <p>{readMore?description: ""}<button className='btn' onClick={() => readMoreClick(item)}>{readMore? "Read less...": "Read more ..."}</button></p>
          </div>
        <div className='containers price'>
          <p> $ {price} </p>
        </div>
        <div className='containers'>
          <button className='btn' onClick={()=> removeItem(id)}>Delete</button>
        </div>  
        </div>
       
      )
    }))}
    
    <hr></hr>
    <div className='containerSecond '>
      <h3>You recently viewed items:</h3>
    </div>
    <div className='viewedItems'>
      <div className='arrow'>
        <button className='btn back'onClick={previousItem}><img src={back} width="30px" alt='arrow'/></button>
      </div>
      <div className='eachItem'>
        <img src={image} alt="book" width="150px"/>
        <p>{name}</p>
        <p>{price}</p>
      </div>
      <div className='arrow'>
        <button className='btn next' onClick={nextItem}><img src={next}width="30px" alt='arrow'/></button>
      </div>
    </div>
   
    </div>
  )
}

export default App;
