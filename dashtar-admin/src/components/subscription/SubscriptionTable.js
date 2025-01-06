import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import SubscriptionDrawer from "components/drawer/SubscriptionDrawer";
import CheckBox from "components/form/CheckBox";
import EditDeleteButton from "components/table/EditDeleteButton";

const SubscriptionTable = ({
  data,
  isCheck,
  subscriptions,
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
  console.log(subscriptions);
  return (
    <>
      {isCheck?.length < 1 && (
        <DeleteModal id={serviceId} title="Subscription" />
      )}

      <MainDrawer>
        <SubscriptionDrawer id={serviceId} data={data} />
      </MainDrawer>

      <TableBody>
        {subscriptions?.map((subscription) => (
          <TableRow key={subscription._id}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name="subscription"
                id={subscription._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(subscription._id)}
              />
            </TableCell>

            {/* Subscription Image */}
            <TableCell>
              {subscription?.image ? (
                <Avatar src={subscription.image} alt="Subscription Image" className="align-middle" />
              ) : (
                "No Image"
              )}
            </TableCell>

            {/* Subscription Name */}
            <TableCell className="font-medium text-sm">
              {subscription?.name}
            </TableCell>

            {/* Subscription Description */}
            <TableCell className="font-medium text-sm">
              {subscription?.description}
            </TableCell>

            {/* Subscription Price */}
            <TableCell className="font-medium text-sm">
              {subscription?.price}
            </TableCell>

            {/* Subscription Platforms */}
            <TableCell className="font-medium text-sm">
              {subscription?.platforms?.map((platform, index) => (
                <span key={platform._id}>{(index ? ', ' : '') + platform.name}</span>
              ))}
            </TableCell>

            {/* Action Buttons */}
            <TableCell>
              <EditDeleteButton

                id={subscription?._id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={subscription?.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default SubscriptionTable;
