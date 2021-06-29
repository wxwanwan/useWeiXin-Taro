import Taro from '@tarojs/taro'
import { useRef } from "react";

const useRequestAuthrize = ({ scope, callback }) => {
  const requsetAuthrize = useRef(() => {
    Taro.authorize({ scope, success: () => { callback() } })
  })
  return { requsetAuthrize: requsetAuthrize.current }
}

export default useRequestAuthrize