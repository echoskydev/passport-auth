const configAuth = {
    "cookieSecret": "seedsoft",
    "facebook": {
        "app_id": "901760419844459",
        "app_secret": "7e9dc26782f560375256038ca1e0de7f",
        "callback": "https://passport-authen.herokuapp.com/auth/facebook/callback"
    },
    "twitter": {
        "app_id": "Gl76oTZWvoSyTWG5v7GY1xfcR",
        "app_secret": "dVZdhTnj35MiyXAoGQkaofOYpotoMyOkLN6fURJAUDlnG90K9Z",
        "callback": "https://passport-authen.herokuapp.com/auth/twitter/callback"
    },
    "instagram": {
        "app_id": "f42873813bff49b48a271d1296207bad",
        "app_secret": "0ed73b80c77b43e793a0dc99cb49ff86",
        "callback": "https://passport-authen.herokuapp.com/auth/instagram/callback"
    }
}

module.exports = configAuth;