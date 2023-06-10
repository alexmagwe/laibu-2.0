import Uppy from '@uppy/core'
import AwsS3 from '@uppy/aws-s3'
import GoogleDrive from '@uppy/google-drive'
import { db } from '../db'
import { saveContent } from '../content'
import { toast } from 'react-hot-toast'

export const uppy = new Uppy({
    onBeforeUpload(files) {
        console.log(files)
        //check meta data contains unit code and unit Id
        let res = Object.values(files).every((file) => {
            if (!file.meta.unitCode || !file.meta.unitId) {
                return false
            } else {
                return true
            }
        })
        return res
    },
})
    .use(AwsS3, {
        companionUrl: 'http://localhost:3020',
        allowedMetaFields: ['unitCode', 'variant'],
    })
    .use(GoogleDrive, {
        companionUrl: 'http://localhost:3020',
    })
// export const uppy = new Uppy().use(AwsS3, {
//     //@ts-expect-error
//     getUploadParameters(file) {
//         const fileType = encodeURIComponent(file.type!)
//         // Send a request to our PHP signing endpoint.
//         return fetch(`/api/s3/?ext=${fileType}&name=${file.name}`, {
//             method: 'GET',
//             // Send and receive JSON.
//         })
//             .then((response) => {
//                 // Parse the JSON response.
//                 return response.json()
//             })
//             .then((json) => {
//                 const data = JSON.parse(json)
//                 // Return an object in the correct shape.
//                 return {
//                     method: 'PUT',
//                     url: data.uploadUrl,
//                     fields: [],
//                     // Provide content type header required by S3
//                     headers: {
//                         'Content-Type': file.type,
//                     },
//                 }
//             })
//     },
// })
uppy.on('complete', async (result) => {
    // store.dispatch({
    //   type: 'SET_USER_AVATAR_URL',
    //   payload: { url },
    // })
    if (result.successful.length === 0) return
    const payload = {
        unitId: result.successful[0].meta.unitId,
        data: result.successful,
    }
    const res = await saveContent(payload)
    if (res) {
        console.log('success')
        toast.success('Upload successful')
    } else console.log('error')

    console.log(result)
})
