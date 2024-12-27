import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllExchangePoints, login } from "../common/apiService";
import { useUserStore } from "../common/storage";
import { UserRole } from "../common/user.roles";



const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [point, setPoint] = useState<number>(-1);
    const [points, setPoints] = useState<number[]>([]);
    const [errors, setErrors] = useState<any>({});
    const navigate = useNavigate();


    const validateUsername = (username: string) => {
        const errors: any = {};
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            errors.username = "Ім'я користувача може містити лише літери та цифри.";
        }
        if (!username || username.trim() === '') {
            errors.username = "Ім'я користувача не може бути порожнім або містити пробіли.";
        }
        if (username.length > 20) {
            errors.username = "Ім'я користувача має бути не більше 20 символів.";
        }
        
        return errors;
    };

    const validatePassword = (password: string) => {
        const errors: any = {};
        if (password.length < 6) {
            errors.password = "Пароль повинен мати довжину не менше 8 символів.";
        }
        if (!password || password.trim() === '') {
            errors.password = "Пароль не може бути порожнім або містити пробіли.";
        }
        return errors;
    };

    useEffect(() => {
        getAllExchangePoints().then(data => {
            const mapped = data.map((e:any) => e.id);

            setPoints(mapped);
        });
    }, []);
    const userStore: any = useUserStore();
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const usernameErrors = validateUsername(username);
        const passwordErrors = validatePassword(password);
        const allErrors = { ...usernameErrors, ...passwordErrors };

        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
        } else {
            const data = await login(username, password, point);
            if (data?.message?.length > 0) {
                alert(data?.message)
            } else if (data?.access_token) {    
                userStore.auth(data?.id, data?.role, data?.exchangePointId, data?.access_token)
                if (data?.role === UserRole.Admin)
                {
                    navigate("/admin-panel");
                } else {
                    navigate("/worker-panel")
                }
        
            } else {
                alert("Щось пішло не так, спробуйте пізніше");
            }
        }
    };

    return (
        <>
            <h1 className='text-center mt-5'>Увійти</h1>
            <form style={{ maxWidth: "600px" }} className='mt-5 mx-auto' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Ім'я користувача</label>
                    <input
                        className="form-control"
                        id="username"
                        placeholder="Ім'я користувача"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <small className="text-danger">{errors.username}</small>}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="exchangePointId">№ відділення:</label>
                    <select onChange={(e) => setPoint(e.target.value)} className="ms-2" defaultValue={""} name="exchangePointId" id="exchangePointId">

                        <option value="-1" >Admin</option>
                        {points.map(id => (
                            <option value={id} key={id}>{id}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Увійти</button>
            </form>
        </>
    );
};

export default LoginPage;