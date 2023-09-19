import axios from 'axios';

const uploadFileData = async (formdata, files,apiUrl,type) => {
    try {
      const formData = new FormData();
      formData.append(
        type,
        new Blob([JSON.stringify(formdata)], {
          type: "application/json",
        })
      );

      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i]);
      }

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export default uploadFileData;