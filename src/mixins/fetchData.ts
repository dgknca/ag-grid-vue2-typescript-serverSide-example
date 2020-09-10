import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component
class FetchData extends Vue {
  public async fetchData(url: string, req: string): Promise<boolean> {
    return await axios
      .post(url, req)
      .then(res => res.data)
      .catch(err => console.log(err))
  }
}
export default FetchData
