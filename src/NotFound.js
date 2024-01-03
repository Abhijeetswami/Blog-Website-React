import {Link}from "react-router-dom";
const NotFound=()=>{
    return(
        <div className="not found">
            <h2>sorry</h2>
            <p>page not found</p>
            <Link to="/">back to the homepage</Link>
        </div>
    );
}
export default NotFound;