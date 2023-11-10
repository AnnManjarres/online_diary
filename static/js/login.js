let username = document.querySelector('#username')
let password = document.querySelector('#password')

function loginUser(e) {
    e.preventDefault()
    if(username.value == '' || password.value == ''){
        alert('Los campos no pueden estar vacios')
    } else {
        axios.post('/auth/login', {
            username: username.value,
            password: password.value
        })
        .then((res) => {
            if(res.request.status == 200) {
                window.location.href = '/entries/home'
            }
        })
        .catch((err) => alert("Verifique usuario y contrasena"))
    }
}