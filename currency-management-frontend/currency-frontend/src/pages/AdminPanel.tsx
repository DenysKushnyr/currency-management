import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllBalances, getAllDeposits, getAllTransactions } from "../common/apiService";
import { useUserStore } from "../common/storage";

const AdminPanel = () => {
    const navigate = useNavigate();
    const userStore: any = useUserStore();
    const [transactions, setTransactions] = useState([]);
    const [deposits, setDeposits] = useState([]);
    const [balances, setBalances] = useState([]);

    useEffect(() => {
        getAllTransactions(userStore).then(data => {
            data.sort(function (a: any, b: any) {
                return b.id - a.id;
            });

            setTransactions(data)
        }
        )

        getAllDeposits(userStore).then(data => {
            data.sort(function (a: any, b: any) {
                return b.id - a.id;
            });

            setDeposits(data)
        }
        )

        getAllBalances(userStore).then(data => {
            data.sort(function (a: any, b: any) {
                return b.exchangePoint.id - a.exchangePoint.id;
            });

            setBalances(data)
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
            <h2 className="text-center mt-3 mb-3">Баланси на точках</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">№ точки</th>
                            <th scope="col">Валюта</th>
                            <th scope="col">Баланс</th>
                        </tr>
                    </thead>
                    <tbody>
                        {balances.map((b: any) => (
                            <tr key={b.id}>
                                <th scope="row">{b.exchangePoint.id}</th>
                                <td>{b.currencyCode}</td>
                                <td>{b.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2 className="text-center mt-5 mb-3">Останні транзакції</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Віддали</th>
                            <th scope="col">Взяли</th>
                            <th scope="col">№ точки</th>
                            <th scope="col">Час</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t: any) => (
                            <tr key={t.id}>
                                <th scope="row">{t.id}</th>
                                <td>{t.amountTo + ' ' + t.currencyCodeTo}</td>
                                <td>{t.amountFrom + ' ' + t.currencyCodeFrom}</td>
                                <td>№ {t.exchangePoint.id}</td>
                                <td>{new Date(t.timestamp).toLocaleString('uk-UA')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <h2 className="text-center mt-5 mb-3">Останні депозити</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Кількість валюти</th>
                            <th scope="col">№ точки</th>
                            <th scope="col">Username людини, яка приймала гроші</th>
                            <th scope="col">Час</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deposits.map((d: any) => (
                            <tr key={d.id}>
                                <th scope="row">{d.id}</th>
                                <td>{d.amount + ' ' + d.currencyCode}</td>
                                <td>№ {d.exchangePoint.id}</td>
                                <td>{d.user.username}</td>
                                <td>{new Date(d.timestamp).toLocaleString('uk-UA')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminPanel;