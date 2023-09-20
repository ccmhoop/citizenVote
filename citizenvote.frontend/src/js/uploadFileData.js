import axios from "axios";

const uploadFileData = async (formData, files, apiUrl, type) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const formDataObject = new FormData();
    formDataObject.append(
      type,
      new Blob([JSON.stringify(formData)], {
        type: "application/json",
      })
    );

    for (let i = 0; i < files.length; i++) {
      formDataObject.append("image", files[i]);
    }

    const response = await axios.post(apiUrl, formDataObject, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default uploadFileData;
