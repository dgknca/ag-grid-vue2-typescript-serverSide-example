import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    series: [
      {
        name: 'volumes',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // to avoid console errors
      }
    ],
    categories: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // to avoid console errors
    isChartModalActive: false,
    clickedKeywords: ''
  },
  getters: {
    series(state) {
      return state.series
    },
    categories(state) {
      return state.categories
    }
  },
  mutations: {
    setSeries(state, newSeries) {
      const newData = newSeries.map((p: any) => p.volume)
      state.series = [
        {
          name: 'volumes',
          data: newData
        }
      ]
    },
    setCategories(state, newCategories) {
      const categoriesArr: any = []

      const datesArr = newCategories.map((p: any) => p.date)

      datesArr.forEach((p: any) => {
        // console.log(p.slice(5, 7)) //"2018-08-01" => 08
        if (p.slice(5, 7) == '01') {
          categoriesArr.push('JAN')
        } else if (p.slice(5, 7) == '02') {
          categoriesArr.push('FEB')
        } else if (p.slice(5, 7) == '03') {
          categoriesArr.push('MAR')
        } else if (p.slice(5, 7) == '04') {
          categoriesArr.push('APR')
        } else if (p.slice(5, 7) == '05') {
          categoriesArr.push('MAY')
        } else if (p.slice(5, 7) == '06') {
          categoriesArr.push('JUN')
        } else if (p.slice(5, 7) == '07') {
          categoriesArr.push('JUL')
        } else if (p.slice(5, 7) == '08') {
          categoriesArr.push('AUG')
        } else if (p.slice(5, 7) == '09') {
          categoriesArr.push('SEP')
        } else if (p.slice(5, 7) == '10') {
          categoriesArr.push('OCT')
        } else if (p.slice(5, 7) == '11') {
          categoriesArr.push('NOV')
        } else if (p.slice(5, 7) == '12') {
          categoriesArr.push('DEC')
        }
      })

      state.categories = categoriesArr
    }
  },
  actions: {}
})
