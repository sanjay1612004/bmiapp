import React, { useState } from 'react';
import {Popover,OverlayTrigger} from 'react-bootstrap';
import './Bmi2.css';

function Bmi2() {
    const [Height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const[isVisible,setIsvisible]=useState(false);
    const[isPop,setIspop]=useState(true);
    function clear() {
        setHeight('');
        setWeight('');
    }
    function submit(){
        if (Height ==='' || weight === ''){
           
            setIsvisible(true);
        }
        else{
            setIsvisible(false);
        }
        setIspop(true);
    }
    function popclose(){
        setIspop(false);
        
    }
    

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
    };

    let answer = 0;
    if (Height > 0) {
        answer = Math.round((weight / (Height ** 2)), 1);
    }

    let Content = '';
    if (answer < 16) {
        Content = 'severely underweight';
    } else if (answer >= 16 && answer < 18) {
        Content = 'underweight';
    } else if (answer >= 18.1 && answer < 24) {
        Content = 'Normal';
    } else if (answer >= 25 && answer < 29) {
        Content = 'overweight';
    } else if (answer >= 30 && answer < 35) {
        Content = 'moderately obese';
    } else if (answer >= 35 && answer < 40) {
        Content = 'severely obese';
    } else if (answer >= 40) {
        Content = 'very severely obese';
    }

    const popover = (
        <Popover id='popover-basic' style={{ width: '240px', height: '110px' }} className={isPop?'visible':'hidden'} onClick={popclose} >
            <Popover.Header as='h3' className='header' >
                BMI RESULT <button className='close' >X</button>

            </Popover.Header>
            <Popover.Body className='bodycon'>
                <b>BMI index is : {answer}</b> <br />
                <b>Status: {Content}</b>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <div className='bmiapp'>
                <h2>BMI Calculator</h2>
                <form onSubmit={handleSubmit}>
                    <label>Height (m)</label><br />
                    <input type='text' value={Height} onChange={(e) => { setHeight(e.target.value) }} required /><br />
                    <label class='wieghtinp'>Weight (kg)</label><br />
                    <input type='text' value={weight} onChange={(e) => { setWeight(e.target.value) }} /><br />
                </form>
                <p className= {isVisible?'visible':'hidden'} >Please enter height and weight</p>
                <OverlayTrigger trigger="click" placement='bottom' overlay={popover}>
                    <button className='buttons' id='b1' type='button' onClick={submit}>
                       Check</button>
                </OverlayTrigger>
                
                <button onClick={clear} className='buttons' id='b2'>Clear</button>
            </div>
        </>    
    );
}

    
export default Bmi2;