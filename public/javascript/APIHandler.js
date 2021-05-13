class APIHandler {
  constructor(baseUrl) {
    this.api = axios.create({ baseUrl });
  }

  // http://localhost:8000/characters

  getFullList = () => {
    return this.api.get("/characters");
  };
  // successCallback, errCallback) {
  // this.api.get("characters")
  // .then((characters) => {
  //   successCallback(characters);
  // })
  // .catch(errCallback);}

  // hhtp://localhost:8000/characters/4
  getOneRegister = (id) => {
    return this.api.get("/characters/" + id);
  };

  createOneRegister = (newCharac) => {
    this.api.post("/characters/", newCharac);
  };

  updateOneRegister = (updateCharacter, id) => {
   this.api.patch("/characters/" + id, updateCharacter);
  };

  deleteOneRegister = (id) => {
   this.api.delete("/characters/" + id);
  };
}
