import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Joi from 'joi'
import regimg from './img/top-view-non-binary-kids-playing-with-colorful-game_23-2148779611.webp'





export default function Register() {

  let navigate = useNavigate();

  const [errorList, seterrorList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [user, setuser] = useState({
    first_name:'',
    last_name:'',
    email:'',
    age:0,
    password:''
  })

  function getUserData(eventInfo) {
    let myUser = {...user};
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setuser(myUser);
    //console.log(myUser)
  }

async function sendRegisterDataToAPi() {

 let {data} = await axios.post(`https://route-movies-api.vercel.app/signup` , user);
 if(data.message === 'success') {

  setisLoading(false)
  navigate('/login')

  //login
 }
 else {
  setisLoading(false)

 }
}

  function submitRegisterForm(e) {

    e.preventDefault();
    setisLoading(true)
   let validate = validateRegisterForm();
   //console.log(validate);
   if(validate.error) {

    setisLoading(false);
    seterrorList(validate.error.details);
   }
   else {

    sendRegisterDataToAPi();
  }
}

  function validateRegisterForm() {
 let schema = Joi.object({
    first_name:Joi.string().pattern(/^[A-Z]/).min(3).max(10).required(),
    last_name:Joi.string().min(3).max(10).required(),
    age:Joi.number().min(7).max(80).required(),
    email:Joi.string().email({minDomainSegments:2 , tlds:{allow:['com' , 'net']}}).required(),
    password:Joi.string().pattern(/^[A-Z][a-z]{3,8}/)

    });
    return schema.validate(user , {abortEarly:false});
  }



  return <>
  
  <div className='main-cont my-5 '>
    <div className='container p-lg-5 '>
      <div className='register card o-hidden border-0 shadow-lg'>
         <div className='card-body p-0'>
           <div className='row'>

             <div className='col-lg-6 d-none d-lg-block bg-register-image'>
              <img className='w-100 h-100' src={regimg} alt='img-Register-Gamed'/>
             </div>

             <div className='col-lg-6 graay'>
             <div className='py-5 px-2'>

             <div className='text-center'>
              <h1 className='h4 text-gray-900 mb-4' >
            ?????????? ???????? ???? ????????.????</h1>
             </div>




<form onSubmit={submitRegisterForm}   className='user text-white'>
<div className='form-group row'>

<div  className='col-sm-6 mb-3 mb-sm-0'>
  <input onChange={getUserData}  type="text" name="first_name" id="first_name" placeholder='?????????? ??????????'
        className=' form-control form-control-user' />

{errorList.filter(
                  (err) => err.context.label === "first_name"
                )[0] ? (
                  <div className="text-danger ">
                    {
                     '???? ????????'
                    }
                  </div>
                ) : null}
</div> 

<div className='col-sm-6'>

<input onChange={getUserData}  type="text" name="last_name" id="last_name" placeholder='?????? ??????????????'
        className=' form-control form-control-user' />
        {errorList.filter(
                  (err) => err.context.label === "last_name"
                )[0] ? (
                  <div className="text-danger ">
                    {
                        '???? ????????'
                    }
                  </div>
                ) : null}
</div>
  </div> 
  
  <div  className='form-group'>
  <input  onChange={getUserData} type="email" name="email" id="email" placeholder='???????????? ??????????????????'
        className='my-3 form-control form-control-user' />
         {errorList.filter((err) => err.context.label === "email")[0] ? (
                <div className="text-danger ">
                  {
                    '???????? ???????????? ????????????????????'
                  }
                </div>
              ) : null}
  </div>

  <div className='form-group'>
  <input  onChange={getUserData} type="number" name="age" id="age" placeholder='????????'
        className='my-3 form-control form-control-user' />
        {errorList.filter((err) => err.context.label === "age")[0] ? (
                <div className="text-danger ">
                  {
                    '???? 8 ???????? ?????? 80 ??????'
                  }
                </div>
              ) : null}
  </div>

  <div  className='form-group'>
  <input onChange={getUserData} type="password" name="password" id="password" placeholder='???????? ????????'
  className='my-3 form-control form-control-user' />
  {errorList.filter((err) => err.context.label === "password")[0] ? (
                <div className="text-danger ">
                  {
                    '???????? ???????????? ???? A-Z ?? ???????? ?????????? ???? 3-8 ???????? a-z'
                  }
                </div>
              ) : null}
  </div>

  <button type="submit" name="submitButton" 
  className='btn btn-primary text-white submitButton w-100 py-2 btn-user btn-block'>
    {isLoading === true?<i className='fas fa-spinner fa-spin'></i>:'?????????? ????????????'}
    

    </button>
</form>

<hr/>
<div className='text-center'>
  <span className='small' >???? ???????? ???????? ?????????? </span>
  <Link to='/login' className='small a2 cursor ms-2'>
  ?????????? ????????????
  <i className='fas fa-chevron-right small'></i>
  </Link>

</div>
 </div>
  </div>
   </div>
    </div>
      </div>
        </div>
          </div>
  
  </>
  
}
