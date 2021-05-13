const charactersAPI = new APIHandler("http://localhost:3000");
console.log("-----Start-----");
console.log(charactersAPI);

const targetCharacters = document.querySelector("characters-container");

function displayCharacters(characters) {
  //  this one is supposed to loop through each character
  // and display infos in html
  targetCharacters.innerHTML = "";
  characters.forEach((charac) => {
    targetCharacters.innerHTML += `<div class="character-info">
    <div class="name">${charac.name}</div>
    <div class="occupation">${charac.occupation}</div>
    <div class="cartoon">${charac.cartoon}</div>
    <div class="weapon">${charac.weapon}</div>
</div>`;
  });
  console.log("super", characters);
}

function getCharacterObject(id) {
  const form = document.getElementById(id);
  const name = form.querySelector('[name="name"]');
  const occupation = form.querySelector('[name="occupation"]');
  const weapon = form.querySelector('[name="weapon"]');
  const cartoon = document.querySelector('[name="cartoon"]');
  return {
    name: name.value,
    occupation: occupation.value,
    weapon: weapon.value,
    cartoon: cartoon.checked,
  };
}

function resetForm(id) {
  const form = document.getElementById(id);
  const inputs = form.querySelectorAll('[name]');
  inputs.forEach((input) =>
  Boolean(input.checked) ? (input.checked = false) : (input.value = "")
  );
}

window.addEventListener("load", () => {
  const buttonFetchAll = document.getElementById("fetch-all");
  buttonFetchAll.addEventListener("click", (event) => {
    charactersAPI
      .getFullList()
      .then((apiResult) => displayCharacters(apiResult.data))
      .catch((apiErr) => console.error((apiErr)));
  });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      const input = document.querySelector('[name="character-id"]');
      const foo = charactersAPI
        .getOneRegister(input.value)
        .then((characterResult) => displayCharacters([characterResult]))
        .catch();
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      const input = document.querySelector('[name="character-id-delete"]');
      charactersAPI
        .deleteOneRegister(input.value)
        .then((characterResult) => console.log(characterResult.data))
        .catch((apiError) => console.warn(apiError));
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const id = document.querySelector('([name="chr-id"]').value;
      const updateCharacter = getCharacterObject("edit-character-form");
      charactersAPI
        .updateOneRegister(updateCharacter, id)
        .then((characterResult) => resetForm("edit-character-form"))
        .catch((apiError) => console.warn(apiError));
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const newCharac = getCharacterObject("new-character-form");
      charactersAPI
      .createOneRegister(newCharac)
      .then((characterResult) => resetForm("done"))
      .catch((apiError => console.warn(apiError)));
    });
});
