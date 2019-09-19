const xhr = new XMLHttpRequest();
function getFun(email) {
    console.log(email);

    xhr.open('DELETE', '/user/deleteUser');

    let jsonData = JSON.stringify(
        {
            email: email
        });
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(jsonData);

    xhr.responseType = 'json';
    xhr.onload = () => {
        let message = xhr.response.message;
        console.log(xhr.response);
        alert(message);
    }
}