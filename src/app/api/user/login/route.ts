import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const USER = process.env.TEST_USER;
const WATCHWORD = process.env.TEST_WATCHWORD;

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { username, password } = reqBody;
        console.log(reqBody, USER, WATCHWORD);

        //check if user exists
        const user = USER === username;
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        console.log("user exists");


        //check if password is correct
        const validPassword = WATCHWORD === password;
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(user);

        //create token data
        const tokenData = {
            username: username
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}