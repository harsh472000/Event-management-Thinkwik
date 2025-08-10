import { Link } from 'react-router-dom';
import EventList from '@/components/EventList';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row between center">
        <h2>My Events</h2>
        <Link className="btn" to="/events/new">+ New Event</Link>
      </div>
      <EventList />
    </div>
  )
}

export default Dashboard