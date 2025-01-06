import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import TextAreaCom from "components/form/TextAreaCom";
import Title from "components/form/Title";
import Uploader from "components/image-uploader/Uploader";
import useSubscriptionSubmit from "hooks/useSubscriptionSubmit"; // Custom hook for subscription submission logic
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
import  { useEffect, useState } from "react";
import Select from 'react-select';
// Internal import
import SubscriptionServices from "services/SubscriptionServices"; // Subscription related services
import { notifyError } from "utils/toast";
import PlatformServices from "services/PlatformServices";

const SubscriptionDrawer = ({ id, data }) => {
  const { t } = useTranslation();

  const {
    register,
    onSubmit,
    handleSubmit,
    errors,
    imageUrl,
    setImageUrl,   
    selectedPlatforms,
    setSelectedPlatforms,
    isSubmitting,
  } = useSubscriptionSubmit(id, data); // Updated for subscriptions

  const [platformOptions, setPlatformOptions] = useState([]);
  const [splatform, setSplatform] = useState([]);
  // const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
     PlatformServices.getAllPlatforms()
      .then(response => {
        console.log(response)
        const options = response.map(platform => ({
          value: platform._id,
          label: platform.name
        }));
        setPlatformOptions(options);
      })
      .catch(error => {
        console.error("Error fetching platforms:", error);
      });
  }, []);

  const handlePlatformChange = (selectedOptions) => {
    setSplatform(selectedOptions)
    const selectedIds = selectedOptions.map(option => option.value);
    setSelectedPlatforms(selectedIds); // Now only setting the array of IDs
  };
  
  // console.log(platformOptions)
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t("UpdateSubscription")}
            description={t("UpdateSubscriptionDescription")}
          />
        ) : (
          <Title
            title={t("AddSubscription")}
            description={t("AddSubscriptionDescription")}
          />
        )}
      </div>

      <Scrollbars className="w-full relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            {/* Name Input */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Subscription Name"
                  name="name"
                  type="text"
                  placeholder={t("SubscriptionNamePlaceholder")}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            {/* Description Input */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Description")} />
              <div className="col-span-8 sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Subscription Description"
                />
                <Error errorName={errors.description} />
              </div>
            </div>

            {/* Price Input */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Price")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register("price")}
                  type="number"
                  placeholder={t("SubscriptionPricePlaceholder")}
                />
                <Error errorName={errors.price} />
              </div>
            </div>

            {/* Image Uploader */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Image")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="subscription"
                />
              </div>
            </div>

            {/* Additional fields like Platforms can be added here */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Platforms")} />
              <div className="col-span-8 sm:col-span-4">
              <Select
  options={platformOptions}
  isMulti
  onChange={handlePlatformChange}
  value={splatform} // This should be an array of selected option objects
  className="basic-multi-select"
  classNamePrefix="select"
/>
        </div>
            </div>

          </div>

          <DrawerButton id={id} title="Subscription" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default SubscriptionDrawer;
