const url_in_session = 'http://localhost:3000/user/';
const url_get_team = 'http://localhost:3000/teams/';
var token = ""

async function logInPokeapi(user, passwd) {
	let credentials = btoa(`${user}:${passwd}`);
	return new Promise((resolve) => {
		fetch(url_in_session, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${credentials}`
			}
		}).then((res) => {
			// @ts-ignore
			res.json().then((body) => {
				resolve(body.Jwt);
			});
		});
	});
}

// funcion mediadora para determinar si ya tenemos el token y no realizar 
// logins en la DB innecesarios
async function getSessionToken(user, passwd){
    if (token !== "" && token !== undefined) {
        return new Promise(resolve => resolve(token))
    }
    return logInPokeapi(user, passwd)
}

// Funcion para traer la informacion del usuario (team, nombre, id) desde la pokeapi
export async function getUserInfo(user, passwd) {
	return new Promise((resolve, reject) => {
		getSessionToken(user, passwd).then((tk) => {
            token = tk
			console.log(token);
			fetch(url_get_team, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}).then((res) => {
				if (!res.ok) {
					reject('Error al iniciar sesion');
				}
				// @ts-ignore
				res.json().then((body) => {
					resolve(body);
				});
			});
		});
	});
}
