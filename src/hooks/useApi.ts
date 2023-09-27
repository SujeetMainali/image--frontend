import AxiosInstance from "../Api";
import { Responses } from "../types/Response.types";
export interface IGetParameter {
  perpage?: number;
  page?: number;
  search?: string;
}
const useAPI = <T>() => {
  const get = async (endPoint: string): Promise<Responses<T>> => {
    try {
      const response = await AxiosInstance.get(endPoint);

      return {
        success: true,
        data: response?.data?.data,
        message: "Fetch successfully",
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: error?.response?.data?.message,
        error: error?.response?.data?.error,
      };
    }
  };

  const post = async (endPoint: string, data: T) => {
    try {
      const response = await AxiosInstance.post(endPoint, data);
      return {
        status: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        status: false,
        message: error?.response?.data?.message,
      };
    }
  };

  const postSingleMedia = async (endPoint: string, data: any) => {
    const formData = new FormData();
    data.forEach((item: any) => {
      formData.append("file", item);
    });

    try {
      const response = await AxiosInstance.post(endPoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        status: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        status: false,
        message: error?.response?.data?.message,
      };
    }
  };

  return {
    get,
    post,
    postSingleMedia,
  };
};
export default useAPI;
