import { Link, useNavigate } from 'react-router-dom';
import EventList from '@/components/EventList';
import CommonButton from '@/components/common/CommonButton';
import Filters from '@/components/Filters';
import { Plus } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row between center">
        <h2>My Events</h2>
        <CommonButton
            size="md" 
            onClick={() => navigate(`/events/new`)}
          >
            <Plus /> Create Event
          </CommonButton>
      </div>
      <div className='filters-container'>
      <Filters />
      </div>
      <EventList />
    </div>
  )
}

export default Dashboard