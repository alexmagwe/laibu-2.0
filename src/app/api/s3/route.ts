import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
    },
    region: process.env.S3_REGION,
})

export async function GET(req: NextRequest) {
    const p = req.nextUrl.searchParams
    console.log(`p`, p)
    try {
        if (!p.has('ext') && !p.has('name')) throw new Error('Invalid Params')
        const ext = p.get('ext')
        const name = p.get('name')
        const fileExt = ext?.split('/')[1]

        const Key = `${process.env.S3_BUCKET_NAME}/${
            name?.split('.')[0]
        }_${randomUUID()}.${fileExt}`
        console.log(`ext`, ext)
        const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key,
            Expires: 60,
            ContentType: ext,
        }
        const command = new GetObjectCommand(s3Params)
        const uploadUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
        })

        console.log('uploadUrl', uploadUrl)

        return NextResponse.json(
            JSON.stringify({
                uploadUrl: uploadUrl,
                key: Key,
            })
        )
    } catch (e) {
        console.log('error', e)
        return NextResponse.error()
    }
}
