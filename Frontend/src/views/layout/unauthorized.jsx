import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate()
    return (
        <div className="unauthorized">

            <h1>Désolé, vous n'êtes pas autorisé à voir cette page</h1>
            <img
                src="https://media.istockphoto.com/id/867726980/vector/shield-with-hand-block-icon-in-flat-style-with-shadow.jpg?s=612x612&w=0&k=20&c=zGs9BVbC8oBxNwbe-i2aWa1BTTUreVx9KRssNubsH-c="
                alt="Red Hand"
                className="img-fluid mt-3"
            />

            <button className="go_back" onClick={() => navigate('/')}>Acceuil</button>
        </div>
    );
};

export default Unauthorized;
