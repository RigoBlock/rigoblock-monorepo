import fetch from 'node-fetch'

const getData = async () => {
  const response = await fetch(
    'https://cryptopanic.com/api/posts/?auth_token=5b3f861c261e7e6243a55dc7b7ca600832156886&public=true&filter=hot&currencies=EDO'
  )

  console.log(response.status)
}

getData()
