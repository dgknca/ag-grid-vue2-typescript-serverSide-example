<template>
  <div>
    <apexchart width="610" height="180" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import VueApexCharts from "vue-apexcharts";
import ApexChartProperties from "@/mixins/apexChartProperties.ts";

@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class ApexChart extends Mixins(ApexChartProperties) {}
</script>
