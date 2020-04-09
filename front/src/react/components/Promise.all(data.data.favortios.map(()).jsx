
const fn = () => {
  return Promise.all(data.data.favortios.map(async (favorito) => {
    await
      Axios.get(`${favorito}`)
        .then(data => data.data)
  }))
    .then(data => setFavorito(data))
}

const fn = async (arr, favoritos = []) => {
  favoritos = await arr.map(fav => {
    Axios.get(`${fav}`).then(data => data.data)
  })
  return favoritos
}