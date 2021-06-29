import Taro from '@tarojs/taro';
import { useMemo } from "react";

const useSystemInfo = function () {
  const systemInfomation = Taro.getSystemInfoSync()
  const isIOS = useMemo(() => {
    return systemInfomation.system.toLowerCase().includes('ios')
  }, [systemInfomation.system])
  const isIOSComprehensiveScreen = useMemo(() => {
    const isComprehensiveScreen = systemInfomation.safeArea.bottom < systemInfomation.screenHeight
    return isIOS && isComprehensiveScreen
  }, [systemInfomation.safeArea.bottom, systemInfomation.screenHeight, isIOS])
  return { isIOSComprehensiveScreen, isIOS, systemInfomation }
}

export default useSystemInfo