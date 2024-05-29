
import { useParams } from "react-router-dom"
import axios from "axios";


function ActivationPage() {
     const {activationcode}= useParams();
     console.log(activationcode);
     axios.post(`http://localhost:5000/api/auth/verifyUser/${activationcode}`);

  return (
    <div>ActivationPage</div>
  )
}

export default ActivationPage