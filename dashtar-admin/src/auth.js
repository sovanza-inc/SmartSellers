import Cookies from 'js-cookie';

const getAdminId = () => {
  const adminInfo = Cookies.get('adminInfo');

  if (adminInfo) {
    const parsedAdminInfo = JSON.parse(adminInfo);
    console.log(parsedAdminInfo.role)
    return parsedAdminInfo.role; // Assuming _id is the adminId
  }
  return null; // Return null or handle the absence of adminId as per your application logic
};


export default getAdminId;