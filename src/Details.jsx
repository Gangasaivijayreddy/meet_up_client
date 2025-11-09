import { useParams } from "react-router-dom"
import React, { useEffect,useState } from "react";
//import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from 'react-router-dom';


export default function Details(){

    const[data,setData]=useState("")
        const {name}=useParams()
        console.log(name)

         useEffect(() => {
            const fetchData = async () => {
              try {
                const res = await fetch(`https://meet-up-backend-three.vercel.app/events/${name}`);
                const event = await res.json();
                if(event){
                    setData(event.data)
                    console.log(event)
                    console.log(data)
                }
        
               
              } catch (err) {
                console.error("Error fetching events:", err);
              }
            };
        
            fetchData();
          }, [name]);

    return(
        <>
        <div className='bg-light container-fluid px-2 m-2 '>
        {/* Header */}
        <div className='d-flex justify-content-between align-items-center'>
          <Link to="/"  style={{ textDecoration: "none", color: "inherit" }}> <h2 className="text-danger shadow-lg ">Meetup</h2></Link>
          <input
            className="rounded p-2"
            type="search"
            placeholder="Search by title and tags"
          />

          </div>
        <hr />

          <div className="row row-cols-1 row-cols-md-2">
            {/* left side of view */}
            <div className="col">
                <h3>Marketing Seminar</h3>
                <p className="p-0 m-0">Hosted By:</p>
                <p className="pb-4"><strong>{data.hostedBy}</strong></p>
                <img src={data.imageUrl} alt="" className="image-fluid w-100 rounded " />
                <h4 className="pt-3">Details:</h4>
                <p>{data.details}</p>
                <h4>Additional Information:</h4>
                <p><strong>Dress Code: </strong>  {data.dressCode}</p>
                <p><strong>Age Restriction:</strong>{data.ageRestriction}</p>
                

                <h4>Event Tags:</h4>
                {
                    data?.eventTags?.length>0?(data.eventTags.map((tag)=>
                            (<button className="mx-3 rounded my-3 bg-danger text-light shodow-lg">{tag}</button>)
                    )
                ):(<p>No tags available</p>)
                };
                
                
            </div>
            {/* right side of view */}
            <div className="col">
                <div className="card mx-4 my-4 py-4">
                    <div className="d-flex justify-content-start px-4 py-0 my-0">
                        <p className="card-text ">
                        Date: {new Date(data.startDate).toLocaleDateString("en-GB", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="card-text ">
                        Time: {new Date(data.startDate).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>    
                    </div>

                    <div className="d-flex justify-content-start px-4 py-0 my-0">
                        <p className="card-text">
                        Date: {new Date(data.endDate).toLocaleDateString("en-GB", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="card-text ">
                        Time: {new Date(data.endDate).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>    
                    </div>


                    <div className="px-4">
                        <p >
                            {data.address}
                        </p>
                    </div>

                    <div className="px-4" >
                        <p  ><strong>$ {data.price}</strong></p>
                    </div>

                </div>

                    <h4 className="mx-4">Speakers:</h4>
                        {
                        data?.speakers?.length > 0 ? (
  <div className="d-flex flex-wrap gap-3 mx-4">
    {data.speakers.map((spk, index) => (
      <div
        key={index}
        className="card p-2 text-center shadow-sm"
        style={{
          width: "160px",   // control card size
          borderRadius: "10px",
        }}
      >
        <img
          src={spk.image}
          alt={spk.name}
          className="rounded-circle mx-auto"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
          }}
        />
        <p className="fw-bold mt-2 mb-0">{spk.name}</p>
        <p className="text-muted" style={{ fontSize: "13px" }}>
          {spk.position}
        </p>
      </div>
    ))}
  </div>
) : (
  <p>No speakers listed for this event.</p>
)
}





            </div>

          </div>
</div>
        </>
    )
}