import { dimensions as dm, fontSizes as fs, scalingUtils, fontWeights as fw } from '../../index'

// Tất cả các style dùng chung, basic cơ bản nhất cho app
const common = {
    Common__Button: {
        width: '100%',
        marginTop: dm.vertical(16),
        justifyContent: 'center',
        borderRadius: 8,
    },
    Common__Row: {
        paddingTop: dm.vertical(4),
        paddingBottom: dm.vertical(4),
        paddingHorizontal: dm.moderate(16)
    },
    Row_Data: {
        marginHorizontal: dm.moderate(16), 
        paddingVertical: dm.moderate(12),
        borderBottomWidth: 1
    },
    Row_Text_Left: {
        fontSize: fs.small, 
        paddingHorizontal: dm.moderate(4), 
        opacity: .64
    },
    Row_Text_Right: {
        fontSize: fs.normal,
        fontWeight: fw.semiBold
    },
    Group__Title__Row: {
        paddingHorizontal: dm.moderate(16),
        marginTop: dm.vertical(16),
        paddingTop: dm.vertical(6) 
    },
    Group__Title__Text: {
        fontSize: fs.medium, 
        // paddingHorizontal: dm.halfIndent / 2,
        fontWeight: fw.bold
    }
}

export default common