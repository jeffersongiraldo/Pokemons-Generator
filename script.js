let body = document.querySelector('#body');
let cont = 0;
function changeImage() { // Funcion para cambiar imagen de fondo
  cont = cont % 5;
  if (cont === 0) {
    body.style.backgroundImage = 'url(./assets/wallpaper-pokeball1.jpg)';
  }
  else if (cont === 1) {
    body.style.backgroundImage = 'url(./assets/wallpaper-pokeballs.png)';
  } 
  else if (cont === 2) {
    body.style.backgroundImage = 'url(./assets/wallpaper-pokemon-desktop.jpg)';
  }
  else if (cont === 3) {
    body.style.backgroundImage = 'url(./assets/wallpaper-pokeball2.png)';
  } 
  else {
    body.style.backgroundImage = 'url(./assets/wallpaper-1.jpg)';
  }
  cont++;
}
function startProcess() {
  setInterval(changeImage, 3000);
}
window.onload = startProcess();


// Funcionalidad para generar Pokemons 

btnGenerate.addEventListener('click', () => {
  const randomNumbers = [];
  const numbers = [];
  let btnGenerate = document.querySelector('#btnGenerate');
  for (let i = 0; i < 10; i++) { // Ciclo para generar un array con 10 numeros aleatorios
    let number = Math.floor(Math.random()*600);
    randomNumbers.push(number)
  } 
  
  for (let i = 0; i < 3; i++) { // Ciclo para generar un array nuevo con 3 numeros seleccionados del array anterior
    let number = randomNumbers[Math.floor(Math.random()*10)];
    numbers.push(number);
  }

  // Se hace el fetch del api con los 3 numeros seleccionados 
  let pokemon1 = fetch(`https://pokeapi.co/api/v2/pokemon/${numbers[0]}`).then(response => response.json());
  let pokemon2 = fetch(`https://pokeapi.co/api/v2/pokemon/${numbers[1]}`).then(response => response.json());
  let pokemon3 = fetch(`https://pokeapi.co/api/v2/pokemon/${numbers[2]}`).then(response => response.json());
  
  // Se crea la variable que va a contener los pokemons
  let ctnPokemons = document.getElementById('ctnPokemons');

  /* // Codigo si quiero mostrar el primer pokemon que llegue
  Promise.race([pokemon1, pokemon2, pokemon3])
    .then(data1 => {
      console.log(data1);
      let data = [data1] 
      for(let i = 0; i < data.length; i++) {
        let element = data[i];
        console.log(element)
        let boxPokemon = document.createElement('div');
        boxPokemon.setAttribute('class', 'boxPokemon');
        let namePokemon = document.createElement('h3');
        namePokemon.setAttribute('class', 'titlePokemon')
        namePokemon.textContent = element.name + '&' + element.id;
        let imgPokemon = document.createElement('img');
        imgPokemon.setAttribute('class', 'imgPokemon')
        imgPokemon.setAttribute('src', element.srpites.front_default);
  
        boxPokemon.appendChild(namePokemon);
        boxPokemon.appendChild(imgPokemon);
  
        ctnPokemons.appendChild(boxPokemon);
  
      }
    })
})
*/
 // Si quiero mostrar de a 3 pokemons sería...
 Promise.all([pokemon1, pokemon2, pokemon3])
  .then(data => {
    console.log(data); 
    for(let i = 0; i < data.length; i++) {
      let element = data[i];
      console.log(element)
      let boxPokemon = document.createElement('div');
      boxPokemon.setAttribute('class', 'boxPokemon');
      let namePokemon = document.createElement('h3');
      namePokemon.setAttribute('class', 'titlePokemon')
      namePokemon.textContent = element.name + '&' + element.id;
      let imgPokemon = document.createElement('img');
      imgPokemon.setAttribute('class', 'imgPokemon')
      imgPokemon.setAttribute('src', element.sprites.front_default);

      boxPokemon.appendChild(namePokemon);
      boxPokemon.appendChild(imgPokemon);

      ctnPokemons.appendChild(boxPokemon);

    }
  })
})


// Se crea la funcionalidad para limpiar los pokemons generados
let btnClear = document.getElementById('btnClear');
btnClear.addEventListener('click', () => {
  ctnPokemons.innerHTML = "";
})
