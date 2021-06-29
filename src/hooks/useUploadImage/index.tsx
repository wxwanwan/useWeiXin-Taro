import Taro from '@tarojs/taro';
import { useCallback } from "react";

const useUploadImage = function ({ url, fileName = 'files' }) {
  const uploadImage = useCallback((filePaths, callback) => {
    Taro.showLoading()
    const fileArray = filePaths.map(filePath =>
      new Promise((resovle, reject) => {
        Taro.uploadFile({
          url,
          filePath,
          name: fileName,
          success: res => {
            resovle(JSON.parse(res.data).data)
          },
          fail: res => {
            reject(res)
          }
        })
      }))
    Promise.all(fileArray).then(res => {
      Taro.hideLoading()
      callback && callback(res)
    })
  }, [url])

  const chooseImage = useCallback(({ callback, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera'], count = 9 }: {
    callback?: Function,
    sizeType?: ['original'] | ['compressed'] | ['original', 'compressed'],
    sourceType?: ['album'] | ['camera'] | ['album', 'camera']
    count?: Number
  }) => {
    Taro.chooseImage({
      count, // 默认9
      sizeType, // 可以指定是原图还是压缩图，默认二者都有
      sourceType, // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: function (res) {
        uploadImage(res.tempFilePaths, callback)
      }
    })
  }, [uploadImage])

  return { chooseImage }
}
export default useUploadImage