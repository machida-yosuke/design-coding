import { filter, includes } from 'lodash'
import sketchData from '~/assets/json/DesignCoding.json'
export default function getSkechData(name) {
  const data = filter(sketchData, (item) => {
    return includes(item.title, name)
  })
  return data[0]
}
