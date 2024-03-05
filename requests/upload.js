import axios from "axios";

export const uploadImages = async (formData) => {
    try {
    console.log("formData:", formData);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const { data } = await axios.post("/api/cloudinary", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("formData:", data);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error occurred:", error.message);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      }
    } else {
      console.error("Non-Axios error occurred:", error.message);
    }
    throw error;
  }
};
