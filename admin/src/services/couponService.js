import axios from "axios";

const API_URL = "http://localhost:5000/api/coupons";

// Get All Coupons
export const getCoupons = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Get Single Coupon
export const getCoupon = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

// Create Coupon
export const createCoupon = async (couponData) => {
  const { data } = await axios.post(API_URL, couponData);
  return data;
};

// Update Coupon
export const updateCoupon = async (id, couponData) => {
  const { data } = await axios.put(
    `${API_URL}/${id}`,
    couponData
  );
  return data;
};

// Delete Coupon
export const deleteCoupon = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};

export const applyCoupon = async (couponData) => {
  const { data } = await axios.post(
    "http://localhost:5000/api/coupons/apply",
    couponData
  );

  return data;
};