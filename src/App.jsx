import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function App() {
  const [eventsdata, setEventsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [eventType, setEventType] = useState("Both"); // default
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch events once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://meet-up-backend-three.vercel.app/events/");
        const events = await res.json();
        setEventsData(events.data);
        setFilteredData(events.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchData();
  }, []);

  // Filter when eventType or searchTerm changes
  useEffect(() => {
    let filtered = [...eventsdata];

    // Filter by type
    if (eventType !== "Both") {
      filtered = filtered.filter(e => e.eventType === eventType);
    }

    // Filter by search (title or tags)
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(e =>
        e.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.tags && e.tags.some(tag =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    setFilteredData(filtered);
  }, [eventType, searchTerm, eventsdata]);

  return (
    <>
      <div className='bg-light container-fluid px-4'>
        {/* Header */}
        <div className='d-flex flex-wrap justify-content-between align-items-center gap-2'>
          <h2 className="text-danger">Meetup</h2>
          <input
            className="rounded p-2"
            type="search"
            placeholder="Search by title or tags"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <hr />

        {/* Event filter */}
        <div className='d-flex flex-wrap justify-content-between align-items-center gap-3'>
          <h1>Meetup Events</h1>
          <select
            name="mode"
            id="mode"
            className='rounded p-2'
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="Both">Both</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        {/* Events cards */}
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-3'>
          {filteredData.length === 0 ? (
            <p className='text-center mt-4'>No events found.</p>
          ) : (
            filteredData.map(d => (
              <div className='col mb-4' key={d._id}>
                <Link to={`/Details/${d.eventName}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className='card h-100'>
                    <div className='position-relative'>
                      <img
                        src={d.imageUrl}
                        alt={d.eventName}
                        style={{ height: "200px", objectFit: "cover" }}
                        className="img-fluid card-img-top w-100"
                      />
                      <button className='position-absolute top-0 end-0 p-1 m-4 rounded bg-secondary-subtle'>
                        {d.eventType} Event
                      </button>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <div className='d-flex justify-content-start'>
                        <p className="card-text pe-3">
                          Date: {new Date(d.startDate).toLocaleDateString("en-GB", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <p className="card-text">
                          Time: {new Date(d.startDate).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <h4 className="card-text mt-2">{d.eventName}</h4>
                      {/* Optional tags display */}
                      {d.tags && d.tags.length > 0 && (
                        <div className="mt-2">
                          {d.tags.map((tag, idx) => (
                            <span key={idx} className="badge bg-secondary me-1">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
