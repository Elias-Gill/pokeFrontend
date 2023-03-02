<script>
	import { Image, Button } from 'sveltestrap';
	import { getUserInfo } from '../static/serverFuncs.js';
	let user = 'Elias';
	let password = '123';

	// estructura de la llamada a la pokeapi
	let userInfo = {
		id: '',
		UserName: '',
		Team: []
	};
	async function getFromPokeapi() {
		getUserInfo(user, password).then((res) => {
			userInfo = res;
			console.log(userInfo);
		});
	}
</script>

<h1>{userInfo.UserName}</h1>
{#each userInfo.Team as pokemon}
    <Image thumbnail src={pokemon.sprites.other['official-artwork'].front_default} class="img-thumbnail"/>
{/each}
<Button on:click={getFromPokeapi}>clickeame kp</Button>
