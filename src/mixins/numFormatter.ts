import { Component, Vue } from 'vue-property-decorator'

@Component
class NumFormatter extends Vue {
  public numFormatter(value: number): string {
    const num =
      Math.abs(value) > 999
        ? Math.sign(value) * parseFloat((Math.abs(value) / 1000).toFixed(1)) +
          'k'
        : Math.sign(value) * Math.abs(value)

    return num.toString()
  }
}
export default NumFormatter
