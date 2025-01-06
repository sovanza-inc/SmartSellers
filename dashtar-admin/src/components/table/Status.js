import { Badge } from "@windmill/react-ui";

const Status = ({ status }) => {
  return (
    <>
      <span className="font-serif">
        {(status === "Pending" || status === "pending" || status === "Inactive") && (
          <Badge type="warning">{status}</Badge>
        )}
        {(status === "magento" || status === "Magento") && (
          <Badge type="warning">{status}</Badge>
        )}
        {status === "Waiting for Password Reset" && (
          <Badge type="warning">{status}</Badge>
        )}
        {(status === "Processing" || status === "processing") && <Badge>{status}</Badge>}
        {(status === "Delivered" || status === "delivered" || status === "closed" || status === "Active") && (
          <Badge type="success">{status}</Badge>
        )}
        {(status === "Cancel" || status === "cancel" )&& <Badge type="danger">{status}</Badge>}
        {status === `POS-Completed` && (
          <Badge className="dark:bg-teal-900 bg-teal-100">{status}</Badge>
        )}
       
      </span>
    </>
  );
};

export default Status;
