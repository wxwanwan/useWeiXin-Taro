import Taro from '@tarojs/taro'
import { useCallback } from "react";
import useRequestAuthrize from '../useRequestAuthrize';

const useGetAddress = function ({ callback }: { callback?: Function } = {}) {
  const { requsetAuthrize } = useRequestAuthrize({
    scope: 'scope.address', callback: () => {
      Taro.chooseAddress({ success: (res: Taro.chooseAddress.SuccessCallbackResult) => callback && callback(res) })
    }
  })

  const getAddress = useCallback(() => {
    requsetAuthrize()
  }, [requsetAuthrize])

  return { getAddress }
}
export default useGetAddress