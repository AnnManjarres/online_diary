let content = document.querySelector('#content')

function logoutUser() {
    axios.post('/auth/logout')
    .then((res) => {
        window.location.href = '/'
    })
    .catch(err => console.log(err))
}

function addNewEntry(e) {
    e.preventDefault()
    if(content.value == '') {
        alert('La entrada de diario no puede estar vacia.')
    } else {
        axios.post('/entries', {
            content: content.value
        })
        .then((res) => {
            if(res.status == 200) {
                window.location.href = '/entries/home'
            }
        })
        .catch((err) => {console.log(err)})
    }

}

function getSingleEntry(id) {
    axios.get(`/entries/singleEntry/${id}`)
    .then((res) => {
        window.location.href = `/entries/singleEntry/${id}`
    })

}

function editEntry(e, id) {
    e.preventDefault()
    if(content.value == '') {
        console.log(id)
    } else {
        axios.put('/entries/edit', {
            id: id,
            content: content.value
        })
        .then((res) => {
            if(res) {
                window.location.href = '/entries/home'
            }
        })
        .catch((err) => {console.log(err)})
    }

}

function deleteEntry(id) {
    console.log(id)
    let choice = confirm("Desea eliminar esta entrada?")
    if(choice) {
        axios.delete('/entries/delete', {data: {
            id: id
        }})
        .then((res) => {
            window.location.href = '/entries/home'
        })
        .catch((err) => {console.log(err)})

    }
}