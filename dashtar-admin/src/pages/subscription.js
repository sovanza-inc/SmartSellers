import {
    Button,
    Card,
    CardBody,
    Table,
    Pagination,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
  } from "@windmill/react-ui";
  import { useContext, useState } from "react";
  import { useTranslation } from "react-i18next";
  import { FiPlus } from "react-icons/fi";
  
  // Internal imports
  import useAsync from "hooks/useAsync";
  import { SidebarContext } from "context/SidebarContext";
  import SubscriptionServices from "services/SubscriptionServices";
  import useToggleDrawer from "hooks/useToggleDrawer";
  import useFilter from "hooks/useFilter";
  import DeleteModal from "components/modal/DeleteModal";
  import BulkActionDrawer from "components/drawer/BulkActionDrawer";
  import PageTitle from "components/Typography/PageTitle";
  import MainDrawer from "components/drawer/MainDrawer";
  import SubscriptionDrawer from "components/drawer/SubscriptionDrawer";
  import TableLoading from "components/preloader/TableLoading";
  import CheckBox from "components/form/CheckBox";
  import SubscriptionTable from "components/subscription/SubscriptionTable";
  import NotFound from "components/table/NotFound";
  
  const Subscription = () => {
    const { toggleDrawer } = useContext(SidebarContext);
    const { t } = useTranslation();
    const { data, loading } = useAsync(SubscriptionServices.getAllSubscriptions);
  
    const {
      handleSubmitSubscription,
      totalResults,
      resultsPerPage,
      dataTable,
      handleChangePage,
      isCheck,
      setIsCheck,
    } = useFilter(data);
  
    const [isCheckAll, setIsCheckAll] = useState(false);
  
    const handleSelectAll = () => {
      setIsCheckAll(!isCheckAll);
      setIsCheck(data.map((li) => li._id));
      if (isCheckAll) {
        setIsCheck([]);
      }
    };
  
    return (
      <>
        <PageTitle>{t("Subscription")}</PageTitle>
        <DeleteModal ids={isCheck} setIsCheck={setIsCheck} />
        <BulkActionDrawer ids={isCheck} title="Subscriptions" data={data} isCheck={isCheck} />
        <MainDrawer>
          <SubscriptionDrawer />
        </MainDrawer>
  
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody className="py-3  grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
            {/* Buttons and Actions */}
            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button onClick={toggleDrawer} className="rounded-md h-12 w-full">
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("addSubscription")}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
  
        {loading ? (
          <TableLoading row={12} col={6} width={190} height={20} />
        ) : dataTable.length !== 0 ? (
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>
                    <CheckBox
                      type="checkbox"
                      name="selectAll"
                      id="selectAll"
                      handleClick={handleSelectAll}
                      isChecked={isCheckAll}
                    />
                  </TableCell>
                  <TableCell>{t("Image")}</TableCell>
                  <TableCell>{t("Name")}</TableCell>
                  <TableCell>{t("Description")}</TableCell>
                  <TableCell>{t("Price")}</TableCell>
                  <TableCell>{t("Platforms")}</TableCell>
                  <TableCell>{t("Action")}</TableCell>
                </tr>
              </TableHeader>
              <SubscriptionTable
                data={data}
                isCheck={isCheck}
                subscriptions={dataTable}
                setIsCheck={setIsCheck}
              />
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={handleChangePage}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        ) : (
          <NotFound title={t("NoSubscriptionsFound")} />
        )}
      </>
    );
  };
  
  export default Subscription;
  