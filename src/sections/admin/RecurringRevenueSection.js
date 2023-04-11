import { Box } from "@mui/system";
import React from "react";
import { Container } from "@mui/material";
import { getRevenueDetail, getRevenue } from "../../apis";
import { RecurringRevenue, RevenueChart } from "../../components/admin";
import { queryParamFormatter } from "../../utils/queryStringFormetter";
import { useAppContext } from "src/context-api/appContext";

function RecurringRevenueSection() {
  const { dispatch } = useAppContext();

  const getRevenueDetailData = async () => {
    const result = await getRevenueDetail();
    if (result?.data?.data) {
      dispatch({ type: "REVENUE_DETAIL", value: result?.data?.data });
    }
  };
  const getRevenueData = async () => {
    const result = await getRevenue();
    if (result?.data?.data) {
      dispatch({ type: "RECURRING_REVENUE", value: result?.data?.data });
    }
  };

  React.useEffect(async () => {
    await getRevenueData();
    await getRevenueDetailData();
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1300px",
        mt: "60px",
        mb: "120px",

        height: "auto",
      }}
    >
      <Box width="100%" height="auto" mt={6}>
        <RevenueChart />
        <Box sx={{ pt: 5 }}>
          <RecurringRevenue />
        </Box>
      </Box>
    </Container>
  );
}

export default RecurringRevenueSection;
