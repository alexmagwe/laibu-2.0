export const getIconLink = (ext?: string) => {
    if (!ext) {
        return {
            icon: null,
        }
    }

    switch (ext) {
        case 'pdf':
            return {
                icon: 'https://drive-thirdparty.googleusercontent.com/16/type/application/pdf',
            }
        case 'docx':
            return {
                icon: 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }
        case 'doc':
            return {
                icon: 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }
        case 'pptx':
            return {
                icon: 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.presentationml.presentation',
            }
        case 'ppt':
            return {
                icon: 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.presentationml.presentation',
            }

        default:
            return {
                icon: null,
            }
    }
}
