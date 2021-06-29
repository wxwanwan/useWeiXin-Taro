import Taro from '@tarojs/taro'
import { useCallback } from "react";

const useWeiXinLogin = function ({ callback }: { callback: Function }) {

  const wxLogin = useCallback(() => {
    Taro.login({ success: result => { callback && callback({ jsCode: result.code }) } })
  }, [callback])

  return wxLogin
}

export default useWeiXinLogin
