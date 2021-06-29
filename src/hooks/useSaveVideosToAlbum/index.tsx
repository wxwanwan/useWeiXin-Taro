import Taro from '@tarojs/taro';
import { useCallback } from "react";
import useSystemInfo from "../useSystemInfo";

interface WeiXinSaveVideoToPhotosAlbum { filePaths: Array<string> }
const useSaveVideosToAlbum = function ({ filePaths = [] }: WeiXinSaveVideoToPhotosAlbum) {
  const { isIOS } = useSystemInfo()
  const options = isIOS ? {} : { filePath: Taro.env.USER_DATA_PATH + '/' + new Date().getTime() + '.mp4' }

  const saveVideos = useCallback((imageArray) => {
    const saveImageArray = imageArray.map(filePath =>
      new Promise((resolve, reject) => {
        Taro.saveVideoToPhotosAlbum({
          filePath: filePath,
          success: () => {
            resolve('success')
          },
          fail: () => {
            Taro.hideLoading()
            reject('failed')
          }
        })
      }))
    Promise.all(saveImageArray).then(() => {
      Taro.hideLoading()
      Taro.showToast({ title: '保存成功！', icon: 'success' })
    })
  }, [])

  const downloadVideos = useCallback(() => {
    const downloadImageArray = filePaths.map(filePath =>
      new Promise((resolve, reject) => {
        Taro.downloadFile(Object.assign({}, options, {
          url: filePath,
          header: { 'Content-Type': 'video/mp4' },
          success: res => {
            const downloadFilePath = isIOS ? res.tempFilePath : res.filePath
            resolve(downloadFilePath)
          },
          fail: () => {
            Taro.hideLoading()
            reject('failed')
          }
        }))
      }))
    Promise.all(downloadImageArray).then(res => {
      saveVideos(res)
    })
  }, [filePaths, isIOS, options, saveVideos])

  const saveVideoToPhotosAlbum = useCallback(() => {
    if (!filePaths.length) return
    Taro.showLoading()
    downloadVideos()
  }, [downloadVideos, filePaths])

  return { saveVideoToPhotosAlbum }
}

export default useSaveVideosToAlbum
