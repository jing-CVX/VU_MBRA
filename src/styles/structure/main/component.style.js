import { dimensions, fontSizes, scalingUtils, fontWeights } from '../../index'


// Tất cả các style dành cho các component lớn hơn mức basic
export default {
    About__Logo: {
        justifyContent: 'center',
        alignItems: 'center',
        height: dimensions.verticalIndent * 5,
        marginTop: dimensions.halfVerticalIndent
    },
    About__Logo__Img: {
        width: dimensions.bigIconSize * 5,
        height: dimensions.verticalIndent * 5,
        flex: 1
    },
    About__Copyright: {
        padding: dimensions.halfIndent,
        justifyContent: 'center'
    },
    About__PowerBy: {
        fontSize: fontSizes.verySmall,
    },
    Form: {
        marginTop: dimensions.verticalIndent,
    },
    Login__Row__Auth: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: dimensions.verticalIndent
    }
}