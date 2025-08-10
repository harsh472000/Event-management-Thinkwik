import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row between center">
        <h2>My Events</h2>
        <Link className="btn" to="/events/new">+ New Event</Link>
      </div>
    </div>
  )
}

export default Dashboard