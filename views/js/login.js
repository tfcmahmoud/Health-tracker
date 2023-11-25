let form = document.getElementById('login-form')

form.addEventListener('submit', (e) => {
    let email = document.getElementById('email').value
    let pass = document.getElementById('pass').value

    e.preventDefault();
    fetch(`http://localhost:3000/check?email=${email}&password=${pass}`, {
        method: 'POST'
    }).then(async resu => {
        let results = await resu.json()
        if (results['response'] === 'success') {
            window.location.replace(`/dashboard?authkey=${results['authkey']}`)
        } else if (results['response'] === 'wrong') {
            alert('Wrong Password!')
        } else {
            alert('Account Doesn\'t Exist!')
        }
    })
})