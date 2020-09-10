import { Component, Mixins } from 'vue-property-decorator'
import CellRenderers from '@/mixins/cellRenderers.ts'
import FetchData from '@/mixins/fetchData.ts'

@Component
class AgGridProperties extends Mixins(CellRenderers, FetchData) {
  columnDefs: any = null
  rowData: any = null
  gridApi: any = null
  columnApi: any = null
  defaultColDef: any = null
  headerHeight: any = null
  icons: any = null
  pageSize = '20'
  pagination = true

  beforeMount() {
    this.columnDefs = [
      {
        headerName: 'keywords',
        headerClass: 'header-text-left',
        field: 'keyword',
        width: 150,
        suppressSizeToFit: true,
        pinned: 'left',
        sortable: false,
        cellClass: 'grid-cell-keywords'
      },
      {
        headerName: 'search volume',
        field: 'avgSearchVolume',
        width: 170,
        suppressSizeToFit: true,
        cellRenderer: this.searchVolumeRenderer,
        cellClass: 'grid-cell-searchvolume'
      },
      {
        headerName: 'rank',
        field: 'rank',
        cellRenderer: this.rankRenderer,
        cellClass: 'grid-cell-rank'
      },
      {
        headerName: 'change',
        field: 'diffRank',
        cellRenderer: this.diffRenderer,
        cellClass: 'grid-cell-diff grid-cell-diffRank'
      },
      {
        headerName: 'px rank',
        field: 'pixelRank',
        cellRenderer: this.pixelRankRenderer,
        cellClass: 'grid-cell-pixelRank'
      },
      {
        headerName: 'change',
        field: 'diffPixelRank',
        cellRenderer: this.diffRenderer,
        cellClass: 'grid-cell-diff grid-cell-diffPixelRank'
      },
      {
        headerName: 'url page',
        field: 'landingPage',
        sortable: false,
        width: 300,
        flex: 1,
        suppressSizeToFit: true,
        headerClass: 'header-text-left',
        cellRenderer: this.urlPageRenderer,
        cellClass: 'grid-cell-urlpage'
      },
      {
        headerName: 'cpc - $',
        field: 'cpc',
        cellRenderer: this.cpcRenderer,
        cellClass: 'grid-cell-centered'
      }
    ]

    this.defaultColDef = {
      editable: false,
      sortable: true,
      unSortIcon: true,
      filter: false,
      resizable: false,
      minWidth: 110
    }

    this.headerHeight = 38

    this.icons = {
      sortUnSort:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#E3E3FC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#E3E3FC" /></svg>',
      sortAscending:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#9999CC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#E3E3FC" /></svg>',
      sortDescending:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#E3E3FC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#9999CC" /></svg>'
    }

    this.fetchData(
      'http://95.217.76.23:5454/api/list_keyword_info_for_domain',
      '{"firstDate": "2020-02-25", "lastDate": "2020-02-20", "domain":"akakce.com", "limit":"100", "page": 3 }'
    ).then(res => (this.rowData = res))
  }

  public onGridReady(params: any): void {
    this.gridApi = params.api
    this.gridApi.sizeColumnsToFit()
  }

  public onCellClicked(event: any): void {
    if (
      event.column.colId == 'keyword' ||
      event.column.colId == 'avgSearchVolume'
    ) {
      this.$store.state.clickedKeywords = event.node.data.keyword

      this.fetchData(
        'http://95.217.76.23:5454/api/get_specific_search_volume',
        `{"country": "tr", "lang": "tr", "keyword": "${event.node.data.keyword}" }`
      ).then(res => {
        this.$store.commit('setSeries', res)
        this.$store.commit('setCategories', res)
        this.$store.state.isChartModalActive = true
      })
    }
  }

  // public onBtnExport() {
  //   this.gridApi.exportDataAsCsv({
  //     suppressQuotes: 'none',
  //     columnSeparator: 'none',
  //     customHeader: 'none',
  //     customFooter: 'none'
  //   })
  // }
}

export default AgGridProperties
