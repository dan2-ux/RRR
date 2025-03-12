import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Spiner from "../Spiner"

export default function Home(){
    const [isHover, sIsHover] = useState(false)
    const [re, sRe] = useState([])
    const [ex , sEx] = useState([])
    const navigate = useNavigate();
    const [kkk , sKKK] = useState(true)
    const [id , sId] = useState()
    const [loading, sLoading] = useState(false)

    useEffect( () => {
        sRe([])
        sEx([])
        sLoading(true)
        axios
            .get("http://localhost:1000/data/")
            .then((res) => {
                {res.data.map((e,i) => {
                    const getTime = new Date(`${e.endDate} ${e.endTime}`)
                    if(getTime.getTime() - Date.now() < 0){
                        sEx((ex) => [...ex, e])
                    }
                    else{
                        sRe((re) => [...re, e])
                    }
                })}
                sLoading(false)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [kkk ])
    function doDel() {
        sLoading(true);
        const _id = kkk ? re[id]?._id : ex[id]?._id
        axios
            .delete(`http://localhost:1000/data/${_id}`)
            .then(() => {
                sLoading(false);
                navigate(0)
            })
            .catch((id) => {
                console.log(id)
            })
    }
    return(
        <div style={{width: "100%", height: "100vh"}}
        className="d-flex justify-content-center align-items-center">
            <div  className=" modal fade" id="modal">
                <div className=" modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                    <div className=" modal-content d-flex flex-column justify-content-center align-items-center">
                        <div className=" modal-header d-flex justify-content-between align-items-center w-100">
                            <h3>Confirm Delete</h3>
                            <button className=" btn btn-close btn-secondary" data-bs-dismiss="modal" data-bs-target="#modal"></button>
                        </div>
                        <div className=" modal-body ">
                            <h1 className=" mb-4 text-center" >Delete {kkk ? re[id]?.title : ex[id]?.title} </h1>
                            <div className=" d-flex justify-content-center align-items-center"
                            onClick={doDel}>
                                <button className=" btn btn-success">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className=" h-50 col-9 col-md-10 col-md-6 col-xl-8 col-xxl-7">
                <div className="container mb-4">
                    <div className="row ">
                        <button style={{fontFamily: "fantasy"}} onClick={() => sKKK(true)}
                        className=" col-5 btn btn-secondary rounded rounded-0">
                            Stuffs to do
                        </button>
                        <button style={{fontFamily: "fantasy"}} onClick={() => sKKK(false)}
                        className=" col-5 btn btn-secondary rounded rounded-0">
                            Out of Date
                        </button>
                        <Link to={'/add'} className=" col-2 btn btn-secondary rounded rounded-0"
                        onMouseEnter={() => sIsHover(true)}
                        onMouseLeave={() => sIsHover(false)}>
                            <i className={`fa-solid fa-plus ${isHover ? "fa-bounce fa-xl" : ""}`}></i>
                        </Link>
                    </div>
                </div>
                <div style={{height: "21em"}}  className="row gap-4 overflow-x-auto d-flex flex-row">
                    {loading 
                    ?
                    <Spiner/>
                    :
                    kkk 
                    ?
                    re.map((e,i) => (
                        <div style={{border: 0, padding:0, margin:0, height: "6rem"}} 
                        key={i} className="row bg-white" >
                            <div style={{border: 0, padding:0, margin:0}} className="col-6 col-lg-4  ">
                                <table style={{ userSelect: "none"}}>
                                    <tbody>
                                        <tr>
                                            <th >Activity:</th>
                                            <td>{e.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Date:</th>
                                            <td>{e.endDate}</td>
                                        </tr>
                                        <tr>
                                            <th>Time:</th>
                                            <td>{e.endTime}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{border: 0, padding:0, margin:0}} className="col-5 col-lg-7">
                                <ScheduleItem key={i} value={e} sRe={sRe} sEx={sEx} re={re} ex={ex}/>
                            </div>
                            <button style={{border: 0, padding:0, margin:0}} 
                            className="col-1 btn btn-secondary rounded rounded-0" title={`Delete ${e.title}`}
                            onClick={() => sId(i)}
                            data-bs-toggle="modal" data-bs-target="#modal">
                                <i className={`fa-solid fa-trash `}></i>
                            </button>
                        </div>
                    ))
                    :
                    ex.map((e,i) => (
                        <div style={{border: 0, padding:0, margin:0, height: "6rem"}} key={i} className="row bg-white">
                            <div style={{border: 0, padding:0, margin:0}} className="col-6 col-lg-4  ">
                                <table style={{ userSelect: "none"}}>
                                    <tbody>
                                        <tr>
                                            <th >Activity:</th>
                                            <td>{e.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Date:</th>
                                            <td>{e.endDate}</td>
                                        </tr>
                                        <tr>
                                            <th>Time:</th>
                                            <td>{e.endTime}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div  style={{border: 0, padding:0, margin:0, userSelect: "none"}} className="col-5 col-lg-7 d-flex justify-content-center align-items-center">
                                <h1>Expired</h1>
                            </div>
                            <button style={{border: 0, padding:0, margin:0}} title={`Delete ${e.title}`}
                            onClick={() => sId(i)}
                            data-bs-toggle="modal" data-bs-target="#modal"
                            className="col-1 btn btn-secondary rounded rounded-0"   >
                                <i className={`fa-solid fa-trash `}></i>
                            </button>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

function ScheduleItem({value, sRe, sEx, re, ex}){
    const time = value.endTime;
    const date = value.endDate;
    const fullDatetime = new Date(`${date} ${time}`)
    const [dis, sDis] = useState(fullDatetime.getTime() - Date.now())
    useEffect(() => {
        if(dis > 1){
            const time = setInterval(() => {
                sDis(fullDatetime.getTime() - Date.now())
            },1000)
            return () => {
                clearInterval(time)
            }
        }
        else{
            sDis(0)
            sRe([])
            sEx([])
            axios
            .get("http://localhost:1000/data/")
            .then((res) => {
                {res.data.map((e,i) => {
                    const getTime = new Date(`${e.endDate} ${e.endTime}`)
                    if(getTime.getTime() - Date.now() < 0){
                        sEx((ex) => [...ex, e])
                    }
                    else{
                        sRe((re) => [...re, e])
                    }
                })}
            })
            .catch((e) => {
                console.log(e)
            })
        }
    }, [dis])
    const secs = String(Math.floor(dis / 1000 % 60)).padStart(2,0);
    const mins = String(Math.floor(dis / (1000 * 60) % 60)).padStart(2,0);
    const hours = String(Math.floor(dis / (1000 * 60 * 60 ) % 24)).padStart(2,0);
    const days = String(Math.floor(dis / (1000 * 60 * 60 * 24))).padStart(2,0)
    return (
        dis > 0 ? 
            <table className="" style={{userSelect: "none"}}> 
                <thead className=" ">
                    <tr className=" ">
                        <th className="  pe-lg-5"><h1>{days}:</h1></th>
                        <th className="  pe-lg-5"><h1>{hours}:</h1></th>
                        <th className=" pe-lg-5"><h1>{mins}:</h1></th>
                        <th className="  pe-lg-5"><h1>{secs}</h1></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Days</td>
                        <td>Hrs</td>
                        <td>Mins</td>
                        <td>Secs</td>
                    </tr>
                </tbody>
            </table>
            :
        <h1>Expired</h1>
    )
}