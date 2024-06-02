import { Link, Outlet } from "react-router-dom";

const Chat = () => {
  return (
    <>

      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">Chat</Link>
        </div>
      </nav>

      <Outlet />
    </>

  )
}

export default Chat; 