
const URL = 'http://127.0.0.1:3000';

export async function login(username: string, password: string, exchangePointId: number): Promise<any> {
    const response = await fetch(URL + '/user/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
            exchangePointId: exchangePointId
        })
    });

    const data = await response.json();

    return data;
}


export async function getAllExchangePoints() {
    const response = await fetch(URL + '/exchange_points/getAll');
    const data = await response.json();

    return data;
}


export async function getAllTransactions(userStore: any) {
    const response = await fetch(URL + '/transaction', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + userStore.access_token
        }
    });

    const data = await response.json();

    return data;
}

export async function getAllDeposits(userStore: any) {
    const response = await fetch(URL + '/deposits', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + userStore.access_token
        }
    });

    const data = await response.json();

    return data;
}

export async function getAllBalances(userStore: any) {
    const response = await fetch(URL + '/balances', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + userStore.access_token
        }
    });

    const data = await response.json();

    return data;
}

export async function createTransaction(currencyCodeFrom:any, amountFrom:any, currencyCodeTo:any, amountTo:any, userStore:any) {
    const response = await fetch(URL + '/transaction', {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + userStore.access_token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currencyCodeFrom,
            amountFrom,
            currencyCodeTo,
            amountTo,
            exchangePointId: userStore.exchangePointId
        })
    });

    const data = await response.json();

    return data;
}

export async function createDeposit(currencyCode:any, amount:any, userStore:any) {
    const response = await fetch(URL + '/deposits', {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + userStore.access_token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currencyCode,
            amount,
            exchangePointId: userStore.exchangePointId,
            userId: userStore.id,
        })
    });

    const data = await response.json();

    return data;
}