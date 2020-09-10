import { Component, Mixins, Watch } from 'vue-property-decorator'
import FetchData from '@/mixins/fetchData.ts'
import NumFormetter from '@/mixins/numFormatter.ts'

@Component
class ApexChartProperties extends Mixins(FetchData, NumFormetter) {
  series: any = this.getseries
  options: any = {
    chart: {
      id: 'vuechart-example',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: this.getcategories,
      labels: {
        offsetY: 5
      }
    },
    colors: ['#9999CC'],
    dataLabels: {
      enabled: false
    },
    yaxis: {
      labels: {
        style: {
          cssClass: 'apexcharts-yaxis-label'
        },
        formatter: this.numFormatter
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '45%'
      }
    }
  }

  @Watch('getseries')
  updateSeries(newVal: string) {
    this.series = newVal
  }

  @Watch('getcategories')
  updateCategories(newVal: string) {
    this.options = {
      xaxis: {
        categories: newVal
      }
    }
  }

  public get getseries(): any {
    return this.$store.getters.series
  }
  public get getcategories(): any {
    return this.$store.getters.categories
  }
}

export default ApexChartProperties
