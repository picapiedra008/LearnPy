import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/listar">Mis lecciones</Link> | <Link to="/otros">Otros</Link>
    </nav>
  );
}

export default Navbar;