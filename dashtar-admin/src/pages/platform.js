// platform.js
import {
    Button,
    Card,
    CardBody,
    Input,
    Pagination,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
  } from "@windmill/react-ui";
  import { useContext, useState } from "react";
  import { useTranslation } from "react-i18next";
  import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
  
  // Internal imports
  import useAsync from "hooks/useAsync";
  import { SidebarContext } from "context/SidebarContext";
  import PlatformServices from "services/PlatformServices";
  import useToggleDrawer from "hooks/useToggleDrawer";
  import useFilter from "hooks/useFilter";
  import DeleteModal from "components/modal/DeleteModal";
  import BulkActionDrawer from "components/drawer/BulkActionDrawer";
  import PageTitle from "components/Typography/PageTitle";
  import MainDrawer from "components/drawer/MainDrawer";
  import PlatformDrawer from "components/drawer/PlatformDrawer";
  import UploadManyTwo from "components/common/UploadManyTwo";
  import TableLoading from "components/preloader/TableLoading";
  import CheckBox from "components/form/CheckBox";
  import PlatformTable from "components/platform/PlatformTable";
  import NotFound from "components/table/NotFound";
  
  const Platform = () => {
    const { toggleDrawer } = useContext(SidebarContext);
    const { t } = useTranslation();
    const { data: getAllPlatform } = useAsync(PlatformServices.getAllPlatforms);
    const { data, loading } = useAsync(PlatformServices.getAllPlatforms);
  
    const {
      handleSubmitPlatform,
      platformRef,
      totalResults,
      resultsPerPage,
      dataTable,
      handleChangePage,
      filename,
      isDisabled,
      handleSelectFile,
      handleUploadMultiple,
      handleRemoveSelectFile,
    } = useFilter(data);
  
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
  
    const handleSelectAll = () => {
      setIsCheckAll(!isCheckAll);
      setIsCheck(data.map((li) => li._id));
      if (isCheckAll) {
        setIsCheck([]);
      }
    };
    console.log(data)
  
    return (
      <>
        <PageTitle>{t("Platform")}</PageTitle>
        <DeleteModal ids={isCheck} setIsCheck={setIsCheck} />
        <BulkActionDrawer ids={isCheck} title="Platforms" data={data} isCheck={isCheck} />
        <MainDrawer>
          <PlatformDrawer />
        </MainDrawer>
  
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          {/* <div className="flex md:flex-row flex-col gap-3 justify-end items-end"> */}
          <form onSubmit={handleSubmitPlatform} className="py-3  grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
            {/* </div> */}
            <div className="flex justify-start w-1/2 xl:w-1/2 md:w-full">
              {/* <UploadManyTwo
                title="Platforms"
                exportData={getAllPlatform}
                filename={filename}
                isDisabled={isDisabled}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              /> */}
            </div>

            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
              {/* <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleUpdateMany(isCheck)}
                  className="w-full rounded-md h-12 text-gray-600 btn-gray"
                >
                  <span className="mr-2">
                    <FiEdit />
                  </span>

                  {t("BulkAction")}
                </Button>
              </div> */}
              {/* <div className="w-full md:w-32 lg:w-32 xl:w-32  mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleDeleteMany(isCheck)}
                  className="w-full rounded-md h-12 bg-red-500 disabled  btn-red"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>

                  {t("Delete")}
                </Button>
              </div> */}
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button onClick={toggleDrawer} className="rounded-md h-12 w-full">
                  <span className="mr-2">
                    <FiPlus />
                  </span>

                  {t("addPlatform")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
  
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
          <CardBody>
            {/* Search input */}
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

                <TableCell>{t("Name")}</TableCell>
                <TableCell>{t("description")}</TableCell>
              
                </tr>
              </TableHeader>
              <PlatformTable
                data={data}
                isCheck={isCheck}
                platforms={dataTable}
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
          <NotFound title={t("NoPlatformsFound")} />
        )}
      </>
    );
  };
  
  export default Platform;
  