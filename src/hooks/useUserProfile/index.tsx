import Taro from '@tarojs/taro';
import { useCallback } from "react";

const useUserProfile = function ({ callback }: { callback: Function }) {

  const getUserProfile = useCallback(() => {
    Taro.getUserProfile({ desc: '您的基本信息将用于完善资料', success: res => callback(res) })
  }, [callback])

  return getUserProfile
}

export default useUserProfile