import React from 'react'
import { useState } from 'react'
import styles from './Add.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spiner from '../Spiner'

export default function Add(){
    const [input, sInput] = useState("")
    const [date, sDate] = useState()
    const [time, sTime ] = useState()
    const [isHover, sIsHover ] = useState(false)
    const [inpute, sInpute] = useState("")
    const [datee, sDatee] = useState("")
    const [timee, sTimee] = useState("")
    const navigate = useNavigate()
    const [loading, sLoading] = useState(false)
    function doClick() {
        const dis = [
            { data: input.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" "), kkk: sInpute , n: "is-invalid"},
            { data: time  ? time.toString() : "", kkk: sTimee ,
            n: "is-invalid"},
            { data: date  ? date.toString() : "", kkk:  sDatee,
            n: "is-invalid" }
        ];
    
        dis.forEach((e, i) => {
            if (!e.data) { 
                return e.kkk(`${e.n}`)
            }
            else if(e.data !== ""){
                e.kkk(``)
                console.log(e.data)
            }
        });
        const newData= {
            title: dis[0].data,
            endTime: dis[1].data,
            endDate: dis[2].data
        }
        axios
            .post("http://192.168.1.54:1000/data/", newData)
            .then(() => {
                sLoading(false);
                navigate('/')
            })
            .catch((e) => {
                console.log(e)
            })
    }
    return(
        <div style={{height: "100vh"}} className='d-flex justify-content-center align-items-center'>
            {loading
            ?
            <Spiner/>
            :
            <div className='container moi '>
                <h1 style={{fontFamily: "fantasy", textAlign: "center"}}>Advanced To-Do List</h1>
                <div style={{height: "17em"}} className=' row d-flex justify-content-center align-items-center'>
                    <div className=' h-100 row col-10 col-lg-5'>
                        <form className=' h-25 form-floating col-12 '>
                            <input style={{ fontFamily: "fantasy"}} placeholder='name' 
                            className={`${styles.moi} form-control ${inpute}`}
                            type="text" 
                            value={input} onChange={(e) => sInput(e.target.value)} />
                            <label style={{ fontFamily: "fantasy"}} className=' ps-4 form-lable'>Enter Name:</label>
                        </form>
                        <form className='h-25  col-12 '>
                            <input 
                            className={`${styles.moi} form-control ${datee}`}
                            style={{height: "3.5em" , fontFamily: "fantasy"}}
                            placeholder=' moi' 
                            type="date" 
                            value={date} onChange={(e) => sDate(e.target.value)} />
                        </form>
                        <form className='h-25  col-12 '>
                            <input style={{height: "3.5em", fontFamily: "fantasy"}} 
                            className={`${styles.moi} form-control ${timee}`}
                            type="time" 
                            value={time} onChange={(e) => sTime(e.target.value)} />
                        </form>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-itmes-center gap-5'>
                    <button style={{ fontFamily: "fantasy"}} className=' button btn btn-secondary' 
                    onClick={doClick}>Set Remider</button>
                    <Link to={'/'} className=' btn btn-danger'
                    onMouseEnter={() => sIsHover(true)}
                    onMouseLeave={() => sIsHover(false)}>
                        <i className={`fa-solid fa-arrow-left 
                        ${isHover ? "fa-beat" : ""}`} ></i>
                    </Link>
                </div>
            </div>
            }
    </div>
    )
}
