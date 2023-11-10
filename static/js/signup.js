let fullname = document.querySelector('#fullname')
let username = document.querySelector('#username')
let password = document.querySelector('#password')


function createNewUser(e) {
    e.preventDefault()
    if(fullname.value == '' || username.value == '' || password.value == '') {
        alert("Todos los campos deben estar llenos")
    }

    axios.post('/auth/signup', {
        fullname: fullname.value,
        username: username.value,
        password: password.value
    })
    .then((res) => {
        if(res.data.message == 'That username already exists') {
            alert("El usuario ya existe")
        } else {
            window.location.href = '/login'
        }
        
    })
    .catch((err) => {
        console.log(err)
    })

}