import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import styles from "./profile.module.css";
import Dash from "../dash-bord/Dash";

function AdminProfile() {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});

    const token = localStorage.getItem('token');
    let config = token && {
        headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`
        }
    };

    const handleUpdateProfil = async (e) => {
        e.preventDefault();

        let validationErrors = {};
        if (!user.username) validationErrors.username = "Ce champ est obligatoire";
        if (!user.lastname) validationErrors.lastname = "Ce champ est obligatoire";
        if (!user.email) validationErrors.email = "Ce champ est obligatoire";
        if (!user.phone) validationErrors.phone = "Ce champ est obligatoire";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        axios
            .put(`http://localhost:5000/api/auth/update_user/${user._id}`, user, config)
            .then((result) => {
                localStorage.setItem("userData", JSON.stringify(result.data.user));
                toast.success("profile mis a jour avec succés");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            });
    };

    let id = JSON.parse(localStorage.getItem("userData"))._id;
    useEffect(() => {
        try {
            axios.get(`http://localhost:5000/api/user/getUser/${id}`, config).then((result) => {
                let data = result.data;
                delete data.password;
                setUser(data);
            });
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    return (
        <Dash>
            <ToastContainer />
            <div className={styles.rowJustifyContentCenter}>
                <div className={styles.col8}>
                    <div className={`${styles.mb2} ${styles.bgSuccess} ${styles.textWhite}`}>
                        <h4 className={`${styles.p2} ${styles.m4} ${styles.textCenter}`}  style={{backgroundColor:'#62c1d2' ,color:'#0e172f', width:' 1300px' , marginLeft:'-300px', fontSize:'30px'}}>
                            Informations profil
                        </h4>
                    </div>
                    <form onSubmit={handleUpdateProfil} className={styles.formRow}>
                        <div>
                            <label htmlFor="username">Prénom <span style={{ color: "red" }}>*</span></label>
                            <input
                                type="text"
                                id="username"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />
                            {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
                        </div>
                        <div>
                            <label htmlFor="lastname">Nom <span style={{ color: "red" }}>*</span></label>
                            <input
                                type="text"
                                id="lastname"
                                value={user.lastname}
                                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                            />
                            {errors.lastname && <span style={{ color: "red" }}>{errors.lastname}</span>}
                        </div>
                        <div>
                            <label htmlFor="email">E-mail <span style={{ color: "red" }}>*</span></label>
                            <input
                                type="text"
                                id="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                            {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe <span style={{ color: "red" }}>*</span></label>
                            <input
                                type="text"
                                id="password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                            {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                        </div>
                        <div>
                            <label htmlFor="phone">Télephone <span style={{ color: "red" }}>*</span></label>
                            <input
                                type="text"
                                id="phone"
                                value={user.phone}
                                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            />
                            {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
                        </div>
                        <div>
                            <br />
                            <button
                            style={{color:'#0e172f' ,marginTop:'20px' , backgroundColor:'#62c1d2' , width:'420px'}}
                                type="submit"
                                className={`${styles.btnPrimary} ${styles.px5} ${styles.btnLg}`}
                            >
                                <i className={`fas fa-save ${styles.btnPrimaryIcon}`} style={{ color: "white" }}></i> Sauvgarder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Dash>
    );
}

export default AdminProfile;
