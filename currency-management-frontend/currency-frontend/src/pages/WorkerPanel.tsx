import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createDeposit, createTransaction, getAllBalances } from "../common/apiService";
import { CurrencyCode } from "../common/currency-code.enum";
import { useUserStore } from "../common/storage";

const WorkerPanel = () => {
    const navigate = useNavigate();
    const userStore: any = useUserStore();
    const [currencyCodeFrom, setCurrencyCodeFrom] = useState('');
    const [amountFrom, setAmountFrom] = useState('');
    const [currencyCodeTo, setCurrencyCodeTo] = useState('');
    const [amountTo, setAmountTo] = useState('');
    const [currencyCodeDeposit, setCurrencyCodeDeposit] = useState('');
    const [amountDeposit, setAmountDeposit] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [balances, setBalances] = useState([]);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const allErrors: any = {};

        if (!currencyCodeFrom) {
            allErrors.currencyCodeFrom = "Виберіть валюту яку берете.";
        }
        if (!amountFrom || isNaN(Number(amountFrom)) || Number(amountFrom) <= 0) {
            allErrors.amountFrom = "Введіть суму яку берете.";
        }
        if (!currencyCodeTo) {
            allErrors.currencyCodeTo = "Виберіть валюту яку віддаєте.";
        }
        if (!amountTo || isNaN(Number(amountTo)) || Number(amountTo) <= 0) {
            allErrors.amountTo = "Введіть суму яку віддаєте.";
        }

        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
        } else {
            createTransaction(currencyCodeFrom, amountFrom, currencyCodeTo, amountTo, userStore).then(data => {
                if (data?.message) {
                    alert("Щось пішло не так, спробуйте пізніше");
                } else {
                    setCurrencyCodeFrom("");
                    setAmountFrom("");
                    setCurrencyCodeTo("");
                    setAmountTo("");
                }
            })
        }
    };


    const handleSubmitDeposit = async (e: FormEvent) => {
        e.preventDefault();
        const allErrors: any = {};

        if (!currencyCodeDeposit) {
            allErrors.currencyCode = "Выберите валюту.";
        }
        if (!amountDeposit || isNaN(Number(amountDeposit)) || Number(amountDeposit) <= 0) {
            allErrors.amount = "Введите корректную сумму.";
        }

        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
        } else {
            createDeposit(currencyCodeDeposit, parseInt(amountDeposit), userStore).then(data => {
                if (data?.message) {
                    alert("Щось пішло не так, спробуйте пізніше");
                } else {
                    setCurrencyCodeDeposit("");
                    setAmountDeposit("");
                }
            })
        }
    };

    useEffect(() => {
        getAllBalances(userStore).then(data => {
            data.sort(function (a: any, b: any) {
                return b.exchangePoint.id - a.exchangePoint.id;
            });

            setBalances(data.filter((d: any) => d.exchangePoint.id === userStore.exchangePointId));
        }
        )
    }, [])


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand" href="#">CurrencyManagement</a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" style={{ cursor: "pointer" }} onClick={() => {
                                userStore.logout()
                                navigate("/");
                            }}>Вийти</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container">
            <h2 className="text-center mt-3 mb-3">Баланси валют на точці</h2>
                <table className="table" style={{width: "600px", margin: "0 auto"}}>
                    <thead>
                        <tr>
                            <th scope="col">Валюта</th>
                            <th scope="col">Баланс</th>
                        </tr>
                    </thead>
                    <tbody>
                        {balances.map((b: any) => (
                            <tr key={b.id}>
                                <td>{b.currencyCode}</td>
                                <td>{b.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2 className="text-center mt-3 mb-2">Обмін валюти</h2>
                <form style={{ maxWidth: "600px" }} className='mt-5 mx-auto' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="currencyCodeFrom">Валюта яку берете</label>
                        <select
                            className="form-control"
                            id="currencyCodeFrom"
                            value={currencyCodeFrom}
                            onChange={(e) => setCurrencyCodeFrom(e.target.value)}
                        >
                            <option value="">Оберіть валюту</option>

                            {Object.keys(CurrencyCode).map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        {errors.currencyCodeFrom && <small className="text-danger">{errors.currencyCodeFrom}</small>}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="amountFrom">Сума яку віддаєте</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amountFrom"
                            placeholder="Введіть суму"
                            value={amountFrom}
                            onChange={(e) => setAmountFrom(e.target.value)}
                        />
                        {errors.amountFrom && <small className="text-danger">{errors.amountFrom}</small>}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="currencyCodeTo">Валюта яку віддаєте</label>
                        <select
                            className="form-control"
                            id="currencyCodeTo"
                            value={currencyCodeTo}
                            onChange={(e) => setCurrencyCodeTo(e.target.value)}
                        >
                            <option value="">Оберіть валюту</option>
                            {Object.keys(CurrencyCode).map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        {errors.currencyCodeTo && <small className="text-danger">{errors.currencyCodeTo}</small>}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="amountTo">Сума яку віддаєте</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amountTo"
                            placeholder="Введіть суму"
                            value={amountTo}
                            onChange={(e) => setAmountTo(e.target.value)}
                        />
                    </div>
                    {errors.amountTo && <small className="text-danger">{errors.amountTo}</small>}
                    <button type="submit" className="btn btn-primary mt-3">Поміняти</button>
                </form >

                <h2 className="text-center mt-5 mb-2">Внесення грошей до каси:</h2>
                <form style={{ maxWidth: "600px" }} className='mt-5 mx-auto' onSubmit={handleSubmitDeposit}>
                    <div className="form-group">
                        <label htmlFor="currencyCode">Валюта</label>
                        <select
                            className="form-control"
                            id="currencyCode"
                            value={currencyCodeDeposit}
                            onChange={(e) => setCurrencyCodeDeposit(e.target.value)}
                        >
                            <option value="">Выберить валюту</option>
                            {Object.keys(CurrencyCode).map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        {errors.currencyCode && <small className="text-danger">{errors.currencyCode}</small>}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="amount">Сума</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            placeholder="Введите сумму"
                            value={amountDeposit}
                            onChange={(e) => setAmountDeposit(e.target.value)}
                        />
                        {errors.amount && <small className="text-danger">{errors.amount}</small>}
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Внести</button>
                </form>

            </div >
        </>)
};

export default WorkerPanel;