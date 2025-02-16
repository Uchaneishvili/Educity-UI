import RequestHelper from '../apis/RequestHelper'

export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('fileName', file.name) // Add filename to form data

  return await RequestHelper.educity.post('/videos/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
