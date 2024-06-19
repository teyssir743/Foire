import  { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useParams,useNavigate } from 'react-router-dom'

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { id } = useParams()
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

const navigate = useNavigate()

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('les deux mot de passes ne sont pas identiques');
            return;
        }
        axios.post('http://localhost:5000/api/auth/reset_password/' + id, { password: password })
            .then(result => {
                if (result.data.message) {
                    toast.success(result.data.message);
                    setTimeout(() => {
                        navigate('/login',{replace:true})
                    }, 2500);
                } else {
                    toast.error(result.data.error);
                }
            })
            .catch(error => {
                console.error('Error during password reset:', error);
                toast.error('Error during password reset!');
            });
    };
    return (
        <div style={{ width: '100vw', backgroundColor:'#0e172f' }} className="min-h-screen  flex items-center justify-center bg-gray-100">

            <div style={{border:' 1px solid #ac1962' ,backgroundColor:'transparent' , width:'600px' , height:'300px'}} >
                <h2 style={{color:'white'}}className="text-2xl font-bold text-black text-center mb-4">Réinitialiser mot de passe</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={password}
                        onChange={handlePasswordChange}
                        className="text-black border p-2 w-full rounded"
                        placeholder="Nouvelle mot de passe"
                        required
                        style={{marginLeft:'100px', width:'70%'}}
                    />
                    <input
                        type="text"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="text-black border p-2 w-full rounded"
                        placeholder="Confirmer mot de passe"
                        required
                        style={{marginLeft:'100px', width:'70%'}}
                    />
                    <button
                        type="submit"
                       style={{width:'70%' ,  backgroundColor: '#4299e1',
                       color:'#ffffff',
                    height:'50px' ,marginLeft:'100px'}}
                    >
                        Valider
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default ResetPassword