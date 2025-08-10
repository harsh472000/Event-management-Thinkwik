import { Link } from 'react-router-dom';
import '@/styles/index.css';

export default function Header() {
  return (
    <header className="app-header">
      <nav className="container row between center">
        <Link to="/" className="brand">Events</Link>
        
      </nav>
    </header>
  );
}