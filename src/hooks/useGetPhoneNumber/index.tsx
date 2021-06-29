import Taro from '@tarojs/taro'
import { useCallback } from "react";

const useGetPhoneNumber = function ({ callback }: { callback: Function }) {
  const getPhoneNumber = useCallback((event) => {
    const { errMsg } = event.detail
    if (errMsg === "getPhoneNumber:ok") {
      const { encryptedData, iv } = event.detail
      callback && callback({ encryptedData, iv })
    }
  }, [callback])

  return { getPhoneNumber }
}

export default useGetPhoneNumber
