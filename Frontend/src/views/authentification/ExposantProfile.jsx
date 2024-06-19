import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import styles from "./profile.module.css";
import TopBarHome from '../visiteur/TopBarHome';

function ExposantProfile() {
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
                toast.success("Profil mis à jour avec succès");
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
        <>
            <TopBarHome />
            <ToastContainer />
            <div className={styles.rowJustifyContentCenter} style={{backgroundColor:'#0e172f', width:' 1536px', height:' 750px'}}>
                <div className={styles.col8} style={{marginTop:'150px'}}>
                    <div className={`${styles.mb2} ${styles.bgSuccess} ${styles.textWhite}`}>
                        <h4 className={`${styles.p2} ${styles.m4} ${styles.textCenter}`} style={{backgroundColor:'#62c1d2' ,color:'#0e172f', width:' 1730px' , marginLeft:'-500px', fontSize:'30px'}}>
                            Informations profil
                        </h4>
                    </div>
                    <form onSubmit={handleUpdateProfil} className={styles.formRow}>
                        <div>
                            <label htmlFor="username">
                                Prénom <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />
                            {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
                        </div>
                        <div>
                            <label htmlFor="lastname">
                                Nom <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                value={user.lastname}
                                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                            />
                            {errors.lastname && <span style={{ color: "red" }}>{errors.lastname}</span>}
                        </div>
                        <div>
                            <label htmlFor="email">
                                E-mail <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                            {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                        </div>
                        <div>
                            <label htmlFor="mot_de_passe">
                                Mot de passe <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="mot_de_passe"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone">
                                Téléphone <span style={{ color: "red" }}>*</span>
                            </label>
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
                                type="submit"
                                style={{color:'#0e172f' ,marginTop:'20px' , backgroundColor:'#62c1d2' , width:'420px'}}
                                className={`${styles.btnPrimary} ${styles.px5} ${styles.btnLg}`}
                            >
                                <i className={`fas fa-save ${styles.btnPrimaryIcon}`} style={{ color: "white" }}></i> Sauvegarder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ExposantProfile;
