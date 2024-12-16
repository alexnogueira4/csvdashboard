import { parseStringPromise } from 'xml2js'

export async function converXmlToJson(xml: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const sanitizedXmlContent = xml.replace(
      /&(?!(amp|lt|gt|quot|apos);)/g,
      '&amp;'
    )

    try {
      const jsonData = await parseStringPromise(sanitizedXmlContent, {
        normalizeTags: true,
        normalize: true,
      })

      resolve(jsonData)
    } catch (error) {
      console.error('Error parsing XML', error)
      reject('Error parsing XML')
    }
  })
}
