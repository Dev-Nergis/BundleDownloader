import gplay from 'google-play-scraper'

const getAppVersion = (appId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let googlePlayStoreAppData = await gplay.app({
        appId: appId
      })
      resolve(googlePlayStoreAppData.version)
    } catch (error) {
      reject(error)
    }
  })
}

export default getAppVersion