import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import PlatformServices from "services/PlatformServices"; // Update to PlatformServices
import { notifyError, notifySuccess } from "utils/toast";
import Cookies from 'js-cookie';

const getAdminIdFromCookie = () => {
  const adminInfo = Cookies.get('adminInfo');
  if (adminInfo) {
    const parsedAdminInfo = JSON.parse(adminInfo);
    return parsedAdminInfo._id; // Assuming _id is the adminId
  }
  return null; // Return null or handle the absence of adminId as per your application logic
};

const usePlatformSubmit = (id, data) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, description }) => {
    try {
      setIsSubmitting(true);
      const adminId = getAdminIdFromCookie();

      if (!adminId) {
        console.error("Admin ID not found in cookie.");
        return;
      }
      
      const platformData = {
        name,
        description,
      
      };

      if (id) {
        const res = await PlatformServices.updatePlatform(id, platformData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await PlatformServices.addPlatform(platformData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      resetForm();
      return;
    }
    if (id) {
      fetchPlatformData(id);
    }
  }, [id, isDrawerOpen]);

  const resetForm = () => {
    setResData({});
    reset();
    setImageUrl("");
    setPublished(true);
    clearErrors();
  };

  const fetchPlatformData = async (platformId) => {
    try {
      const res = await PlatformServices.getPlatformById(platformId);
      if (res) {
        setResData(res);
        setFormValues(res);
      }
    } catch (err) {
      notifyError(err ? err.response.data.message : err.message);
    }
  };

  const setFormValues = (platform) => {
    setValue("name", platform.name);
    setValue("description", platform.description);
    setImageUrl(platform.icon);
    setPublished(platform.published);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    published,
    setPublished,
    isSubmitting
  };
};

export default usePlatformSubmit;
