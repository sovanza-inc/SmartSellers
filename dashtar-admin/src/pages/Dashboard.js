import {
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  WindmillContext,
  TableBody,
  TableRow,
  Button,
  Input,
} from "@windmill/react-ui";
import LineChart from "components/chart/LineChart/LineChart";
import PieChart from "components/chart/Pie/PieChart";
import CardItem from "components/dashboard/CardItem";
import MagentoServices from "services/MagentoServices";
import CardItemTwo from "components/dashboard/CardItemTwo";
import ChartCard from "components/chart/ChartCard";
import OrderTable from "components/order/OrderTable";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
import { ImCreditCard, ImStack } from "react-icons/im";
import OrderServices from "services/OrderServices";
//internal import
import magentoLogo from '../assets/img/magento.png'; // Placeholder path
import zidLogo from '../assets/img/zid.webp'; // Placeholder path
import { FiEdit } from 'react-icons/fi';
import MagentoModel from "../Model/MagentoModel"
import Cookies from 'js-cookie';
import ZidServices from "services/ZidServices";

// Utility function to get admin ID from cookies
const getAdminIdFromCookie = () => {
  const adminInfo = Cookies.get('adminInfo');
  if (adminInfo) {
    const parsedAdminInfo = JSON.parse(adminInfo);
    return parsedAdminInfo._id; // Assuming _id is the adminId
  }
  return null; // Return null if adminId is not found
};

const Dashboard = () => {

  const [checkStatusMagento, setCheckStatusMagento] = useState(null);
  const [checkStatusZid, setCheckStatusZid] = useState(null);
// This state will hold the list of stores

useEffect(() => {
  // Fetch the stores initially and set them in state
  const fetchMagentoStores = async () => {
    try {
      const response = await MagentoServices.getStoresByUser();
      // Assuming the response is an array and you want the first store
      if (response && response.length > 0) {
        setCheckStatusMagento(response[0]); // Set the first store
      } else {
        // Handle the case where no stores are returned
        setCheckStatusMagento(null);
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
      // Handle error state appropriately
    }
  };

  const fetchZidStores = async () => {
    try {
      const response = await ZidServices.getStoresByUser();
      // Assuming the response is an array and you want the first store
      if (response && response.length > 0) {
        setCheckStatusZid(response[0]); // Set the first store
      } else {
        // Handle the case where no stores are returned
        setCheckStatusZid(null);
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
      // Handle error state appropriately
    }
  };

  fetchMagentoStores();
  fetchZidStores();
}, []);

  console.log(checkStatusMagento)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZidModalOpen, setIsZidModalOpen] = useState(false);
  const [selectedZidStore, setSelectedZidStore] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [adminId, setadminId] = useState(null);
  
  const handleActionClick = async (adminId) => {
    try {
    // Check if the adminId exists
    const storeData = await MagentoServices.getStoresByUser();
    if (storeData) {
      console.log(storeData)
      setSelectedStore(storeData); // Populate modal with existing data
      setIsModalOpen(true);
    } else {
      setSelectedStore(null); // Prepare for new entry
      setIsModalOpen(true);
    }
  } catch (error) {
    setSelectedStore(null);
    setIsModalOpen(true);
  }
   
  };

  const handleSaveStore = async (formData) => {
    try {
      if (selectedStore) {

        await MagentoServices.updateStore(selectedStore[0].adminId, formData);
      } else {
        // Adding adminId to formData
      const dataToSubmit = { ...formData, adminId : adminId, isActive: true, isSubscribed: true };
      console.log(adminId);
      // Call your API service here
      await MagentoServices.createStore(dataToSubmit);
      }
      alert('Store saved successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving store:', error);
      alert('Error saving store');
    }
  };

  const handleSaveStoreZid = async (formData) => {
    try {
      if (selectedStore) {

        await ZidServices.updateZid(selectedStore[0].adminId, formData);
      } else {
        // Adding adminId to formData
      const dataToSubmit = { ...formData, adminId : adminId, isActive: true, isSubscribed: true };
      console.log(adminId);
      // Call your API service here
      await ZidServices.createZid(dataToSubmit);
      }
      alert('Store saved successfully');
      setIsZidModalOpen(false);
    } catch (error) {
      console.error('Error saving store:', error);
      alert('Error saving store');
    }
  };

  const { globalSetting } = useFilter();
  const { mode } = useContext(WindmillContext);

  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);

  const { currentPage, handleChangePage, lang } = useContext(SidebarContext);

   // Example platform data (you would fetch or manage this dynamically in a real app)
   const platforms = [
    {
      id: 1,
      image: magentoLogo,
      name: 'Magento',
      description: 'E-commerce platform',
      active: false, // This could be dynamic based on your data
    },
    {
      id: 2,
      image: zidLogo,
      name: 'Zid',
      description: 'E-commerce platform',
      active: false, // This could be dynamic based on your data
    },
    // Add other platforms as needed
  ];

  // State to manage active/inactive status
  // In a real app, this would be dynamic based on data fetched from a server
  const [platformStatus, setPlatformStatus] = useState(platforms.map(platform => platform.active));

  // Handler to toggle platform active/inactive status
  const [showAlert, setShowAlert] = useState(false);

  // Modified togglePlatformStatus function
  const togglePlatformStatus = async (index) => {

    try {
      const { exists } = await MagentoServices.getAllStores();
      console.log(exists);
      if (!exists) {
        // Admin ID does not exist in Magento table, show alert
        setShowAlert(true);
      } else {
        // Proceed with your original logic for toggling status
        const newStatus = [...platformStatus];
        newStatus[index] = !newStatus[index];
        setPlatformStatus(newStatus);
        // Here you would also update the status in your backend or state management
        setShowAlert(false); // Hide alert if it was shown previously
      }
    } catch (error) {
      console.error("Error checking admin ID existence:", error);
      // Handle error as needed
    }
  };

  const toggleMagentoStatus = async (adminId, newStatus) => {
    try {
      // Prepare the payload with the new status
      const payload = { isActive: newStatus };
      
      // Call your API to update the isActive status
      await MagentoServices.updateStore(adminId, payload);
  
      // Update the local state to reflect the change
      setCheckStatusMagento(prevState => ({
        ...prevState,
        isActive: newStatus,
      }));
    } catch (error) {
      console.error('Error updating store status:', error);
      // Optionally handle the error state here
    }
  };
  
  const toggleZidStatus = async (adminId, newStatus) => {
    try {
      // Prepare the payload with the new status
      const payload = { isActive: newStatus };
      
      // Call your API to update the isActive status
      await ZidServices.updateZid(adminId, payload);
  
      // Update the local state to reflect the change
      setCheckStatusZid(prevState => ({
        ...prevState,
        isActive: newStatus,
      }));
    } catch (error) {
      console.error('Error updating store status:', error);
      // Optionally handle the error state here
    }
  };  


  // react hook
  const [todayOrderAmount, setTodayOrderAmount] = useState(0);
  const [yesterdayOrderAmount, setYesterdayOrderAmount] = useState(0);
  const [salesReport, setSalesReport] = useState([]);
  const [todayCashPayment, setTodayCashPayment] = useState(0);
  const [todayCardPayment, setTodayCardPayment] = useState(0);
  const [todayCreditPayment, setTodayCreditPayment] = useState(0);
  const [yesterdayCashPayment, setYesterdayCashPayment] = useState(0);
  const [yesterdayCardPayment, setYesterdayCardPayment] = useState(0);
  const [yesterdayCreditPayment, setYesterdayCreditPayment] = useState(0);

  const { data: bestSellerProductChart, loading: loadingBestSellerProduct } =
    useAsync(OrderServices.getBestSellerProductChart);

  const { data: dashboardRecentOrder, loading: loadingRecentOrder } = useAsync(
    () => OrderServices.getDashboardRecentOrder({ page: currentPage, limit: 8 })
  );

  const { data: dashboardOrderCount, loading: loadingOrderCount } = useAsync(
    OrderServices.getDashboardCount
  );

  const { data: dashboardOrderAmount, loading: loadingOrderAmount } = useAsync(
    OrderServices.getDashboardAmount
  );

  const currency = globalSetting?.default_currency || "$";

  // console.log("dashboardOrderCount", dashboardOrderCount);

  const { dataTable, serviceData } = useFilter(dashboardRecentOrder?.orders);

  const { t } = useTranslation();

  useEffect(() => {
    setadminId(getAdminIdFromCookie());
    // today orders show
    const todayOrder = dashboardOrderAmount?.ordersData?.filter((order) =>
      dayjs(order.updatedAt).isToday()
    );
    //  console.log('todayOrder',dashboardOrderAmount.ordersData)
    const todayReport = todayOrder?.reduce((pre, acc) => pre + acc.total, 0);
    setTodayOrderAmount(todayReport);

    // yesterday orders
    const yesterdayOrder = dashboardOrderAmount?.ordersData?.filter((order) =>
      dayjs(order.updatedAt).set(-1, "day").isYesterday()
    );

    const yesterdayReport = yesterdayOrder?.reduce(
      (pre, acc) => pre + acc.total,
      0
    );
    setYesterdayOrderAmount(yesterdayReport);

    // sales orders chart data
    const salesOrderChartData = dashboardOrderAmount?.ordersData?.filter(
      (order) =>
        dayjs(order.updatedAt).isBetween(
          new Date().setDate(new Date().getDate() - 7),
          new Date()
        )
    );

    salesOrderChartData?.reduce((res, value) => {
      let onlyDate = value.updatedAt.split("T")[0];

      if (!res[onlyDate]) {
        res[onlyDate] = { date: onlyDate, total: 0, order: 0 };
        salesReport.push(res[onlyDate]);
      }
      res[onlyDate].total += value.total;
      res[onlyDate].order += 1;
      return res;
    }, {});

    setSalesReport(salesReport);

    const todayPaymentMethodData = [];
    const yesterDayPaymentMethodData = [];

    // today order payment method
    dashboardOrderAmount?.ordersData?.filter((item, value) => {
      if (dayjs(item.updatedAt).isToday()) {
        if (item.paymentMethod === "Cash") {
          let cashMethod = {
            paymentMethod: "Cash",
            total: item.total,
          };
          todayPaymentMethodData.push(cashMethod);
        }

        if (item.paymentMethod === "Credit") {
          const cashMethod = {
            paymentMethod: "Credit",
            total: item.total,
          };

          todayPaymentMethodData.push(cashMethod);
        }

        if (item.paymentMethod === "Card") {
          const cashMethod = {
            paymentMethod: "Card",
            total: item.total,
          };

          todayPaymentMethodData.push(cashMethod);
        }
      }

      return item;
    });
    // yesterday order payment method
    dashboardOrderAmount?.ordersData?.filter((item, value) => {
      if (dayjs(item.updatedAt).set(-1, "day").isYesterday()) {
        if (item.paymentMethod === "Cash") {
          let cashMethod = {
            paymentMethod: "Cash",
            total: item.total,
          };
          yesterDayPaymentMethodData.push(cashMethod);
        }

        if (item.paymentMethod === "Credit") {
          const cashMethod = {
            paymentMethod: "Credit",
            total: item?.total,
          };

          yesterDayPaymentMethodData.push(cashMethod);
        }

        if (item.paymentMethod === "Card") {
          const cashMethod = {
            paymentMethod: "Card",
            total: item?.total,
          };

          yesterDayPaymentMethodData.push(cashMethod);
        }
      }

      return item;
    });

    const todayCsCdCit = Object.values(
      todayPaymentMethodData.reduce((r, { paymentMethod, total }) => {
        if (!r[paymentMethod]) {
          r[paymentMethod] = { paymentMethod, total: 0 };
        }
        r[paymentMethod].total += total;

        return r;
      }, {})
    );
    const today_cash_payment = todayCsCdCit.find(
      (el) => el.paymentMethod === "Cash"
    );
    setTodayCashPayment(today_cash_payment?.total);
    const today_card_payment = todayCsCdCit.find(
      (el) => el.paymentMethod === "Card"
    );
    setTodayCardPayment(today_card_payment?.total);
    const today_credit_payment = todayCsCdCit.find(
      (el) => el.paymentMethod === "Credit"
    );
    setTodayCreditPayment(today_credit_payment?.total);

    const yesterDayCsCdCit = Object.values(
      yesterDayPaymentMethodData.reduce((r, { paymentMethod, total }) => {
        if (!r[paymentMethod]) {
          r[paymentMethod] = { paymentMethod, total: 0 };
        }
        r[paymentMethod].total += total;

        return r;
      }, {})
    );
    const yesterday_cash_payment = yesterDayCsCdCit.find(
      (el) => el.paymentMethod === "Cash"
    );
    setYesterdayCashPayment(yesterday_cash_payment?.total);
    const yesterday_card_payment = yesterDayCsCdCit.find(
      (el) => el.paymentMethod === "Card"
    );
    setYesterdayCardPayment(yesterday_card_payment?.total);
    const yesterday_credit_payment = yesterDayCsCdCit.find(
      (el) => el.paymentMethod === "Credit"
    );
    setYesterdayCreditPayment(yesterday_credit_payment?.total);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardOrderAmount]);

  return (
    <>
      <PageTitle>{t("DashboardOverview")}</PageTitle>

      <div className="grid gap-4 mb-8 md:grid-cols-4 xl:grid-cols-4">
        <CardItemTwo
          mode={mode}
          currency={currency}
          title="Today Order"
          title2="TodayOrder"
          Icon={ImStack}
          cash={todayCashPayment || 0}
          card={todayCardPayment || 0}
          credit={todayCreditPayment || 0}
          price={todayOrderAmount || 0}
          className="text-white dark:text-green-100 bg-teal-500"
          loading={loadingOrderAmount}
        />

        <CardItemTwo
          mode={mode}
          currency={currency}
          title="Yesterday Order"
          title2="YesterdayOrder"
          Icon={ImStack}
          cash={yesterdayCashPayment || 0}
          card={yesterdayCardPayment || 0}
          credit={yesterdayCreditPayment || 0}
          price={yesterdayOrderAmount || 0}
          className="text-white dark:text-orange-100 bg-orange-400"
          loading={loadingOrderAmount}
        />

        <CardItemTwo
          mode={mode}
          currency={currency}
          title2="ThisMonth"
          Icon={FiShoppingCart}
          price={dashboardOrderAmount?.thisMonthlyOrderAmount || 0}
          className="text-white dark:text-green-100 bg-blue-500"
          loading={loadingOrderAmount}
        />

        <CardItemTwo
          mode={mode}
          currency={currency}
          title2="AllTimeSales"
          Icon={ImCreditCard}
          price={dashboardOrderAmount?.totalAmount || 0}
          className="text-white dark:text-green-100 bg-green-500"
          loading={loadingOrderAmount}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title="Total Order"
          Icon={FiShoppingCart}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalOrder || 0}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
        <CardItem
          title={t("OrderPending")}
          Icon={FiRefreshCw}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalPendingOrder?.count || 0}
          amount={dashboardOrderCount?.totalPendingOrder?.total || 0}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
        <CardItem
          title={t("OrderProcessing")}
          Icon={FiTruck}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalProcessingOrder || 0}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
        <CardItem
          title={t("OrderDelivered")}
          Icon={FiCheck}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalDeliveredOrder || 0}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 my-8">
        <ChartCard
          mode={mode}
          loading={loadingOrderAmount}
          title={t("WeeklySales")}
        >
          <LineChart salesReport={salesReport} />
        </ChartCard>

        <ChartCard
          mode={mode}
          loading={loadingBestSellerProduct}
          title={t("BestSellingProducts")}
        >
          <PieChart data={bestSellerProductChart} />
        </ChartCard>
      </div>

     

      <PageTitle>{t("RecentOrder")}</PageTitle>

      {/* <Loading loading={loading} /> */}

      {loadingRecentOrder ? (
        <TableLoading row={5} col={4} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("InvoiceNo")}</TableCell>
                <TableCell>{t("TimeTbl")}</TableCell>
                <TableCell>{t("CustomerName")} </TableCell>
                <TableCell> {t("MethodTbl")} </TableCell>
                <TableCell> {t("AmountTbl")} </TableCell>
                <TableCell>{t("OderStatusTbl")}</TableCell>
                <TableCell>{t("ActionTbl")}</TableCell>
                <TableCell className="text-right">{t("InvoiceTbl")}</TableCell>
              </tr>
            </TableHeader>

            <OrderTable
              lang={lang}
              orders={dataTable}
              globalSetting={globalSetting}
              currency={globalSetting?.default_currency || "$"}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={dashboardRecentOrder?.totalOrder}
              resultsPerPage={8}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no orders right now." />
      )}

     <PageTitle>{t('Platforms')}</PageTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>{t('Platform')}</TableCell>
              <TableCell>{t('platform_image')}</TableCell>
              <TableCell>{t('Description')}</TableCell>
              <TableCell>{t('Status')}</TableCell>
              <TableCell>{t('Action')}</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {platforms.map((platform, index) => (
              <TableRow key={platform.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img src={platform.image} alt="Platform Logo" className="w-12 h-12 object-cover" />
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{platform.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{platform.description}</span>
                </TableCell>
                {platform.id === 1 ? (
                  <>
                    <TableCell>
                      {checkStatusMagento ? (
                        <Input
                          type="checkbox"
                          checked={checkStatusMagento.isActive}
                          onChange={() => toggleMagentoStatus(checkStatusMagento.adminId, !checkStatusMagento.isActive)}
                        />
                      ) : (
                        <Input
                          type="checkbox"
                          checked={false}
                          onChange={() => toggleMagentoStatus(checkStatusMagento.adminId, !checkStatusMagento.isActive)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <button onClick={() => handleActionClick()}><FiEdit /></button>
                      <MagentoModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveStore} existingData={selectedStore}/>
                    </TableCell>
                  </>
                ) : (
                  // If you want to display 'gg' as text, ensure it's wrapped properly.
                  <>
                    <TableCell>
                      {checkStatusZid ? (
                        <Input
                          type="checkbox"
                          checked={checkStatusZid.isActive}
                          onChange={() => toggleZidStatus(checkStatusZid.adminId, !checkStatusZid.isActive)}
                        />
                      ) : (
                        <Input
                          type="checkbox"
                          checked={false}
                          onChange={() => toggleZidStatus(checkStatusZid.adminId, !checkStatusZid.isActive)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <button onClick={() => handleActionClick()}><FiEdit /></button>
                      <MagentoModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveStore} existingData={selectedStore}/>
                    </TableCell>
                    
                  </>
                )}


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Dashboard;
