import {model, Schema} from 'mongoose'
import {compare, hash} from 'bcryptjs'
import {Document, Model} from 'mongoose'
import {Roles} from "../types/enum";

interface User {
    username: string
    email: string
    password: string
    refreshToken: string
    roles: Roles
}

export interface UserDocument extends User, Document {
    matchesPassword: (password: string) => Promise<boolean>
}

interface UserModel extends Model<UserDocument> {
    hash: (password: string) => Promise<string>
}

const userSchema: Schema = new Schema({
        username: {
            type: String,
            validate: [
                async (username: string): Promise<boolean> =>
                    !(await User.exists({username})),
                'Username is already taken.'
            ]
        },
        email: {
            type: String,
            validate: [
                async (email: string): Promise<boolean> =>
                    !(await User.exists({email})),
                'Email is already taken.'
            ]
        },
        password: String,
        refreshToken: String,

        roles: {
            type: Number,
            enum: Object.values(Roles),
            default: Roles.user,
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        }
    }
)
userSchema.pre('save', async function (this: UserDocument) {
    if (this.isModified('password')) {
        this.password = await User.hash(this.password)
    }
})
userSchema.statics.hash = (password: string): Promise<string> => {
    return hash(password, 12)
}

userSchema.methods.matchesPassword = function (this: UserDocument, password: string): Promise<boolean> {
    return compare(password, this.password)
}

const User = model<UserDocument, UserModel>('User', userSchema)
export default User
