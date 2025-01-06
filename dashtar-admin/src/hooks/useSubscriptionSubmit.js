import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import SubscriptionServices from "services/SubscriptionServices";
import { notifyError, notifySuccess } from "utils/toast";

const useSubscriptionSubmit = (id, data) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      console.log(formData)
      
      const subscriptionData = {
        ...formData,
        image: imageUrl,
        platforms: selectedPlatforms, // Including selected platforms
      };
      console.log(subscriptionData)
      if (id) {
        const res = await SubscriptionServices.updateSubscription(id, subscriptionData);
        setIsUpdate(true);
        notifySuccess(res.message);
      } else {
        const res = await SubscriptionServices.addSubscription(subscriptionData);
        setIsUpdate(true);
        notifySuccess(res.message);
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
    } finally {
      setIsSubmitting(false);
      closeDrawer();
      resetForm();
    }
  };

  useEffect(() => {
    if (isDrawerOpen && id) {
      fetchSubscriptionData(id);
    } else {
      resetForm();
    }
  }, [id, isDrawerOpen]);

  const resetForm = () => {
    reset();
    setImageUrl("");
    setSelectedPlatforms([]);
    clearErrors();
  };

  const fetchSubscriptionData = async (subscriptionId) => {
    try {
      const res = await SubscriptionServices.getSubscriptionById(subscriptionId);
      if (res) {
        setFormValues(res);
      }
    } catch (err) {
      notifyError(err ? err.response.data.message : err.message);
    }
  };

  const setFormValues = (subscription) => {
    setValue("name", subscription.name);
    setValue("description", subscription.description);
    setValue("price", subscription.price);
    setImageUrl(subscription.image);
    setSelectedPlatforms(subscription.platforms.map(platform => platform._id)); // Set selected platforms
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    selectedPlatforms,
    setSelectedPlatforms,
    isSubmitting
  };
};

export default useSubscriptionSubmit;
