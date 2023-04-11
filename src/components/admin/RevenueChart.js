import React, { Component, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { converter } from "../../utils/ethConverter";
import { useAppContext } from "src/context-api/appContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

export default function RevenueChart() {
  const { state } = useAppContext();
  const [totalAmount, setTotalAmount] = useState(null);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  useEffect(() => {
    if (state.recurringRevenue && state.recurringRevenue.length > 0) {
      let amount = 0;
      state.recurringRevenue.map((item) => {
        amount += item.dayWiseAmount;
      });
      setTotalAmount(converter(amount, "wei", "eth"));
    }
  }, [state]);
  const options = {
    responsive: true,
    plugins: {
      //   legend: {
      //     position: "top",
      //   },
      //   title: {
      //     display: true,
      //     text: "Chart.js Line Chart",
      //   },
    },
  };

  const chartData = {
    labels:
      state.recurringRevenue &&
      state.recurringRevenue.map((item) =>
        moment(item.date).format("DD-MM-YYYY")
      ),
    datasets: [
      {
        label: "Recurring Revenue",
        data:
          state.recurringRevenue &&
          state.recurringRevenue.map((item) =>
            converter(item?.dayWiseAmount, "wei", "eth")
          ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Box height={"auto"} overflow={"auto"}>
      <Typography variant="h6">Recurring Revenue</Typography>
      <Typography variant="h3" sx={{ color: "blue" }}>
        {totalAmount} ETH
      </Typography>
      <Line options={options} data={chartData} />
    </Box>
  );
}
