import Taro from '@tarojs/taro';
import { useCallback } from "react";

interface WeiXinSaveImageToPhotosAlbum { filePaths: Array<string> }
const useSavePhotosToAlbum = function ({ filePaths = [] }: WeiXinSaveImageToPhotosAlbum) {
  const saveImages = useCallback((imageArray) => {
    const saveImageArray = imageArray.map(filePath =>
      new Promise((resolve, reject) => {
        Taro.saveImageToPhotosAlbum({
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

  const downloadImages = useCallback(() => {
    const downloadImageArray = filePaths.map(filePath =>
      new Promise((resolve, reject) => {
        Taro.getImageInfo({
          src: filePath,
          success: res => {
            resolve(res.path)
          },
          fail: () => {
            Taro.hideLoading()
            reject('failed')
          }
        })
      }))
    Promise.all(downloadImageArray).then(res => {
      saveImages(res)
    })
  }, [filePaths, saveImages])

  const saveImageToPhotosAlbum = useCallback(() => {
    if (!filePaths.length) return
    Taro.showLoading()
    downloadImages()
  }, [downloadImages, filePaths])

  return { saveImageToPhotosAlbum }
}

export default useSavePhotosToAlbum