<template>
  <div>
    <ag-grid-vue
      style="width: 1100px; height: 500px;"
      class="ag-theme-alpine"
      :rowData="rowData"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      :headerHeight="headerHeight"
      :modules="modules"
      :rowModelType="rowModelType"
      :cacheOverflowSize="cacheOverflowSize"
      :maxConcurrentDatasourceRequests="maxConcurrentDatasourceRequests"
      :infiniteInitialRowCount="infiniteInitialRowCount"
      :maxBlocksInCache="maxBlocksInCache"
      :cacheBlockSize="cacheBlockSize"
      @grid-ready="onGridReady"
      @cell-clicked="onCellClicked"
    ></ag-grid-vue>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import { AgGridVue } from "ag-grid-vue";
import { LicenseManager } from "@ag-grid-enterprise/core";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";

import FetchData from "@/mixins/fetchData.ts";
import NumFormetter from "@/mixins/numFormatter.ts";

import SVGVolume from "@/svg/svg-volume.vue";
import SVGStar from "@/svg/svg-star.vue";

@Component({
  components: {
    AgGridVue,
    SVGVolume,
    SVGStar
  }
})
export default class Home extends Mixins(FetchData, NumFormetter) {
  columnDefs: any = null;
  rowData: any = null;
  gridApi: any = null;
  columnApi: any = null;
  defaultColDef: any = null;
  headerHeight: any = null;
  icons: any = null;
  cacheOverflowSize: any = null;
  cacheBlockSize: any = null;
  maxConcurrentDatasourceRequests: any = null;
  infiniteInitialRowCount: any = null;
  maxBlocksInCache: any = null;
  rowModelType: any = null;
  modules = [ServerSideRowModelModule];

  beforeMount() {
    this.rowModelType = "serverSide";
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1;
    this.maxBlocksInCache = 10;
    this.cacheBlockSize = 20;
    this.headerHeight = 38;

    this.defaultColDef = {
      editable: false,
      sortable: false,
      unSortIcon: true,
      filter: false,
      resizable: false,
      minWidth: 110
    };

    this.columnDefs = [
      {
        headerName: "keywords",
        headerClass: "header-text-left",
        field: "keyword",
        width: 150,
        suppressSizeToFit: true,
        pinned: "left",
        cellClass: "grid-cell-keywords"
      },
      {
        headerName: "search volume",
        field: "avgSearchVolume",
        width: 170,
        suppressSizeToFit: true,
        cellRenderer: this.searchVolumeRenderer,
        cellClass: "grid-cell-searchvolume"
      },
      {
        headerName: "rank",
        field: "rank",
        cellRenderer: this.rankRenderer,
        cellClass: "grid-cell-rank"
      },
      {
        headerName: "change",
        field: "diffRank",
        cellRenderer: this.diffRenderer,
        cellClass: "grid-cell-diff grid-cell-diffRank"
      },
      {
        headerName: "px rank",
        field: "pixelRank",
        cellRenderer: this.pixelRankRenderer,
        cellClass: "grid-cell-pixelRank"
      },
      {
        headerName: "change",
        field: "diffPixelRank",
        cellRenderer: this.diffRenderer,
        cellClass: "grid-cell-diff grid-cell-diffPixelRank"
      },
      {
        headerName: "url page",
        field: "landingPage",
        width: 300,
        flex: 1,
        suppressSizeToFit: true,
        headerClass: "header-text-left",
        cellRenderer: this.urlPageRenderer,
        cellClass: "grid-cell-urlpage"
      },
      {
        headerName: "cpc - $",
        field: "cpc",
        cellRenderer: this.cpcRenderer,
        cellClass: "grid-cell-centered"
      }
    ];
  }

  public onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();

    LicenseManager.setLicenseKey(
      "For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-7_November_2020_[v2]_MTYwNDcwNzIwMDAwMA==e092019c061c6f309c36d9ef6026a1b6"
    );

    this.fetchData(
      "http://95.217.76.23:5454/api/list_keyword_info_for_domain",
      '{"firstDate": "2020-02-25", "lastDate": "2020-02-20", "domain":"akakce.com", "limit":"200", "page": 3 }'
    ).then(res => this.updateData(res));
  }

  public updateData(data: any): any {
    const fakeServer = this.createFakeServer(data);
    const datasource = this.createServerSideDatasource(fakeServer);
    this.gridApi.setServerSideDatasource(datasource);
  }

  public createServerSideDatasource(server: any): any {
    return {
      getRows: function(params: any) {
        console.log("[Datasource] - rows requested by grid: ", params.request);
        const response = server.getData(params.request);
        setTimeout(function() {
          if (response.success) {
            params.successCallback(response.rows, response.lastRow);
          } else {
            params.failCallback();
          }
        }, 500);
      }
    };
  }

  public createFakeServer(allData: any): any {
    return {
      getData: (request: any) => {
        const requestedRows = allData.slice(request.startRow, request.endRow);
        const lastRow = this.getLastRowIndex(request, requestedRows);
        return {
          success: true,
          rows: requestedRows,
          lastRow: lastRow
        };
      }
    };
  }

  public getLastRowIndex(request: any, results: any): any {
    if (!results) return undefined;
    const currentLastRow = request.startRow + results.length;
    return currentLastRow < request.endRow ? currentLastRow : undefined;
  }

  public onCellClicked(event: any): void {
    if (
      event.column.colId == "keyword" ||
      event.column.colId == "avgSearchVolume"
    ) {
      this.$store.state.clickedKeywords = event.node.data.keyword;

      this.fetchData(
        "http://95.217.76.23:5454/api/get_specific_search_volume",
        `{"country": "tr", "lang": "tr", "keyword": "${event.node.data.keyword}" }`
      ).then(res => {
        this.$store.commit("setSeries", res);
        this.$store.commit("setCategories", res);
        this.$store.state.isChartModalActive = true;
      });
    }
  }

  /* 
  =======================
      Cell Renderers
  ======================= 
  */

  public searchVolumeRenderer(params: any): string {
    const value = params.value;
    const ComponentClass = Vue.extend(SVGVolume);
    const icon = new ComponentClass().$mount().$el;
    const wrapper = document.createElement("span");
    wrapper.appendChild(icon);

    if (value < 1000) {
      wrapper.classList.add("vol1");
    } else if (value >= 1000 && value <= 10000) {
      wrapper.classList.add("vol2");
    } else if (value >= 10000 && value <= 50000) {
      wrapper.classList.add("vol3");
    } else if (value >= 50000 && value <= 100000) {
      wrapper.classList.add("vol4");
    }

    const transporterDiv = document.createElement("div");
    transporterDiv.appendChild(wrapper);

    return transporterDiv.innerHTML + value;
  }

  public rankRenderer(params: any): string {
    const ComponentClass = Vue.extend(SVGStar);
    const icon = new ComponentClass().$mount().$el;
    const value = params.value;
    const transporterDiv = document.createElement("div");
    transporterDiv.appendChild(icon);

    return value + transporterDiv.innerHTML;
  }

  public pixelRankRenderer(params: any): string {
    return this.numFormatter(params.value);
  }

  public diffRenderer(params: any): string {
    return params.value;
  }

  public urlPageRenderer(params: any): string {
    return `<a href="${params.value}" target="_blank">${params.value}</a>`;
  }

  public cpcRenderer(params: any): string {
    return params.value.toFixed(2);
  }
}
</script>

<style lang="scss">
</style>
