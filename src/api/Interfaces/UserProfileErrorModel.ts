import { Nullable } from "../../utils/Const"

/**
 * errors : [ { "message": "That user does not exist.", "locations": [ { "line": 6, "column": 3 } ],}
*/
export default interface UserProfileErrorModel {
    errors: Nullable<Array<ErrorNode>>
}

interface ErrorNode {
    message: Nullable<String>
}
