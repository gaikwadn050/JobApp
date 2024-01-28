import bcrypt from "bcryptjs"


export const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword

}

export const comparePassword = async (password, hashedPassword) => {
    const isMatch = bcrypt.compare(password, hashedPassword)
    return isMatch;
}