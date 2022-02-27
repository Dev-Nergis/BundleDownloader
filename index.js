import getAppVersion from './getAppVersion.js'
import getResourcePath from './getResourcePath.js'
import getBundlesPath from './getBundlesPath.js'
import fs from 'fs'
import got from 'got'

const main = async () => {
  const config = JSON.parse(await fs.promises.readFile('./config/config.json'))
  if (!fs.existsSync(config.bundlesDirecotry)) fs.promises.mkdir(config.bundlesDirecotry)
  const appVersion = await getAppVersion(config.appId)
  const resourcePath = await getResourcePath(config.appId, appVersion, config.apiVersion)
  const defaultResourcePath = resourcePath.replace('resource-data.json', '')
  const bundles = await getBundlesPath(resourcePath)
  const bundlesLength = bundles.length
  for (const [index, bundle] of bundles.entries()) {
    let response = await got(defaultResourcePath + bundle.resource_path, {
      throwHttpErrors: false
    })
    if (response.statusCode === 200) {
      let filename = bundle.resource_path.split('/')
      filename = filename[filename.length - 1]
      let fileStream = fs.createWriteStream(config.bundlesDirecotry + '/' + filename)
      fileStream.on("finish", () => {
        console.log(`${index+1}/${bundlesLength} | ${filename}`)
      })
      fileStream.write(response.rawBody)
      fileStream.end()
    } else {
      console.log(response.statusCode)
    }
  }
}

main()