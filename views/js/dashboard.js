const urlParams = new URLSearchParams(window.location.search);
const authkey = urlParams.get('authkey');
let sleepform = document.getElementById('sleep-form')
let sleepgform = document.getElementById('sleepg-form')
let weightform = document.getElementById('weight-form')
let weightgform = document.getElementById('weightg-form')
let stepsform = document.getElementById('steps-form')

console.log(authkey)

function showpopup(id) {
    document.getElementById(id).style.display = 'flex';
}

function hidepopup(id) {
    document.getElementById(id).style.display = 'none';
}

sleepform.addEventListener('submit', (e) => {
    let newnum = document.getElementById('sleepnum').value
    e.preventDefault();

    fetch(`http://localhost:3000/addsleep?authkey=${authkey}`, {
        method: 'POST',
        body: JSON.stringify({ number: newnum }),
        headers: { 'Content-Type': 'application/json' }
    }).then(async resu => {
        hidepopup('sleepOverlay')
        let sleepText = document.getElementById('addsleep')
        let results = await resu.json()
        sleepText.textContent = results.new + ' hours'
    })
})

weightform.addEventListener('submit', (e) => {
    let newnum = document.getElementById('weightnum').value
    e.preventDefault();

    fetch(`http://localhost:3000/changeweight?authkey=${authkey}`, {
        method: 'POST',
        body: JSON.stringify({ number: newnum }),
        headers: { 'Content-Type': 'application/json' }
    }).then(async resu => {
        hidepopup('weightOverlay')
        let weightText = document.getElementById('editweight')
        let results = await resu.json()
        weightText.textContent = results.new + ' KG'
    })
})

stepsform.addEventListener('submit', (e) => {
    let newnum = document.getElementById('stepsnum').value
    e.preventDefault();

    fetch(`http://localhost:3000/addsteps?authkey=${authkey}`, {
        method: 'POST',
        body: JSON.stringify({ number: newnum }),
        headers: { 'Content-Type': 'application/json' }
    }).then(async resu => {
        hidepopup('stepsOverlay')
        let stepsText = document.getElementById('addsteps')
        let results = await resu.json()
        stepsText.textContent = results.new
    })
})

sleepgform.addEventListener('submit', (e) => {
    let newnum = document.getElementById('sleepgnum').value
    e.preventDefault();

    fetch(`http://localhost:3000/addsleepg?authkey=${authkey}`, {
        method: 'POST',
        body: JSON.stringify({ number: newnum }),
        headers: { 'Content-Type': 'application/json' }
    }).then(async resu => {
        hidepopup('sleepgOverlay')
        let sleepgText = document.getElementById('addsleepg')
        let results = await resu.json()
        sleepgText.textContent = results.new + ' hours'
    })
})

weightgform.addEventListener('submit', (e) => {
    let newnum = document.getElementById('weightgnum').value
    e.preventDefault();

    fetch(`http://localhost:3000/addweightg?authkey=${authkey}`, {
        method: 'POST',
        body: JSON.stringify({ number: newnum }),
        headers: { 'Content-Type': 'application/json' }
    }).then(async resu => {
        hidepopup('weightgOverlay')
        let weightgText = document.getElementById('addweightg')
        let results = await resu.json()
        weightgText.textContent = results.new + ' KG'
    })
})