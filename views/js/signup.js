let form = document.getElementById('signup-form')

form.addEventListener('submit', (e) => {
    let email = document.getElementById('email').value
    let fname = document.getElementById('fname').value
    let lname = document.getElementById('lname').value
    let pass = document.getElementById('pass').value
    let age = document.getElementById('age').value


    e.preventDefault();
    fetch(`http://localhost:3000/create?fname=${fname}&lname=${lname}&email=${email}&password=${pass}&age=${age}`, {
        method: 'POST'
    }).then(async resu => {
        let results = await resu.json()
        if (results['response'] === 'success') {
            window.location.replace(`/dashboard?authkey=${results['authkey']}`)
        } else {
            alert('Account Already Exists!')
        }
    })
})