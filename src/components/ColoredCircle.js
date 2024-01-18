import "../styles/ColoredCircle.css";
const ColoredCircle = ({ color }) => {

    const styles = { backgroundColor: color };

    if(color === "red"){
        return(
            <>
            <span className="colored-circle" style={styles} />
            <p>Server is Down</p>
            <p>Click on login button without any details till server is active(green),as with inactivity ,it spins down server.</p>
            </>
        ) 
    }
    if(color==="green"){
        return(
            <>
            <span className="colored-circle" style={styles} />
            <p>Server is up</p>
            </>
        ) 
    }
    
    };

export default ColoredCircle;