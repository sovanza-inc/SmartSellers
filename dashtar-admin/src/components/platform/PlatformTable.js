import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { Link } from "react-router-dom";

// Internal import
import { IoRemoveSharp } from "react-icons/io5";
import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import PlatformDrawer from "components/drawer/PlatformDrawer"; // Update to PlatformDrawer
import CheckBox from "components/form/CheckBox";
import ShowHideButton from "components/table/ShowHideButton";
import EditDeleteButton from "components/table/EditDeleteButton";
import { showingTranslateValue } from "utils/translate";

const PlatformTable = ({
  data,
  lang,
  isCheck,
  platforms, // Updated to platforms
  setIsCheck,
}) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
console.log("dhejdahjdasjhdgadhsadvhavfdhvdfhesvfhsvhdsvdshgvshsgh")
  console.log(platforms);

  return (
    <>
      {isCheck?.length < 1 && (
        <DeleteModal id={serviceId} title="Platform" />
      )}

      <MainDrawer>
        <PlatformDrawer id={serviceId} data={data} lang={lang} />
      </MainDrawer>

      <TableBody>
        {platforms?.map((platform) => (
          <TableRow key={platform._id}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name="platform"
                id={platform._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(platform._id)}
              />
            </TableCell>

            {/* Update the table cells as per the platform data structure */}
            {/* Example: */}
            {/* <TableCell className="font-semibold uppercase text-xs">
              {platform?._id?.substring(20, 24)}
            </TableCell> */}
      
            <TableCell className="font-medium text-sm ">
              {platform?.name}
            </TableCell>
            <TableCell className="font-medium text-sm">
              {platform?.description}

            </TableCell>
            {/* <TableCell className="text-center"> */}
              {/* Status or other actions */}
            {/* </TableCell> */}
            <TableCell>
              <EditDeleteButton
                id={platform?._id}
              
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={platform?.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default PlatformTable;
