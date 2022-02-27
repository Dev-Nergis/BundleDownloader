import got from 'got'

const getBundlesPath = (resourcePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await got.get(resourcePath).json()
      const bundles = response.resources.filter(isBundlePath)
      resolve(bundles)
    } catch (error) {
      reject(error)
    }
  })
}

const isBundlePath = (element) => {
  if (element['resource_path'].endsWith('.bundle')) {
    return true
  }
}

export default getBundlesPath