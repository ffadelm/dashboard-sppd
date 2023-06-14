<template>
  <div class="canvas-container">
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import axios from "axios";
import { onMounted, ref } from "vue";
import moment from "moment";

export default {
  setup() {
    const lineChart = ref(null);
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

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
            const chartData = getChartData(response.data.data);
            createLineChart(chartData);
          } else {
            throw new Error("Data response is not an array.");
          }
        } else {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/surat-validasiuid?validasi=1&user_id=${userId}`
          );
          if (Array.isArray(response.data.data)) {
            const chartData = getChartData(response.data.data);
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

      Chart.register(...registerables); // Mendaftarkan semua elemen dan pengontrol yang diperlukan

      new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Surat Keluar",
              data: chartData.data,
              fill: false,
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
              min: 0, // Nilai minimum pada sumbu y
              max: 10, // Nilai maksimum pada sumbu y
            },
          },
        },
      });
    };

    const getChartData = (data) => {
      const monthlyData = {};

      data.forEach((surat) => {
        const month = moment(surat.tgl_awal).format("MMMM");
        if (monthlyData[month]) {
          monthlyData[month]++;
        } else {
          monthlyData[month] = 1;
        }
      });

      const labels = Object.keys(monthlyData).sort((a, b) => {
        const monthA = moment().month(a).format("M");
        const monthB = moment().month(b).format("M");
        return monthA - monthB;
      });

      const dataPoints = labels.map((label) => monthlyData[label]);

      return {
        labels,
        data: dataPoints,
      };
    };

    return {
      lineChart,
      date,
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
</style>
