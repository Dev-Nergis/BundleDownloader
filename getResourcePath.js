import got from 'got'

const getResourcePath = (appId, appVersion, apiVersion) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await got.post(`https://api-pub.nexon.com/patch/${apiVersion}/version-check`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-A908N Build/LMY49I)",
          "Host": "api-pub.nexon.com",
          "Connection": "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
        json: {
          "market_game_id": appId,
          "language": "en",
          "advertising_id": "00000000-0000-0000-0000-000000000000",
          "market_code": "playstore",
          "country": "US",
          "sdk_version": "187",
          "curr_build_version": appVersion,
          "curr_build_number": appVersion.split('.')[2],
          "curr_patch_version": 0,
        }
      }).json()
      resolve(response.patch['resource_path'])
    } catch (error) {
      reject(error)
    }
  })
}

export default getResourcePath