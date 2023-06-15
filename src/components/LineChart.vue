<template>
  <div>
    <div class="filter-container">
      <label for="year-select">Select Year:</label>
      <select
        id="year-select"
        v-model="selectedYear"
        @change="updateChart"
      >
        <option
          v-for="year in availableYears"
          :key="year"
          :value="year"
        >{{ year }}</option>
      </select>
    </div>
    <div class="canvas-container">
      <canvas ref="lineChart"></canvas>
    </div>
  </div>
</template>


<script>
import { Chart, registerables } from "chart.js";
import axios from "axios";
import { onMounted, ref } from "vue";
import moment from "moment";

export default {
  setup() {
    const lineChart = ref({ chart: null });
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");
    const availableYears = ref([]);
    const selectedYear = ref(null);

    onMounted(() => {
      fetchDataAndCreateChart();
    });

    const date = (value) => {
      return moment(value).format("DD-MM-YYYY");
    };

    const fetchDataAndCreateChart = async () => {
      try {
        if (userRole === "1") {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/surat-validasi?validasi=1"
          );
          if (Array.isArray(response.data.data)) {
            availableYears.value = getAvailableYears(response.data.data);
            selectedYear.value = availableYears.value[0];
            const chartData = getChartData(
              response.data.data,
              selectedYear.value
            );
            createLineChart(chartData);
          } else {
            throw new Error("Data response is not an array.");
          }
        } else {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/surat-validasiuid?validasi=1&user_id=${userId}`
          );
          if (Array.isArray(response.data.data)) {
            availableYears.value = getAvailableYears(response.data.data);
            selectedYear.value = availableYears.value[0];
            const chartData = getChartData(
              response.data.data,
              selectedYear.value
            );
            createLineChart(chartData);
          } else {
            throw new Error("Data response is not an array.");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    const createLineChart = (chartData) => {
      const ctx = lineChart.value.getContext("2d");

      Chart.register(...registerables);

      lineChart.value.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Surat Keluar",
              data: chartData.data,
              fill: true,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Bulan",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Jumlah Surat",
              },
              min: 0,
              max: 10,
            },
          },
        },
      });
    };

    const getChartData = (data, year) => {
      const monthlyData = {};

      data.forEach((surat) => {
        const month = moment(surat.tgl_awal).format("MMMM");
        const suratYear = moment(surat.tgl_awal).year();
        if (suratYear === year) {
          if (monthlyData[month]) {
            monthlyData[month]++;
          } else {
            monthlyData[month] = 1;
          }
        }
      });

      const labels = Object.keys(monthlyData).sort((a, b) => {
        const monthA = moment().month(a).format("M");
        const monthB = moment().month(b).format("M");
        return monthA - monthB;
      });

      const dataPoints = labels.map((label) => monthlyData[label] || 0);

      return {
        labels,
        data: dataPoints,
      };
    };

    const getAvailableYears = (data) => {
      const years = new Set();
      data.forEach((surat) => {
        const year = moment(surat.tgl_awal).year();
        years.add(year);
      });
      return Array.from(years)
        .sort((a, b) => b - a)
        .slice(0, 3);
    };

    const updateChart = async () => {
      try {
        if (lineChart.value.chart) {
          lineChart.value.chart.destroy();
        }
        if (userRole === "1") {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/surat-validasiyears?validasi=1&tahun=${selectedYear.value}`
          );
          if (Array.isArray(response.data.data)) {
            const chartData = getChartData(
              response.data.data,
              selectedYear.value
            );
            createLineChart(chartData);
          } else {
            throw new Error("Data response is not an array.");
          }
        } else {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/surat-validasiyearsuid?validasi=1&tahun=${selectedYear.value}&user_id=${userId}`
          );
          if (Array.isArray(response.data.data)) {
            const chartData = getChartData(
              response.data.data,
              selectedYear.value
            );
            createLineChart(chartData);
          } else {
            throw new Error("Data response is not an array.");
          }
        }
        // Mengambil data berdasarkan tahun yang dipilih
      } catch (error) {
        console.error(error);
      }
    };

    return {
      lineChart,
      date,
      availableYears,
      selectedYear,
      updateChart,
    };
  },
};
</script>

<style>
.canvas-container {
  overflow: hidden;
}

canvas {
  width: 100%;
  height: 50%;
}

.filter-container {
  margin-bottom: 10px;
}
</style>
