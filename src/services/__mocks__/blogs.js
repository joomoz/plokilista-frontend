let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "Luukkainen",
    likes: 1086,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a886753cdf6813019f1ccad",
    title: "This it title",
    author: "This is author",
    url: "https://blog.com",
    likes: 63,
    user: {
      adult: true,
      _id: "5a884b36376b1f1a194948a5",
      username: "mojo",
      name: "joonas moilanen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }